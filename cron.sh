cd $(dirname "$0");
/usr/local/bin/npm run auto-update;
/usr/local/bin/node autoupdate/autoupdate.js;
git add ajax/libs;
git commit -m "bot-auto-update";
git push;
