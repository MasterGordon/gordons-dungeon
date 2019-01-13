var fs = require('fs');

function loadJSFile(file) {
  eval.call(global, fs.readFileSync(file) + '');
}
loadJSFile("./scripts/game.js")
drawHUD = function() {}

function fail(e) {
  console.error(e);
  process.exit(1)
};

initPlayer();
if (player.baseAgi != 10 || player.baseInt != 10 || player.baseStr != 10 || player.level != 1 || player.items.length != 0 || player.xp != 0 || player.gold != 50 || player.baseAttackdamage != 50) {
  fail("Test failed on initPlayer()")
}
