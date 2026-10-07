const fs = require("fs"), vm = require("vm");
function mk() { return { children: [], attrs: {}, className: "", textContent: "", appendChild(c) { this.children.push(c); return c; }, setAttribute(k, v) { this.attrs[k] = v; }, addEventListener() {}, classList: { remove() {} } }; }
const frozenDoc = Object.freeze({ review: Object.freeze(["8-1"]), ok: Object.freeze({ "8-2": 1 }), level: 2 });
const db = { doc: () => ({ get: () => Promise.resolve({ exists: true, data: () => frozenDoc }), set: () => Promise.resolve() }) };
const ctx = { console, setTimeout, clearTimeout, window: { scrollTo() {}, claude: { use: (n) => Promise.resolve(n === "db" ? db : { id: () => Promise.resolve("u_1") }) } },
  document: { createElement: mk, createTextNode: (t) => ({ text: t }), getElementById: () => mk(), querySelectorAll: () => [] },
  localStorage: { getItem: () => null, setItem() {} } };
ctx.window.claude.use = ctx.window.claude.use;
vm.createContext(ctx);
const src = ["data1.js", "data2.js", "data3.js", "data4.js", "data5.js", "app.js"].map(f => fs.readFileSync(__dirname + "/../src/" + f, "utf8")).join("\n");
vm.runInContext(src + "\nthis.T = {CARDS, startSession, answer, revealAll, getS: () => session, getState: () => state};", ctx);
setTimeout(() => {
  const T = ctx.T;
  T.startSession(T.CARDS.filter(c => c.sec === "8"), "normal", "条文");
  T.revealAll(); T.getS().lockUntil = 0;
  try { T.answer(false); console.log("miss ok, i =", T.getS().i, "review", JSON.stringify(T.getState().review)); } catch (e) { console.log("MISS FAILED:", e.message); }
  T.revealAll(); T.getS().lockUntil = 0;
  T.answer(true); console.log("ok ok, i =", T.getS().i, "ok map", JSON.stringify(T.getState().ok));
}, 50);
