const fs = require("fs");
const src = ["data1.js", "data2.js", "data3.js", "data4.js", "data5.js"].map(f => fs.readFileSync(__dirname + "/../src/" + f, "utf8")).join("\n");
const vm = require("vm");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(src + "\nthis.CARDS = CARDS; this.SECTIONS = SECTIONS;", ctx);
const CARDS = ctx.CARDS;
let bad = 0;
const ids = {};
CARDS.forEach(c => {
  if (c.art || c.kase) { ids[c.id] = 1; return; }
  const o = (c.text.match(/\{\{/g) || []).length;
  const cl = (c.text.match(/\}\}/g) || []).length;
  const n = (c.text.match(/\{\{.+?\}\}/g) || []).length;
  if (o !== cl || o !== n || n < 2) { bad++; console.log("blank problem", c.id, o, cl, n); }
  if (ids[c.id]) console.log("dup", c.id);
  ids[c.id] = 1;
  if (!ctx.SECTIONS.some(s => s.id === c.sec)) console.log("bad sec", c.id);
});
console.log("cards", CARDS.length, "problems", bad);
const per = {};
CARDS.forEach(c => { per[c.sec] = (per[c.sec] || 0) + 1; });
console.log(JSON.stringify(per));
