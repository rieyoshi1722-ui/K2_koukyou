var CARDS = RAW.map(function (r, i) {
  return { id: r[0] + "-" + (i + 1), sec: r[0], q: r[1], a: r[2], pending: r[3] === 1 || r[3] === true };
});
var LS_KEY = "kokyo-ichimon-kokyo-v1";
var state = { review: [], ok: {}, order: "random" };
function loadState() {
  try {
    var raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    var s = JSON.parse(raw);
    if (s && Array.isArray(s.review)) state = { review: s.review.slice(), ok: Object.assign({}, s.ok || {}), order: s.order === "order" ? "order" : "random" };
  } catch (e) {}
}
function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} }

var view = "home", session = null;
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function secOf(id) { return SECTIONS.filter(function (s) { return s.id === id; })[0]; }
function cardsOfSec(id) { return CARDS.filter(function (c) { return c.sec === id; }); }
function reviewCards() { return CARDS.filter(function (c) { return state.review.indexOf(c.id) >= 0; }); }

function start(cards, mode, label) {
  if (!cards.length) return;
  session = { cards: state.order === "order" && mode !== "review" ? cards.slice() : shuffle(cards), i: 0, mode: mode, label: label, okN: 0, missN: 0, shown: false, lockUntil: 0 };
  view = "quiz";
  render();
}
function reveal() { session.shown = true; session.lockUntil = Date.now() + 450; render(); }
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
  session.shown = false;
  if (session.i >= session.cards.length) view = "result";
  render();
  window.scrollTo(0, 0);
  save();
}

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

function renderHome() {
  var rc = reviewCards();
  var optBtns = [["ランダム", "random"], ["順番どおり", "order"]].map(function (x) {
    return el("button", { type: "button", text: x[0], "aria-pressed": String(state.order === x[1]), onclick: function () { state.order = x[1]; save(); render(); } });
  });
  var secBtns = SECTIONS.map(function (s) {
    var all = cardsOfSec(s.id);
    var done = all.filter(function (c) { return state.ok[c.id] > 0 && state.review.indexOf(c.id) < 0; }).length;
    return el("button", { type: "button", class: "sec-btn", onclick: function () { start(all, "normal", s.name); } }, [
      el("div", null, [el("div", { class: "nm", text: s.id + ". " + s.name }), el("div", { class: "pg", text: "プリント " + s.page + " ・ " + all.length + "問" })]),
      el("div", { class: "st", text: "できた " + done + " / " + all.length }),
      el("div", { class: "bar" }, [el("i", { style: "width:" + Math.round(done / all.length * 100) + "%" })])
    ]);
  });
  var review = el("button", { type: "button", class: "review-card", onclick: function () { start(rc, "review", "復習フォルダ"); } }, [
    el("div", null, [el("div", { class: "big", text: "復習フォルダ" }), el("small", { text: rc.length ? "まちがえた問題だけ出題。「できた」で外れます" : "まちがえた問題がここにたまります" })]),
    el("div", { class: "count", text: String(rc.length) })
  ]);
  if (!rc.length) review.setAttribute("disabled", "");
  return el("div", { class: "home" }, [
    el("div", { class: "title-row" }, [el("h1", { text: "公共 一問一答" }), el("div", { class: "sub", text: "憲法・基本的人権 ・ " + CARDS.length + "問" })]),
    review,
    el("div", { class: "opt" }, [el("span", { text: "出す順番" }), el("div", { class: "seg", role: "group", "aria-label": "出す順番" }, optBtns)]),
    el("div", { class: "sec-list" }, secBtns),
    el("button", { type: "button", class: "all-btn", text: "ぜんぶ出題(" + CARDS.length + "問)", onclick: function () { start(CARDS, "normal", "ぜんぶ"); } }),
    el("p", { class: "note", text: "問題を読んで、頭の中や紙に答えを書いてから「答えを見る」を押します。合っていたかは自分で選びます。進み具合は、このスマホの中に保存されます。" })
  ]);
}

function renderQuiz() {
  var c = session.cards[session.i];
  var tags = [];
  if (session.shown) tags.push(el("span", { class: "chip", text: secOf(c.sec).id + ". " + secOf(c.sec).name }));
  if (session.mode === "review") tags.push(el("span", { class: "chip warn", text: "復習" }));
  var kids = (tags.length ? [el("div", { class: "tag" }, tags)] : []).concat([el("p", { class: "q", text: c.q })]);
  if (session.shown) kids.push(el("div", { class: "a-box" }, [el("span", { class: "a-lbl", text: "答え" }), c.a]));
  if (session.shown && c.pending) kids.push(el("p", { class: "pending-note", text: "この答えは、プリントが空欄だった部分を教科書の知識で埋めています。先生のノートと見比べてください。" }));
  var top = el("div", { class: "topbar" }, [
    el("div", { class: "row" }, [
      el("button", { type: "button", class: "back", text: "‹ もどる", onclick: function () { view = "home"; render(); } }),
      el("div", { class: "counter", text: (session.i + 1) + " / " + session.cards.length })
    ]),
    el("div", { class: "bar" }, [el("i", { style: "width:" + Math.round(session.i / session.cards.length * 100) + "%" })])
  ]);
  var actions = session.shown
    ? el("div", { class: "actions two" }, [
        el("button", { type: "button", class: "act miss", text: "まちがえた", onclick: function () { answer(false); } }),
        el("button", { type: "button", class: "act ok", text: "できた", onclick: function () { answer(true); } })
      ])
    : el("div", { class: "actions" }, [el("button", { type: "button", class: "act reveal", text: "答えを見る", onclick: reveal })]);
  return el("div", { class: "quiz" }, [top, el("div", { class: "card" }, kids), actions]);
}

function renderResult() {
  var rc = reviewCards();
  var btns = [];
  if (rc.length) btns.push(el("button", { type: "button", class: "btn2 primary", text: "復習フォルダを出題(" + rc.length + "問)", onclick: function () { start(rc, "review", "復習フォルダ"); } }));
  btns.push(el("button", { type: "button", class: "btn2" + (rc.length ? "" : " primary"), text: "もう一度", onclick: function () { start(session.cards, session.mode, session.label); } }));
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

function render() {
  var app = document.getElementById("app");
  app.textContent = "";
  app.appendChild(view === "home" ? renderHome() : view === "quiz" ? renderQuiz() : renderResult());
}
loadState();
render();
