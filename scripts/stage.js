var stage = 0;
// "player", 3, 1, 2
var enemies = [];
var order = [];
var attackIndex = 0;

var isPlayersTurn = false;

function initStage() {
  enemies = []
  var stageType = Math.round(Math.random() * 0);
  switch (stageType) {
    case 0:
      enemies.push(new EnemyBat())
      enemies.push(new EnemyBat())
      enemies.push(new EnemyBat())
      enemies.push(new EnemyBat())
      enemies.push(new EnemyBat())
      break;
  }
  attackIndex = enemies.length;
}

function drawEnemies() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 1400, 510)
  ctx.fillStyle = "white";
  ctx.font = "20px PS2P";
  ctx.textAlign = "center";
  var abstand = 1400 / enemies.length;
  for (var i = 0; i < enemies.length; i++) {
    ctx.drawImage(enemies[i].getImage(), abstand * i + (abstand / 2 - 187.5), 100, 375, 375);
    ctx.fillText(enemies[i].getHealth(), abstand * i + (abstand / 2 - 187.5) + 375 / 2, 430);
  }
}

async function loopStage() {
  // Start Calc Attack Order
  if (attackIndex == enemies.length) {
    order = [];
    while (!(order.length == enemies.length + 1)) {
      var current = -1;
      var currentInit = -1;
      if (order.indexOf("player") == -1) {
        current = "player";
        currentInit = player.init;
      }
      for (var i = 0; i < enemies.length; i++) {
        if (order.indexOf(i) == -1) {
          if (enemies[i].init > currentInit) {
            current = i;
            currentInit = enemies[i].init;
          }
        }
      }
      order.push(current);
    }
    attackIndex = 0;
  }
  // Finish Calc Attack Order
  drawEnemies();
  // Action Phase
  var currentActor = order[attackIndex];
  if (currentActor == "player") {
    isPlayersTurn = true;
    //TODO
  } else {
    currentActor = enemies[currentActor];
    await currentActor.attack();
  }
  // Finished Attacking Phase
  attackIndex++;
}

function finishStage() {

}
