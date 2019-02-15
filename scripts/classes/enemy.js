class Enemy {
  constructor() {

  }

  attack() {

  }
}

class EnemyBat extends Enemy {
  constructor() {
    super();
    this.init = 8 + stage * 2 * (Math.random() * 0.2 + 1) + Math.random() * 3;
    this.maxHealth = 300 + stage * 10 * (Math.random() * 0.2 + 1);
    this.maxHealth = Math.round(this.maxHealth)
    this.health = this.maxHealth;
    this.init = Math.round(this.init)
  }

  async attack() {
    var dmg = (20 + stage * 4 * (Math.random() * 0.2 + 1));
    await popup(1400 / 2, 900 / 2, "-" + dmg)
    player.health -= calcDamage(dmg, player.armor, player.damageBlock);
  }

  getImage() {
    return images.mobs["pipo-enemy001"];
  }
}
