var stage = 0;
// "player", 3, 1, 2
enemies = [];
order = [];
attackIndex = 0;

function initStage() {
  enemies = []
  var stageType = Math.round(Math.random() * 0);
  switch (stageType) {
    case 0:
      enemies.push(new EnemyBat())
      enemies.push(new EnemyBat())
      enemies.push(new EnemyBat())
      break;
  }
  attackIndex = enemies.length;
}

function loopStage() {
  if (attackIndex == enemies.length) {
    order = [];
    while (order.length == enemies.length + 1) {

    }
  }
}

function finishStage() {

}
