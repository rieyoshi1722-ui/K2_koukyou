var CARDS = RAW.map(function (r, i) { r.id = r.s + "-" + (i + 1); r.sec = r.s; r.page = r.p; return r; });
var pick = null;
var LS_KEY = "eigo2-ichimon-v1";
var state = { review: [], ok: {}, order: "order", auto: false, vja: "", ven: "" };
function loadState() {
  try {
    var raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    var s = JSON.parse(raw);
    if (s && Array.isArray(s.review)) state = { review: s.review.slice(), ok: Object.assign({}, s.ok || {}), order: s.order === "random" ? "random" : "order", auto: s.auto === true, vja: s.vja || "", ven: s.ven || "" };
  } catch (e) {}
}
function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} }

var view = "home", session = null, noteId = null;
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function secOf(id) { return SECTIONS.filter(function (s) { return s.id === id; })[0]; }
function cardsOfSec(id) { return CARDS.filter(function (c) { return c.sec === id; }); }
function reviewCards() { return CARDS.filter(function (c) { return state.review.indexOf(c.id) >= 0; }); }

function start(cards, mode, label) {
  stopSpeak();
  if (!cards.length) return;
  session = { cards: state.order === "order" && mode !== "review" ? cards.slice() : shuffle(cards), i: 0, mode: mode, label: label, okN: 0, missN: 0, shown: false, lockUntil: 0 };
  view = "quiz"; pick = null;
  render();
}
var CAN_SPEAK = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
function stopSpeak() { if (CAN_SPEAK) { try { speechSynthesis.cancel(); } catch (e) {} } }
function cleanJa(t) { return String(t).replace(/[＝=]/g, " は、").replace(/[〜~→]/g, " ").replace(/[()（）「」]/g, " ").replace(/\//g, "、").replace(/\n/g, "。"); }
function trOf(c) {
  if (c.s === "v1" || c.s === "v2") return "";
  var full = c.full || "", m = full.match(/^(.*?)\((.*)\)$/), en = m ? m[1] : full;
  if (typeof TR !== "undefined" && TR[en]) return TR[en];
  if (c.jp) return c.jp;
  return m && !/Vocabulary|選ぶ/.test(m[2]) ? m[2] : "";
}
function enOf(c) {
  var full = c.full || "", m = full.match(/^(.*?)\((.*)\)$/);
  return (m ? m[1] : full).trim();
}
var VOICES = [];
function loadVoices() { try { VOICES = CAN_SPEAK ? speechSynthesis.getVoices() : []; } catch (e) { VOICES = []; } }
function voicesOf(lang) { var p = lang.slice(0, 2).toLowerCase(); return VOICES.filter(function (v) { return v.lang && v.lang.slice(0, 2).toLowerCase() === p; }); }
function scoreVoice(v) {
  var n = v.name || "", sc = 0;
  if (/premium|enhanced|neural|natural|online|拡張|プレミアム/i.test(n)) sc += 20;
  if (/kyoko|o-ren|otoya|samantha|ava|allison|nicky|karen|moira|serena|siri|google/i.test(n)) sc += 8;
  if (/compact/i.test(n)) sc -= 5;
  return sc;
}
function pickVoice(lang, saved) {
  var list = voicesOf(lang);
  if (!list.length) return null;
  if (saved) { var s = list.filter(function (v) { return v.name === saved; })[0]; if (s) return s; }
  return list.slice().sort(function (a, b) { return scoreVoice(b) - scoreVoice(a); })[0];
}
if (CAN_SPEAK) { loadVoices(); try { speechSynthesis.addEventListener("voiceschanged", function () { loadVoices(); if (view === "home") render(); }); } catch (e) {} }
function sayAll(parts) {
  parts.forEach(function (x) {
    if (!x[0] || !String(x[0]).trim()) return;
    var u = new SpeechSynthesisUtterance(x[0]);
    u.lang = x[1];
    var v = pickVoice(x[1], x[1] === "en-US" ? state.ven : state.vja);
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = x[1] === "en-US" ? 0.9 : 0.95;
    u.pitch = 1.05;
    speechSynthesis.speak(u);
  });
}
function speakCard(c) {
  if (!CAN_SPEAK) return;
  stopSpeak();
  var parts = [["答えは、", "ja-JP"]];
  var isVocab = c.s === "v1" || c.s === "v2";
  if (isVocab) {
    parts.push([c.s === "v1" ? c.en : c.a, "en-US"]);
    parts.push([c.s === "v1" ? c.a : c.jp, "ja-JP"]);
  } else {
    var en = enOf(c), tr = trOf(c);
    if (c.opts) parts.push([c.opts[c.ok], "en-US"]);
    if (en && /[A-Za-z]/.test(en)) parts.push([en, "en-US"]); else parts.push([cleanJa(c.a), "ja-JP"]);
    if (tr) parts.push(["和訳。" + cleanJa(tr), "ja-JP"]);
    if (c.exp) parts.push(["解説。" + cleanJa(c.exp), "ja-JP"]);
  }
  sayAll(parts);
}
function reveal() { session.shown = true; session.lockUntil = Date.now() + 450; render(); if (state.auto) speakCard(session.cards[session.i]); }
function answer(good) {
  stopSpeak();
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
  session.shown = false; pick = null;
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

function voiceSel(label, lang, key) {
  var list = voicesOf(lang), cur = pickVoice(lang, state[key]);
  var sel = el("select", { class: "voice-sel", "aria-label": label, onchange: function (e) { state[key] = e.target.value; save(); speakCard({ s: "v1", en: lang === "en-US" ? "Hello. Nice to meet you." : "", a: lang === "en-US" ? "" : "こんにちは。いっしょにがんばりましょう。" , jp: "" }); } },
    list.map(function (v) { var o = el("option", { value: v.name, text: v.name }); if (cur && cur.name === v.name) o.setAttribute("selected", ""); return o; }));
  return el("label", { class: "voice-row" }, [el("span", { text: label }), sel]);
}
function renderVoiceSettings() {
  var kids = [el("summary", { text: "声の設定(やわらかい声をえらぶ)" })];
  if (voicesOf("ja-JP").length) kids.push(voiceSel("日本語の声", "ja-JP", "vja"));
  if (voicesOf("en-US").length) kids.push(voiceSel("英語の声", "en-US", "ven"));
  kids.push(el("p", { class: "note", text: "「拡張」「Enhanced」「Premium」とついた声が、やわらかく聞こえます。声は、えらぶとためし読みします。iPhoneでは「設定」→「アクセシビリティ」→「読み上げコンテンツ」→「声」で、声を追加できます。" }));
  return el("details", { class: "voice-box" }, kids);
}
function renderHome() {
  var rc = reviewCards();
  var optBtns = [["ランダム", "random"], ["順番どおり", "order"]].map(function (x) {
    return el("button", { type: "button", text: x[0], "aria-pressed": String(state.order === x[1]), onclick: function () { state.order = x[1]; save(); render(); } });
  });
  var secBtns = SECTIONS.map(function (s) {
    if (s.kind === "note") return el("button", { type: "button", class: "sec-btn note-b", onclick: function () { view = "notes"; noteId = s.id; render(); window.scrollTo(0, 0); } }, [
      el("div", null, [el("div", { class: "nm", text: s.name }), el("div", { class: "pg", text: "よむだけ ・ プリント " + s.page })]),
      el("div", { class: "st", text: "ひらく ›" })
    ]);
    var all = cardsOfSec(s.id);
    var done = all.filter(function (c) { return state.ok[c.id] > 0 && state.review.indexOf(c.id) < 0; }).length;
    return el("button", { type: "button", class: "sec-btn" + (s.kind === "vocab" ? " vocab-b" : ""), onclick: function () { start(all, "normal", s.name); } }, [
      el("div", null, [el("div", { class: "nm", text: s.name }), el("div", { class: "pg", text: (s.kind === "vocab" ? "" : "プリント ") + s.page + " ・ " + all.length + "問" })]),
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
    el("div", { class: "title-row" }, [el("h1", { text: "英語 論理・表現 一問一答" }), el("div", { class: "sub", text: "Lesson 7-1〜8-2 ・ " + CARDS.length + "問" })]),
    review,
    CAN_SPEAK ? el("div", { class: "opt" }, [el("span", { text: "答えを声で読む" }), el("div", { class: "seg", role: "group", "aria-label": "答えを声で読む" }, [["自動で読む", true], ["ボタンで読む", false]].map(function (x) {
      return el("button", { type: "button", text: x[0], "aria-pressed": String(state.auto === x[1]), onclick: function () { state.auto = x[1]; save(); render(); } });
    }))]) : null,
    (CAN_SPEAK && VOICES.length) ? renderVoiceSettings() : null,
    el("div", { class: "opt" }, [el("span", { text: "出す順番" }), el("div", { class: "seg", role: "group", "aria-label": "出す順番" }, optBtns)]),
    el("div", { class: "sec-list" }, secBtns),
    el("p", { class: "note", text: "問題を読んで、頭の中や紙に答えを書いてから「答えを見る」を押します。えらぶ問題は、えらんでから押してね。合っていたかは自分で選びます。進み具合は、このスマホの中に保存されます。" })
  ]);
}

function renderQuiz() {
  var c = session.cards[session.i];
  var tags = [];
  if (session.shown) tags.push(el("span", { class: "chip", text: secOf(c.sec).name.split(" ")[0] }));
  if (session.shown && c.n) tags.push(el("span", { class: "chip sub2", text: c.n }));
  if (session.shown && c.page) tags.push(el("span", { class: "chip sub2", text: c.page }));
  if (session.mode === "review") tags.push(el("span", { class: "chip warn", text: "復習" }));
  var kids = tags.length ? [el("div", { class: "tag" }, tags)] : [];
  if (c.inst) kids.push(el("p", { class: "inst", text: c.inst }));
  if (c.jp) kids.push(el("p", { class: "jp", text: c.jp }));
  if (c.en) kids.push(el("p", { class: "en", text: c.en }));
  if (c.hint) kids.push(el("span", { class: "hint", text: c.hint }));
  if (c.img) kids.push(el("img", { class: "qimg", src: IMGS[c.img], alt: "問題のイラスト" }));
  if (c.opts) {
    kids.push(el("div", { class: "opts" }, c.opts.map(function (t, k) {
      var cls = "opt-b" + (session.shown ? (k === c.ok ? " right" : (k === pick ? " wrong" : "")) : "");
      var b = el("button", { type: "button", class: cls, "aria-pressed": String(!session.shown && pick === k), onclick: function () { if (session.shown) return; pick = k; render(); } }, [el("span", { class: "k", text: KANA[k] }), el("span", { text: t })]);
      return b;
    })));
  }
  if (session.shown) {
    var ans = c.opts ? KANA[c.ok] + "  " + c.opts[c.ok] : c.a;
    kids.push(el("div", { class: "a-box" }, [el("span", { class: "a-lbl", text: "答え" }), ans]));
    if (CAN_SPEAK) kids.push(el("div", { class: "speak-row" }, [
      el("button", { type: "button", class: "speak-b", text: "🔊 声で聞く", onclick: function () { speakCard(c); } }),
      el("button", { type: "button", class: "speak-b stop", text: "■ とめる", onclick: stopSpeak })
    ]));
    if (c.opts && pick !== null) kids.push(el("p", { class: "note", text: pick === c.ok ? "◎ えらんだ答えは正解!" : "えらんだのは「" + KANA[pick] + "」でした。" }));
    var _en = enOf(c), _tr = trOf(c);
    if (c.full) kids.push(el("p", { class: "full", text: _en || c.full }));
    if (_tr) kids.push(el("p", { class: "trans", text: "和訳:" + _tr }));
    if (c.exp) kids.push(el("div", { class: "exp" }, [el("span", { class: "a-lbl", text: "解説" }), c.exp]));
    if (c.note) kids.push(el("p", { class: "pending-note", text: c.note }));
  }
  var top = el("div", { class: "topbar" }, [
    el("div", { class: "row" }, [
      el("button", { type: "button", class: "back", text: "‹ もどる", onclick: function () { stopSpeak(); view = "home"; render(); } }),
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

function renderNotes() {
  var s = secOf(noteId), items = NOTES[noteId] || [];
  var pts = items.map(function (it) {
    var k = [el("h3", { text: it[0] })];
    it[1].split("\n").forEach(function (l) { k.push(el("p", { text: l })); });
    it[2].forEach(function (e) { k.push(el("div", { class: "eg", text: e })); });
    return el("div", { class: "pt" }, k);
  });
  return el("div", { class: "notes" }, [
    el("div", { class: "topbar" }, [el("div", { class: "row" }, [el("button", { type: "button", class: "back", text: "‹ もどる", onclick: function () { view = "home"; render(); } }), el("div", { class: "counter", text: "プリント " + s.page })])]),
    el("h2", { text: s.name })
  ].concat(pts).concat([el("button", { type: "button", class: "btn2", style: "margin-top:16px;width:100%", text: "ホームへ", onclick: function () { view = "home"; render(); window.scrollTo(0, 0); } })]));
}
function render() {
  var app = document.getElementById("app");
  app.textContent = "";
  app.appendChild(view === "home" ? renderHome() : view === "quiz" ? renderQuiz() : view === "notes" ? renderNotes() : renderResult());
}
loadState();
render();
