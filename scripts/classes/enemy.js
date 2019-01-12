class Enemy {
  constructor() {

  }

  attack() {

  }
}

class EnemyBat extends Enemy {
  constructor() {
    super();
    this.init = 10 + stage * 2 * (Math.random() * 0.2 + 1);
    this.maxHealth = 300 + stage * 10 * (Math.random() * 0.2 + 1);
    this.maxHealth = Math.round(this.maxHealth)
    this.health = this.maxHealth;
    this.init = Math.round(this.init)
  }

  attack() {
    player.health -= calcDamage((20 + stage * 4 * (Math.random() * 0.2 + 1)), player.armor, player.damageBlock);
  }
}
