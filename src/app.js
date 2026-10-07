// ===== 状態の保存(この端末 + 使えるときはクラウド) =====
var LS_KEY = "kokyo-drill-v1";
var state = { review: [], ok: {}, level: 2 };
var cloud = { ref: null, busy: false, dirty: false, timer: null, status: "この端末にだけ保存中" };

function loadLocal() {
  try {
    var raw = localStorage.getItem(LS_KEY);
    if (raw) {
      var s = JSON.parse(raw);
      if (s && Array.isArray(s.review)) state = { review: s.review, ok: s.ok || {}, level: s.level || 2 };
    }
  } catch (e) {}
}
function saveLocal() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
}
function safeSave() { try { save(); } catch (e) {} }
function save() {
  saveLocal();
  if (!cloud.ref) return;
  cloud.dirty = true;
  clearTimeout(cloud.timer);
  cloud.timer = setTimeout(flushCloud, 600);
}
function flushCloud() {
  if (!cloud.ref || cloud.busy || !cloud.dirty) return;
  cloud.busy = true; cloud.dirty = false;
  cloud.ref.set({ review: state.review, ok: state.ok, level: state.level, savedAt: Date.now() })
    .then(function () { cloud.busy = false; if (cloud.dirty) flushCloud(); })
    .catch(function () { cloud.busy = false; cloud.status = "クラウド保存に失敗(この端末には保存済み)"; if (view === "home") render(); });
}
function connectCloud() {
  if (!window.claude || !window.claude.use) return;
  Promise.all([window.claude.use("db"), window.claude.use("user")]).then(function (r) {
    var db = r[0], user = r[1];
    if (!db || !user) return null;
    return user.id().then(function (uid) {
      if (!uid) return null;
      var ref = db.doc("data/users/" + uid + "/progress");
      return ref.get().then(function (snap) {
        if (snap.exists) {
          var d = snap.data() || {};
          // クラウドから届くデータは書き換え不可なので、コピーして使う
          if (Array.isArray(d.review)) state = { review: d.review.slice(), ok: Object.assign({}, d.ok || {}), level: d.level || state.level };
          saveLocal();
        }
        cloud.ref = ref;
        cloud.status = "クラウドにも保存中(スマホとPCで共有)";
        if (!snap.exists && (state.review.length || Object.keys(state.ok).length)) { cloud.dirty = true; flushCloud(); }
        if (view === "home") render();
      });
    });
  }).catch(function () {});
}

// ===== 出題ロジック =====
var view = "home";
var session = null;
var lastHidden = {};

function shuffle(arr) {
  var a2 = arr.slice();
  for (var i = a2.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a2[i]; a2[i] = a2[j]; a2[j] = t;
  }
  return a2;
}
function parse(text) {
  // 改行ごとの段落 → 文字と穴(answer)の並び
  return text.split("\n").map(function (line) {
    var parts = [], re = /\{\{(.+?)\}\}/g, last = 0, m;
    while ((m = re.exec(line))) {
      if (m.index > last) parts.push({ t: line.slice(last, m.index) });
      parts.push({ b: m[1] });
      last = re.lastIndex;
    }
    if (last < line.length) parts.push({ t: line.slice(last) });
    return parts;
  });
}
function countBlanks(paras) {
  var n = 0;
  paras.forEach(function (p) { p.forEach(function (x) { if (x.b !== undefined) n++; }); });
  return n;
}
function pickHidden(card, n) {
  var ratio = state.level === 1 ? 0.35 : state.level === 3 ? 0.9 : 0.6;
  var k = Math.min(n, Math.max(Math.min(2, n), Math.round(n * ratio)));
  var idx = [], i;
  for (i = 0; i < n; i++) idx.push(i);
  var pick, key, tries = 0;
  do {
    pick = shuffle(idx).slice(0, k).sort(function (x, y) { return x - y; });
    key = pick.join(",");
    tries++;
  } while (k < n && key === lastHidden[card.id] && tries < 8);
  lastHidden[card.id] = key;
  var set = {};
  pick.forEach(function (x) { set[x] = true; });
  return set;
}
function startSession(cards, mode, label) {
  if (!cards.length) return;
  session = { cards: shuffle(cards), i: 0, mode: mode, label: label, okN: 0, missN: 0, revealed: false };
  view = "quiz";
  prepareCard();
  render();
}
function buildText(c) {
  // 条文・判例カードは、出すたびに「問い」と「答え」の向きをランダムに入れ替える
  var forward = Math.random() < 0.5;
  if (c.art) {
    return forward
      ? "「" + c.art.name + "」は、第{{" + c.art.n + "}}条。"
      : "第" + c.art.n + "条は、「{{" + c.art.name + "}}」を定めている。";
  }
  if (c.kase) {
    return (forward
      ? "判例『" + c.kase.name.replace(/[『』]/g, "") + "』は、{{" + c.kase.what + "}}に関する裁判。"
      : "{{" + c.kase.name.replace(/[『』]/g, "") + "}}は、" + c.kase.what + "に関する裁判。");
  }
  return c.text;
}
function prepareCard() {
  var c = session.cards[session.i];
  session.paras = parse(buildText(c));
  session.n = countBlanks(session.paras);
  session.hidden = pickHidden(c, session.n);
  session.shown = {};
  session.revealed = false;
}
function answer(good) {
  if (Date.now() < session.lockUntil) return;
  var c = session.cards[session.i];
  if (good) {
    session.okN++;
    state.ok[c.id] = (state.ok[c.id] || 0) + 1;
    if (session.mode === "review") state.review = state.review.filter(function (x) { return x !== c.id; });
  } else {
    session.missN++;
    if (state.review.indexOf(c.id) < 0) state.review.push(c.id);
  }
  session.i++;
  if (session.i >= session.cards.length) { view = "result"; } else { prepareCard(); }
  render();
  window.scrollTo(0, 0);
  safeSave();
}
function revealAll() {
  Object.keys(session.hidden).forEach(function (k) { session.shown[k] = true; });
  session.revealed = true;
  session.lockUntil = Date.now() + 450;
  render();
}
function checkAllShown() {
  var all = Object.keys(session.hidden).every(function (k) { return session.shown[k]; });
  if (all) { session.revealed = true; session.lockUntil = Date.now() + 450; }
}

