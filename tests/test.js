const fs = require("fs"), vm = require("vm");
function mk() {
  return { children: [], attrs: {}, className: "", textContent: "",
    appendChild(c) { this.children.push(c); return c; },
    setAttribute(k, v) { this.attrs[k] = v; }, addEventListener() {} };
}
const app = mk();
const ctx = {
  console, setTimeout: (f) => 0, clearTimeout() {},
  window: { scrollTo() {} },
  document: { createElement: mk, createTextNode: (t) => ({ text: t }), getElementById: () => app },
  localStorage: { getItem: () => null, setItem() {} }
};
ctx.window.claude = undefined;
vm.createContext(ctx);
const src = ["data1.js", "data2.js", "data3.js", "data4.js", "data5.js", "app.js"].map(f => fs.readFileSync(__dirname + "/../src/" + f, "utf8")).join("\n");
vm.runInContext(src + "\nthis.T = {CARDS, startSession, startMatch, tapItem, nextRound, buildText, answer, revealAll, getS: () => session, getV: () => view, getState: () => state, SECTIONS};", ctx);
const T = ctx.T;
// 条文・判例の向きがランダムに変わる
const art = T.CARDS.find(c => c.id === "8-14");
const kase = T.CARDS.find(c => c.id === "9-6");
const seen = new Set();
for (let i = 0; i < 30; i++) { seen.add(T.buildText(art)); seen.add(T.buildText(kase)); }
console.log([...seen].join("\n"));
// 条文クイズを1問通す
const arts = T.CARDS.filter(c => c.sec === "8");
T.startSession(arts, "normal", "条文");
T.revealAll(); T.answer(true); console.log("tap right after reveal ignored, i =", T.getS().i); T.getS().lockUntil = 0; T.answer(false); console.log("after real tap, i =", T.getS().i);
console.log("after miss review:", JSON.stringify(T.getState().review), "view", T.getV());
// マッチング: 全部正解 + 1回まちがい
const cases = T.CARDS.filter(c => c.sec === "9");
T.startMatch(cases, "判例");
let s = T.getS();
for (let r = 0; r < s.rounds; r++) {
  s = T.getS();
  const first = s.left[0].id, other = s.right.find(c => c.id !== first).id;
  if (r === 0) { T.tapItem("R", other); T.tapItem("L", first); }
  s.pick.forEach(c => { T.tapItem("R", c.id); T.tapItem("L", c.id); });
  console.log("round", r, "pending", T.getS().pending);
  T.nextRound();
}
s = T.getS();
console.log("view", T.getV(), "ok", s.okN, "miss", s.missN, "review", JSON.stringify(T.getState().review));
