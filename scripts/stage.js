var stage = 0;
// "player", 3, 1, 2
var enemies = [];
var order = [];
var attackIndex = 0;

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
  // Start Calc Attack Order
  if (attackIndex == enemies.length) {
    order = [];
    while (!(order.length == enemies.length + 1)) {
      var current = -1;
      var currentInit = -1;
      if(order.indexOf("player")==-1){
        current = "player";
        currentInit = player.init;
      }
      for(var i=0;i<enemies.length;i++){
        if(order.indexOf(i)==-1){
          if(enemies[i].init>currentInit){
            current = i;
            currentInit = enemies[i].init;
          }
        }
      }
      order.push(current);
    }
  }
  // Finish Calc Attack Order
}

function finishStage() {

}
