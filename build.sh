#!/bin/sh
# src/ の部品を1枚のHTML(page.html)にまとめる
set -e
cd "$(dirname "$0")"
cat src/data1.js src/data2.js src/data3.js src/data4.js src/data5.js src/app.js > /tmp/kokyo-all.js
node --check /tmp/kokyo-all.js
{ cat src/head.html; echo '<div id="app"></div>'; echo '<script>'; cat /tmp/kokyo-all.js; echo '</script>'; } > page.html
# GitHub Pages 用: ふつうのWebページとして開けるよう、スマホ表示の指定(viewport)などをつける
{
  echo '<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  echo '<style>html{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}</style>'
  cat src/head.html
  echo '</head><body><div id="app"></div><script>'
  cat /tmp/kokyo-all.js
  echo '</script></body></html>'
} > index.html
echo "built page.html / index.html"
