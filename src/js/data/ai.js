var PI2 = 2 * Math.PI;
export default function (sid, objectManager, players, items, UTILS, config, scoreCallback, server) {
  this.sid = sid, this.isAI = !0, this.nameIndex = UTILS.randInt(0, config.cowNames.length - 1), this.init = function (x, y, dir, index, data) {
    if (!data?.fixedSpawn) return;
    this.x = x, this.y = y, this.startX = null, this.startY = null, this.xVel = 0, this.yVel = 0, this.zIndex = 0, this.dir = dir, this.dirPlus = 0, this.index = index, this.src = (data.src || "sheep_1"), data.name && (this.name = data.name), this.weightM = data.weightM, this.speed = data.speed, this.killScore = data.killScore, this.turnSpeed = data.turnSpeed, this.scale = data.scale, this.maxHealth = data.health, this.leapForce = data.leapForce, this.health = this.maxHealth, this.chargePlayer = data.chargePlayer, this.viewRange = data.viewRange, this.drop = data.drop, this.dmg = data.dmg, this.hostile = data.hostile, this.dontRun = data.dontRun, this.hitRange = data.hitRange, this.hitDelay = data.hitDelay, this.hitScare = data.hitScare, this.spriteMlt = data.spriteMlt, this.nameScale = data.nameScale, this.colDmg = data.colDmg, this.noTrap = data.noTrap, this.spawnDelay = data.spawnDelay, this.hitWait = 0, this.waitCount = 1000, this.moveCount = 0, this.targetDir = 0, this.active = !0, this.alive = !0, this.runFrom = null, this.chargeTarget = null, this.dmgOverTime = {};
  };
  var timerCount = 0;
  this.update = function (delta) {
    if (this.active) {
      if (this.spawnCounter)
        return this.spawnCounter -= delta, void(this.spawnCounter <= 0 && (this.spawnCounter = 0, this.x = this.startX || UTILS.randInt(0, config.mapScale), this.y = this.startY || UTILS.randInt(0, config.mapScale)));
      (timerCount -= delta) <= 0 && (this.dmgOverTime.dmg && (this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer), this.dmgOverTime.time -= 1, this.dmgOverTime.time <= 0 && (this.dmgOverTime.dmg = 0)), timerCount = 1000);
      var charging = !1,
        slowMlt = 1;
      if (!this.zIndex && !this.lockMove && this.y >= config.mapScale / 2 - config.riverWidth / 2 && this.y <= config.mapScale / 2 + config.riverWidth / 2 && (slowMlt = 0.33, this.xVel += config.waterCurrent * delta), this.lockMove)
        this.xVel = 0, this.yVel = 0;
      else if (this.waitCount > 0) {
        if (this.waitCount -= delta, this.waitCount <= 0)
          if (this.chargePlayer) {
            for (var tmpPlayer, bestDst, tmpDist, i = 0; i < players.length; ++i)
              !players[i].alive || players[i].skin && players[i].skin.bullRepel || (tmpDist = UTILS.getDistance(this.x, this.y, players[i].x, players[i].y)) <= this.viewRange && (!tmpPlayer || tmpDist < bestDst) && (bestDst = tmpDist, tmpPlayer = players[i]);
            tmpPlayer ? (this.chargeTarget = tmpPlayer, this.moveCount = UTILS.randInt(8000, 12000)) : (this.moveCount = UTILS.randInt(1000, 2000), this.targetDir = UTILS.randFloat(-Math.PI, Math.PI));
          } else
            this.moveCount = UTILS.randInt(4000, 10000), this.targetDir = UTILS.randFloat(-Math.PI, Math.PI);
      } else if (this.moveCount > 0) {
        var tmpSpd = this.speed * slowMlt;
        if (this.runFrom && this.runFrom.active && (!this.runFrom.isPlayer || this.runFrom.alive) ? (this.targetDir = UTILS.getDirection(this.x, this.y, this.runFrom.x, this.runFrom.y), tmpSpd *= 1.42) : this.chargeTarget && this.chargeTarget.alive && (this.targetDir = UTILS.getDirection(this.chargeTarget.x, this.chargeTarget.y, this.x, this.y), tmpSpd *= 1.75, charging = !0), this.hitWait && (tmpSpd *= 0.3), this.dir != this.targetDir) {
          this.dir %= PI2;
          var netAngle = (this.dir - this.targetDir + PI2) % PI2,
            amnt = Math.min(Math.abs(netAngle - PI2), netAngle, this.turnSpeed * delta),
            sign = netAngle - Math.PI >= 0 ? 1 : -1;
          this.dir += sign * amnt + PI2;
        }
        this.dir %= PI2, this.xVel += tmpSpd * delta * Math.cos(this.dir), this.yVel += tmpSpd * delta * Math.sin(this.dir), this.moveCount -= delta, this.moveCount <= 0 && (this.runFrom = null, this.chargeTarget = null, this.waitCount = this.hostile ? 1500 : UTILS.randInt(1500, 6000));
      }
      this.zIndex = 0, this.lockMove = !1;
      var tmpSpeed = UTILS.getDistance(0, 0, this.xVel * delta, this.yVel * delta),
        depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40))),
        tMlt = 1 / depth;
      for (i = 0; i < depth; ++i) {
        this.xVel && (this.x += this.xVel * delta * tMlt), this.yVel && (this.y += this.yVel * delta * tMlt), tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
        for (var x = 0; x < tmpList.length; ++x)
          for (var y = 0; y < tmpList[x].length; ++y)
            tmpList[x][y].active && objectManager.checkCollision(this, tmpList[x][y], tMlt);
      }
      var tmpObj, tmpDst, tmpDir, hitting = !1;
      if (this.hitWait > 0 && (this.hitWait -= delta, this.hitWait <= 0)) {
        hitting = !0, this.hitWait = 0, this.leapForce && !UTILS.randInt(0, 2) && (this.xVel += this.leapForce * Math.cos(this.dir), this.yVel += this.leapForce * Math.sin(this.dir));
        for (var tmpList = objectManager.getGridArrays(this.x, this.y, this.hitRange), t = 0; t < tmpList.length; ++t)
          for (x = 0; x < tmpList[t].length; ++x)
            (tmpObj = tmpList[t][x])
            .health && (tmpDst = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y)) < tmpObj.scale + this.hitRange && (tmpObj.changeHealth(5 * -this.dmg) && objectManager.disableObj(tmpObj), objectManager.hitObj(tmpObj, UTILS.getDirection(this.x, this.y, tmpObj.x, tmpObj.y)));
        for (x = 0; x < players.length; ++x)
          players[x].canSee(this) && server.send(players[x].id, 'aa', this.sid);
      }
      if (charging || hitting)
        for (i = 0; i < players.length; ++i)
          (tmpObj = players[i]) && tmpObj.alive && (tmpDst = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y), this.hitRange ? !this.hitWait && tmpDst <= this.hitRange + tmpObj.scale && (hitting ? (tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y), tmpObj.changeHealth(-this.dmg), tmpObj.xVel += 0.6 * Math.cos(tmpDir), tmpObj.yVel += 0.6 * Math.sin(tmpDir), this.runFrom = null, this.chargeTarget = null, this.waitCount = 3000, this.hitWait = UTILS.randInt(0, 2) ? 0 : 600) : this.hitWait = this.hitDelay) : tmpDst <= this.scale + tmpObj.scale && (tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y), tmpObj.changeHealth(-this.dmg), tmpObj.xVel += 0.55 * Math.cos(tmpDir), tmpObj.yVel += 0.55 * Math.sin(tmpDir)));
      this.xVel && (this.xVel *= Math.pow(config.playerDecel, delta)), this.yVel && (this.yVel *= Math.pow(config.playerDecel, delta));
      var tmpScale = this.scale;
      this.x - tmpScale < 0 ? (this.x = tmpScale, this.xVel = 0) : this.x + tmpScale > config.mapScale && (this.x = config.mapScale - tmpScale, this.xVel = 0), this.y - tmpScale < 0 ? (this.y = tmpScale, this.yVel = 0) : this.y + tmpScale > config.mapScale && (this.y = config.mapScale - tmpScale, this.yVel = 0);
    }
  }, this.canSee = function (other) {
    if (!other)
      return !1;
    if (other.skin && other.skin.invisTimer && other.noMovTimer >= other.skin.invisTimer)
      return !1;
    var dx = Math.abs(other.x - this.x) - other.scale,
      dy = Math.abs(other.y - this.y) - other.scale;
    return dx <= config.maxScreenWidth / 2 * 1.3 && dy <= config.maxScreenHeight / 2 * 1.3;
  };
  var tmpRatio = 0,
    animIndex = 0;
  this.animate = function (delta) {
    this.animTime > 0 && (this.animTime -= delta, this.animTime <= 0 ? (this.animTime = 0, this.dirPlus = 0, tmpRatio = 0, animIndex = 0) : 0 == animIndex ? (tmpRatio += delta / (this.animSpeed * config.hitReturnRatio), this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.min(1, tmpRatio)), tmpRatio >= 1 && (tmpRatio = 1, animIndex = 1)) : (tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio)), this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.max(0, tmpRatio))));
  }, this.startAnim = function () {
    this.animTime = this.animSpeed = 600, this.targetAngle = 0.8 * Math.PI, tmpRatio = 0, animIndex = 0;
  }, this.changeHealth = function (val, doer, runFrom) {
    if (this.active && (this.health += val, runFrom && (this.hitScare && !UTILS.randInt(0, this.hitScare) ? (this.runFrom = runFrom, this.waitCount = 0, this.moveCount = 2000) : this.hostile && this.chargePlayer && runFrom.isPlayer ? (this.chargeTarget = runFrom, this.waitCount = 0, this.moveCount = 8000) : this.dontRun || (this.runFrom = runFrom, this.waitCount = 0, this.moveCount = 2000)), val < 0 && this.hitRange && UTILS.randInt(0, 1) && (this.hitWait = 500), doer && doer.canSee(this) && val < 0 && server.send(doer.id, 't', Math.round(this.x), Math.round(this.y), Math.round(-val), 1), this.health <= 0 && (this.spawnDelay ? (this.spawnCounter = this.spawnDelay, this.x = -1000000, this.y = -1000000) : (this.x = this.startX || UTILS.randInt(0, config.mapScale), this.y = this.startY || UTILS.randInt(0, config.mapScale)), this.health = this.maxHealth, this.runFrom = null, doer && (scoreCallback(doer, this.killScore), this.drop))))
      for (var i = 0; i < this.drop.length;)
        doer.addResource(config.resourceTypes.indexOf(this.drop[i]), this.drop[i + 1]), i += 2;
  };
};