// ===== 判例マッチング(タップで結ぶ) =====
var PER_ROUND = 4;
function startMatch(cards, label) {
  if (!cards.length) return;
  session = { cards: shuffle(cards), mode: "match", label: label, okN: 0, missN: 0, round: 0, errs: {}, sel: null, flash: null };
  session.rounds = Math.ceil(session.cards.length / PER_ROUND);
  view = "match";
  prepareRound();
  render();
}
function prepareRound() {
  var pick = session.cards.slice(session.round * PER_ROUND, (session.round + 1) * PER_ROUND);
  session.pick = pick;
  session.left = shuffle(pick);
  session.right = shuffle(pick);
  session.done = {};
  session.sel = null;
}
function tapItem(side, id) {
  if (session.done[id]) return;
  var sel = session.sel;
  if (!sel || sel.side === side) {
    session.sel = (sel && sel.id === id) ? null : { side: side, id: id };
    render();
    return;
  }
  var leftId = side === "L" ? id : sel.id;
  var rightId = side === "R" ? id : sel.id;
  session.sel = null;
  if (leftId === rightId) {
    session.done[leftId] = true;
    if (!session.errs[leftId]) { session.okN++; state.ok[leftId] = (state.ok[leftId] || 0) + 1; safeSave(); }
    if (Object.keys(session.done).length === session.pick.length) session.pending = true;
    render();
  } else {
    // まちがい: 左側の判例を復習フォルダへ。画面は作り直さず、色だけ一瞬変える
    session.errs[leftId] = true;
    if (state.review.indexOf(leftId) < 0) state.review.push(leftId);
    safeSave();
    session.flash = { L: leftId, R: rightId };
    render();
    setTimeout(function () {
      session.flash = null;
      var w = document.querySelectorAll(".m-item.wrong");
      for (var i = 0; i < w.length; i++) w[i].classList.remove("wrong");
    }, 700);
  }
}
function nextRound() {
  session.pending = false;
  session.round++;
  if (session.round >= session.rounds) {
    session.missN = Object.keys(session.errs).length;
    session.okN = session.cards.length - session.missN;
    view = "result";
  } else { prepareRound(); }
  render();
  window.scrollTo(0, 0);
}
function restart(cards, mode, label) {
  if (mode === "match") startMatch(cards, label); else startSession(cards, mode, label);
}

