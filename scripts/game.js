var player = {};

function initPlayer() {
  player.baseAttackdamage = 50;
  player.baseStr = 10;
  player.baseInt = 10;
  player.baseAgi = 10;
  player.level = 1;
  player.items = [];
  player.xp = 0;
  player.gold = 50;
  player.a1 = "empty";
  player.a2 = "empty";
  player.a3 = "empty";
  player.a4 = "empty";
  player.a5 = "empty";
  player.u = "empty";
  player.t1 = "empty";
  player.t2 = "empty";
  calcPlayerStats();
}

function calcPlayerStats() {
  player.spellamp = 0;
  player.damageBlock = 0;
  player.maxHealth = 0;
  player.maxMana = 0;
  player.armor = 0;
  player.init = 0;
  player.attackdamage = 0;
  player.healthRegen = 0;
  player.manaRegen = 0;
  player.agi = player.baseAgi;
  player.str = player.baseStr;
  player.int = player.baseInt;

  for (var i = 0; i < player.items.length; i++) {
    var item = player.items[i];
    if (typeof item.maxHealth !== 'undefined') {
      player.maxHealth += item.maxHealth;
    }
    if (typeof item.maxMana !== 'undefined') {
      player.maxMana += item.maxMana;
    }
    if (typeof item.armor !== 'undefined') {
      player.armor += item.armor;
    }
    if (typeof item.healthRegen !== 'undefined') {
      player.healthRegen += item.healthRegen;
    }
    if (typeof item.manaRegen !== 'undefined') {
      player.manaRegen += item.manaRegen;
    }
    if (typeof item.str !== 'undefined') {
      player.str += item.str;
    }
    if (typeof item.int !== 'undefined') {
      player.int += item.int;
    }
    if (typeof item.agi !== 'undefined') {
      player.agi += item.agi;
    }
    if (typeof item.init !== 'undefined') {
      player.init += item.init;
    }
    if (typeof item.attackdamage !== 'undefined') {
      player.attackdamage += item.attackdamage;
    }
  }

  player.maxHealth += player.str * 20;
  player.maxMana += player.int * 20;
  player.armor += player.agi / 10;
  player.init += player.agi;
  player.attackdamage += player.baseAttackdamage;
  player.healthRegen += player.str;
  player.manaRegen += player.int;
  player.health = player.maxHealth;
  player.mana = player.maxMana;

  drawHUD();
}

function calcDamage(damage, armor, block) {
  var effectiveDamage = damage - block;
  var reduction = (-Math.pow(Math.E, (-0.02 * armor)) + 1);
  effectiveDamage = Math.round(effectiveDamage * (1-reduction));
  return effectiveDamage;
}

