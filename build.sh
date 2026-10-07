#!/bin/sh
# src/ の部品を1枚のHTML(page.html)にまとめる
set -e
cd "$(dirname "$0")"
cat src/data1.js src/data2.js src/data3.js src/data4.js src/data5.js src/app.js > /tmp/kokyo-all.js
node --check /tmp/kokyo-all.js
{ cat src/head.html; echo '<div id="app"></div>'; echo '<script>'; cat /tmp/kokyo-all.js; echo '</script>'; } > page.html
cp page.html index.html  # GitHub Pages 用
echo "built page.html / index.html"
