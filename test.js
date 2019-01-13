var fs = require('fs');
var passed = 0;
var failed = 0;
console.log("")
function loadJSFile(file) {
  eval.call(global, fs.readFileSync(file) + '');
};
loadJSFile("./scripts/game.js");
drawHUD = function() {};

function fail(e) {
  console.log("\x1b[31m Test " + e + " failed!");
  failed++;
};

function pass(e) {
  console.log("\x1b[32m Test " + e + " passed!");
  passed++;
}

function test(e, test) {
  if (test) {
    pass(e)
  } else {
    fail(e)
  }
}

//Test if Player gets proper inited
initPlayer();
test("initPlayer()", !(player.baseAgi != 10 || player.baseInt != 10 || player.baseStr != 10 || player.level != 1 || player.items.length != 0 || player.xp != 0 || player.gold != 50 || player.baseAttackdamage != 50));

//Test if stats are proper calced
var testItem = {};
testItem.str = 10;
testItem.agi = 15;
testItem.armor = 3;
testItem.maxHealth = 4000;
player.items.push(testItem);
calcPlayerStats();

test("calcPlayerStats()",!(player.spellamp != 0 || player.damageBlock != 0 || player.maxHealth != 4400 || player.maxMana != 200 || player.armor != 5.5 || player.init != 25 || player.attackdamage != 50 || player.healthRegen != 20 || player.manaRegen != 10 || player.agi != 25 || player.str != 20 || player.int != 10 || player.health != 4400 || player.mana != 200));

//-------
//Summary
//-------
console.log("\n \x1b[47m\x1b[30m -----------------\x1b[0m");
console.log(" \x1b[47m\x1b[30m " + passed + "/" + (passed + failed) + " Tests passed!\x1b[0m");
console.log(" \x1b[47m\x1b[30m -----------------\x1b[0m\n");
if (failed > 0) {
  console.log(" exitcode: 1\n");
  process.exit(1);
} else {
  console.log(" exitcode: 0\n");
  process.exit(0);
};