function drawHUD() {
  hudTooltips = []
  ctx.fillStyle = "#202020";
  ctx.fillRect(0, 700, 1400, 200)
  ctx.fillStyle = "white";
  ctx.font = "40px PS2P";
  ctx.textAlign = "center";
  ctx.fillText(player.level, 175, 800);
  ctx.font = "25px PS2P";
  ctx.fillText(player.xp + "/" + (player.level * player.level * 13 + 200), 175, 840);
  ctx.textAlign = "left";
  ctx.fillText("STR: " + player.str, 350, 733 + 12.5);
  hudTooltips.push({
    x: 350,
    y: (733 - 12.5),
    height: 25,
    width: 350,
    html: "<h1>Strength: " + player.str + "</h1><p>1 Strength = 1 Health Regen</p><p>1 Strength = 20 Health</p>"
  })
  ctx.fillText("AGI: " + player.agi, 350, 800 + 12.5);
  hudTooltips.push({
    x: 350,
    y: (800 - 12.5),
    height: 25,
    width: 350,
    html: "<h1>Agility: " + player.agi + "</h1><p>1 Agility = 1 Initiative</p><p>10 Agility = 1 Armor</p>"
  })
  ctx.fillText("INT: " + player.int, 350, 866 + 12.5);
  hudTooltips.push({
    x: 350,
    y: (866 - 12.5),
    height: 25,
    width: 350,
    html: "<h1>Intelligence: " + player.int + "</h1><p>1 Intelligence = 1 Mana Regen</p><p>1 Intelligence = 20 Mana</p>"
  })
  ctx.fillText("DAMAGE: " + player.attackdamage, 700, 733 + 12.5);
  hudTooltips.push({
    x: 700,
    y: (733 - 12.5),
    height: 25,
    width: 350,
    html: "<h1>Attack Damage: " + player.attackdamage + "</h1>"
  })
  ctx.fillText("SPELL: " + (player.spellamp * 100) + "%", 700, 800 + 12.5);
  hudTooltips.push({
    x: 700,
    y: (800 - 12.5),
    height: 25,
    width: 350,
    html: "<h1>Spell Amplification: " + player.spellamp * 100 + "%</h1><p>Your Spells deal more Damage</p>"
  })
  ctx.fillText("GOLD: " + player.gold, 700, 866 + 12.5);
  ctx.fillText("ARMOR: " + player.armor, 1050, 733 + 12.5);
  hudTooltips.push({
    x: 1050,
    y: (733 - 12.5),
    height: 25,
    width: 350,
    html: "<h1>Armor: " + player.armor + "</h1><p>Reduces the Attack Damage you take</p><p>Damage Reduction: " + Math.round(10000 * (-Math.pow(Math.E, (-0.02 * player.armor)) + 1)) / 100 + "%</p>"
  })
  ctx.fillText("BLOCK: " + player.damageBlock, 1050, 800 + 12.5);
  hudTooltips.push({
    x: 1050,
    y: (800 - 12.5),
    height: 25,
    width: 350,
    html: "<h1>Damage Block: " + player.damageBlock + "</h1><p>Incoming Attack Damage is Reduced by this</p>"
  })
  ctx.fillText("INIT: " + player.init, 1050, 866 + 12.5);
  hudTooltips.push({
    x: 1050,
    y: (866 - 12.5),
    height: 25,
    width: 350,
    html: "<h1>Initiative: " + player.init + "</h1><p>Determines the attackers order</p>"
  })

  //BARS
  ctx.fillStyle = "#a00000";
  ctx.fillRect(0, 660, 1400, 20)
  ctx.fillStyle = "#e00000";
  ctx.fillRect(0, 660, 1400 * (player.health / player.maxHealth), 20)

  ctx.fillStyle = "#0068ad";
  ctx.fillRect(0, 680, 1400, 20)
  ctx.fillStyle = "#0099ff";
  ctx.fillRect(0, 680, 1400 * (player.mana / player.maxMana), 20)
  ctx.font = "20px PS2P";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(player.health + "/" + player.maxHealth, 700, 682);
  ctx.fillText(player.mana + "/" + player.maxMana, 700, 702);
  ctx.textAlign = "end";
  ctx.fillText("+" + player.healthRegen, 1390, 682);
  ctx.fillText("+" + player.manaRegen, 1390, 702);

  if (player.a1 == "empty") {
    ctx.drawImage(images.icons.empty, 17.5, 510, 140, 140);
  } else {
    ctx.drawImage(images.icons[player.a1.getIcon()], 17.5, 510, 140, 140);
    hudTooltips.push({
      x: 17.5,
      y: 510,
      height: 140,
      width: 140,
      html: player.a1.getLore()
    })
  }
  if (player.a2 == "empty") {
    ctx.drawImage(images.icons.empty, 17.5 + 175, 510, 140, 140);
  } else {
    ctx.drawImage(images.icons[player.a2.getIcon()], 17.5 + 175, 510, 140, 140); //draw A1
    hudTooltips.push({
      x: 17.5,
      y: 510,
      height: 140,
      width: 140,
      html: player.a2.getLore()
    })
  }
  if (player.a3 == "empty") {
    ctx.drawImage(images.icons.empty, 17.5 + 175 * 2, 510, 140, 140);
  } else {
    ctx.drawImage(images.icons[player.a3.getIcon()], 17.5 + 175 * 2, 510, 140, 140); //draw A1
    hudTooltips.push({
      x: 17.5,
      y: 510,
      height: 140,
      width: 140,
      html: player.a3.getLore()
    })
  }
  if (player.a4 == "empty") {
    ctx.drawImage(images.icons.empty, 17.5 + 175 * 3, 510, 140, 140); //draw A1
  } else {
    ctx.drawImage(images.icons[player.a4.getIcon()], 17.5 + 175 * 3, 510, 140, 140); //draw A1
    hudTooltips.push({
      x: 17.5,
      y: 510,
      height: 140,
      width: 140,
      html: player.a4.getLore()
    })
  }
  if (player.a5 == "empty") {
    ctx.drawImage(images.icons.empty, 17.5 + 175 * 4, 510, 140, 140); //draw A1
  } else {
    ctx.drawImage(images.icons[player.a5.getIcon()], 17.5 + 175 * 4, 510, 140, 140); //draw A1
    hudTooltips.push({
      x: 17.5,
      y: 510,
      height: 140,
      width: 140,
      html: player.a5.getLore()
    })
  }
  if (player.u == "empty") {
    ctx.drawImage(images.icons.empty, 17.5 + 175 * 5, 510, 140, 140); //draw A1
  } else {
    ctx.drawImage(images.icons[player.u.getIcon()], 17.5 + 175 * 5, 510, 140, 140); //draw A1
    hudTooltips.push({
      x: 17.5,
      y: 510,
      height: 140,
      width: 140,
      html: player.u.getLore()
    })
  }
  if (player.t1 == "empty") {
    ctx.drawImage(images.icons.empty, 17.5 + 175 * 6, 510, 140, 140); //draw A1
  } else {
    ctx.drawImage(images.icons[player.t1.getIcon()], 17.5 + 175 * 6, 510, 140, 140); //draw A1
    hudTooltips.push({
      x: 17.5,
      y: 510,
      height: 140,
      width: 140,
      html: player.t1.getLore()
    })
  }
  if (player.t2 == "empty") {
    ctx.drawImage(images.icons.empty, 17.5 + 175 * 7, 510, 140, 140); //draw A1
  } else {
    ctx.drawImage(images.icons[player.t2.getIcon()], 17.5 + 175 * 7, 510, 140, 140); //draw A1
    hudTooltips.push({
      x: 17.5,
      y: 510,
      height: 140,
      width: 140,
      html: player.t2.getLore()
    })
  }
}