// ===== 画面 =====
function el(tag, props, kids) {
  var e = document.createElement(tag);
  if (props) Object.keys(props).forEach(function (k) {
    if (props[k] === null || props[k] === undefined) return;
    if (k === "class") e.className = props[k];
    else if (k === "text") e.textContent = props[k];
    else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), props[k]);
    else e.setAttribute(k, props[k]);
  });
  (kids || []).forEach(function (c) { if (c) e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
  return e;
}
function secOf(id) { return SECTIONS.filter(function (s) { return s.id === id; })[0]; }
function cardsOfSec(id) { return CARDS.filter(function (c) { return c.sec === id; }); }
function reviewCards() { return CARDS.filter(function (c) { return state.review.indexOf(c.id) >= 0; }); }

function renderHome() {
  var rc = reviewCards();
  var levelBtns = [["少なめ", 1], ["ふつう", 2], ["多め", 3]].map(function (x) {
    return el("button", { type: "button", text: x[0], "aria-pressed": String(state.level === x[1]),
      onclick: function () { state.level = x[1]; save(); render(); } });
  });
  var secBtn = function (s) {
    var all = cardsOfSec(s.id);
    var done = all.filter(function (c) { return state.ok[c.id] > 0 && state.review.indexOf(c.id) < 0; }).length;
    var go = s.id === "9" ? function () { startMatch(all, s.name); } : function () { startSession(all, "normal", s.name); };
    var sub = s.id === "8" ? "全章 ・ " + all.length + "問 ・ 番号から内容、内容から番号" : s.id === "9" ? "全章 ・ " + all.length + "件 ・ タップで結ぶ" : "プリント " + s.page + " ・ " + all.length + "問";
    return el("button", { type: "button", class: "sec-btn", onclick: go }, [
      el("div", null, [el("div", { class: "nm", text: s.id + ". " + s.name }), el("div", { class: "pg", text: sub })]),
      el("div", { class: "st", text: "できた " + done + " / " + all.length }),
      el("div", { class: "bar" }, [el("i", { style: "width:" + Math.round(done / all.length * 100) + "%" })])
    ]);
  };
  var chapBtns = SECTIONS.filter(function (s) { return s.kind === "chap"; }).map(secBtn);
  var miniBtns = SECTIONS.filter(function (s) { return s.kind === "mini"; }).map(secBtn);
  var drillCards = CARDS.filter(function (c) { return secOf(c.sec).kind === "chap"; });
  var review = el("button", { type: "button", class: "review-card", onclick: function () { startSession(rc, "review", "復習フォルダ"); } }, [
    el("div", null, [el("div", { class: "big", text: "復習フォルダ" }), el("small", { text: rc.length ? "まちがえた問題だけ出題。「できた」で外れます" : "まちがえた問題がここにたまります" })]),
    el("div", { class: "count", text: String(rc.length) })
  ]);
  if (!rc.length) review.setAttribute("disabled", "");
  return el("div", { class: "home" }, [
    el("div", { class: "title-row" }, [el("h1", { text: "公共ドリル" }), el("div", { class: "sub", text: "高2 公共 ・ 第3章 基本原理" })]),
    review,
    el("div", { class: "level" }, [el("span", { text: "穴の数" }), el("div", { class: "seg", role: "group", "aria-label": "穴の数" }, levelBtns)]),
    el("h3", { class: "list-h", text: "章ごとの穴埋め" }),
    el("div", { class: "sec-list" }, chapBtns),
    el("button", { type: "button", class: "all-btn", text: "穴埋めを ぜんぶランダムに(" + drillCards.length + "問)", onclick: function () { startSession(drillCards, "normal", "穴埋めぜんぶ"); } }),
    el("h3", { class: "list-h", text: "ミニゲーム" }),
    el("div", { class: "sec-list" }, miniBtns),
    el("p", { class: "note", text: "穴の場所は、出すたびに変わります。答えは頭の中や紙に書いてから「答えを見る」を押して、合っていたかを自分で選びます。" }),
    el("p", { class: "sync", text: cloud.status })
  ]);
}

function renderQuiz() {
  var c = session.cards[session.i];
  var bi = -1;
  var paras = session.paras.map(function (parts) {
    var p = el("p");
    parts.forEach(function (x) {
      if (x.b === undefined) { p.appendChild(document.createTextNode(x.t)); return; }
      bi++;
      var idx = bi;
      if (!session.hidden[idx]) { p.appendChild(el("span", { class: "shown-plain", text: x.b })); return; }
      var open = !!session.shown[idx];
      var b = el("button", { type: "button", class: "blank" + (open ? " shown" : ""), text: x.b,
        "aria-label": open ? "答え:" + x.b : "空欄。タップで答えを表示",
        onclick: function () { session.shown[idx] = true; checkAllShown(); render(); } });
      p.appendChild(b);
    });
    return p;
  });
  var tags = [el("span", { class: "chip", text: secOf(c.sec).id + ". " + secOf(c.sec).name })];
  if (session.mode === "review") tags.push(el("span", { class: "chip warn", text: "復習" }));
  var paper = el("div", { class: "paper" }, [
    el("div", { class: "tag" }, tags),
    el("h2", { text: c.title }),
    el("div", { class: "q-text" }, paras),
    el("p", { class: "hint", text: "空欄をタップすると、そこだけ答えが出ます。" })
  ]);
  if (c.kase && session.revealed) paper.appendChild(el("p", { class: "hint", text: "ポイント:" + c.kase.extra }));
  if (c.pending) paper.appendChild(el("p", { class: "pending-note", text: "この問題は、プリントの空欄だった部分を教科書の知識で埋めています。先生のノートと見比べてください。" }));
  var pct = Math.round(session.i / session.cards.length * 100);
  var top = el("div", { class: "topbar" }, [
    el("div", { class: "row" }, [
      el("button", { type: "button", class: "back", text: "‹ もどる", onclick: function () { view = "home"; render(); } }),
      el("div", { class: "counter", text: (session.i + 1) + " / " + session.cards.length })
    ]),
    el("div", { class: "bar" }, [el("i", { style: "width:" + pct + "%" })])
  ]);
  var actions = session.revealed
    ? el("div", { class: "actions two" }, [
        el("button", { type: "button", class: "act miss", text: "まちがえた", onclick: function () { answer(false); } }),
        el("button", { type: "button", class: "act ok", text: "できた", onclick: function () { answer(true); } })
      ])
    : el("div", { class: "actions" }, [el("button", { type: "button", class: "act reveal", text: "答えを見る", onclick: revealAll })]);
  return el("div", { class: "quiz" }, [top, el("div", { class: "quiz-body" }, [paper, actions])]);
}

function renderResult() {
  var rc = reviewCards();
  var btns = [];
  if (rc.length) btns.push(el("button", { type: "button", class: "btn2 primary", text: "復習フォルダを出題(" + rc.length + "問)", onclick: function () { startSession(rc, "review", "復習フォルダ"); } }));
  btns.push(el("button", { type: "button", class: "btn2" + (rc.length ? "" : " primary"), text: "もう一度(出し方を変えて)", onclick: function () { restart(session.cards, session.mode, session.label); } }));
  btns.push(el("button", { type: "button", class: "btn2", text: "ホームへ", onclick: function () { view = "home"; render(); } }));
  return el("div", { class: "result" }, [
    el("h2", { text: session.label + " おつかれさま" }),
    el("div", { class: "score" }, [
      el("div", { class: "ok" }, [el("b", { text: String(session.okN) }), "できた"]),
      el("div", { class: "miss" }, [el("b", { text: String(session.missN) }), "まちがえた"])
    ]),
    el("div", { class: "btns" }, btns)
  ]);
}

function renderMatch() {
  var leftBtns = session.left.map(function (c) {
    var done = !!session.done[c.id], sel = !!session.sel && session.sel.side === "L" && session.sel.id === c.id;
    var bad = !!session.flash && session.flash.L === c.id;
    return el("button", { type: "button", class: "m-item" + (done ? " done" : "") + (sel ? " sel" : "") + (bad ? " wrong" : ""),
      "aria-pressed": String(sel), disabled: done ? "" : null, text: c.kase.name.replace(/[『』]/g, ""),
      onclick: function () { tapItem("L", c.id); } });
  });
  var rightBtns = session.right.map(function (c) {
    var done = !!session.done[c.id], sel = !!session.sel && session.sel.side === "R" && session.sel.id === c.id;
    var bad = !!session.flash && session.flash.R === c.id;
    return el("button", { type: "button", class: "m-item right" + (done ? " done" : "") + (sel ? " sel" : "") + (bad ? " wrong" : ""),
      "aria-pressed": String(sel), disabled: done ? "" : null, text: c.kase.what, onclick: function () { tapItem("R", c.id); } });
  });
  var top = el("div", { class: "topbar" }, [
    el("div", { class: "row" }, [
      el("button", { type: "button", class: "back", text: "‹ もどる", onclick: function () { view = "home"; render(); } }),
      el("div", { class: "counter", text: "ラウンド " + (session.round + 1) + " / " + session.rounds })
    ]),
    el("div", { class: "bar" }, [el("i", { style: "width:" + Math.round(session.round / session.rounds * 100) + "%" })])
  ]);
  var paper = el("div", { class: "paper" }, [
    el("div", { class: "tag" }, [el("span", { class: "chip", text: "9. 判例マッチング" })]),
    el("h2", { text: "事件名と内容を結ぶ" }),
    el("p", { class: "hint", text: "事件名と内容を1つずつタップして結びます(左右どちらから押してもOK)。まちがえた事件は復習フォルダに入ります。" }),
    el("div", { class: "m-grid" }, [el("div", { class: "m-col" }, leftBtns), el("div", { class: "m-col" }, rightBtns)])
  ]);
  var actions = session.pending
    ? el("div", { class: "actions" }, [el("button", { type: "button", class: "act reveal", text: session.round + 1 >= session.rounds ? "結果を見る" : "次のラウンドへ", onclick: nextRound })])
    : null;
  return el("div", { class: "quiz" }, [top, el("div", { class: "quiz-body" }, [paper, actions])]);
}

function render() {
  var app = document.getElementById("app");
  app.textContent = "";
  app.appendChild(view === "home" ? renderHome() : view === "quiz" ? renderQuiz() : view === "match" ? renderMatch() : renderResult());
}

loadLocal();
render();
connectCloud();
