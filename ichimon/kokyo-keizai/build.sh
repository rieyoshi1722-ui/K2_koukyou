set -e
cd /home/claude/k2_koukyou/ichimon/kokyo-keizai
cat src/data.js src/app.js > /tmp/kkall.js; node --check /tmp/kkall.js
{ echo '<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>html{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}</style>'; cat src/head.html; echo '</head><body><div id="app"></div><script>'; cat /tmp/kkall.js; echo '</script></body></html>'; } > index.html
{ cat src/head.html; echo '<div id="app"></div>'; echo '<script>'; cat /tmp/kkall.js; echo '</script>'; } > /tmp/claude-0/-home-claude/82e228da-9681-52f4-bb13-98a196c0749f/scratchpad/artifact_kk.html
