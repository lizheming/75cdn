cd $(dirname "$0");
npm run auto-update;
node autoupdate/autoupdate.js;
git add ajax/libs;
git commit -m "bot-auto-update";
git push;