import Character from "./character.js";
import Effect from "./effect.js";

export default class Enemy extends Character {
  constructor(speed, pos, width, height, spriteFolder, health) {
    super(pos, width, height, spriteFolder, health);
    this.characterSprite.src = spriteFolder + "shoot.png";
    this.faceDirection = "right";
    this.damaged = false;
  }
  clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  moveEnemy(targetX, targetY) {
    this.moveDestX = targetX;
    this.moveDestY = targetY;
    this.distX = Math.abs(this.moveDestX - this.startingX);
    this.distY = Math.abs(this.moveDestY - this.startingY);

    // console.log("X : " + this.distX);
    // console.log("Y : " + this.distY);

    if (this.distY !== 0 && this.distX !== 0) {
      this.enemyMoveRatioX = this.distX / this.distY;
      if (this.enemyMoveRatioX > 1) {
        this.enemyMoveRatioY = 1;
        this.enemyMoveRatioX = this.clamp(this.enemyMoveRatioX, 1, 4); // if it will travel more on one coordinate rather than the other
      } else if (this.enemyMoveRatioX < 1) {
        // then we clamp its value between 1 and 4 so that difference is not too big
        this.enemyMoveRatioY = this.clamp(1 / this.enemyMoveRatioX, 1, 4); // or we will not see enemy move
        this.enemyMoveRatioX = 1;
      } else {
        this.enemyMoveRatioY = 1;
      }
    } else if (this.distX === 0 && this.distY !== 0) {
      // an if any of them is 0 we just wanna move than along other coordinate with fixed value of 1
      this.enemyMoveRatioY = 1;
    } else if (this.distY === 0 && this.distX !== 0) {
      this.enemyMoveRatioX = 1;
    }

    // actual movement code
    this.prevX = this.pos.x;
    this.prevY = this.pos.y;
    if (this.pos.x > this.moveDestX) {
      this.pos.x -= this.speed * this.enemyMoveRatioX;
      console.log("left");
      this.frameY = 1;
      this.moving = true;
      this.handleCharacterFrame();
      return;
    }

    if (this.pos.x < this.moveDestX) {
      this.pos.x += this.speed * this.enemyMoveRatioX;
      console.log("right");
      this.frameY = 2;
      this.moving = true;
      this.handleCharacterFrame();
      return;
    }

    if (this.pos.y > this.moveDestY - 20) {
      this.pos.y -= this.speed * this.enemyMoveRatioY;
      console.log("up");
      this.frameY = 3;
      this.moving = true;
      this.handleCharacterFrame();
      return;
    }

    if (this.pos.y < this.moveDestY) {
      this.pos.y += this.speed * this.enemyMoveRatioY;
      console.log("down");
      this.frameY = 0;
      this.moving = true;
      this.handleCharacterFrame();
      return;
    }

    this.handleCharacterFrame();
  }
  animateMove(max, min) {
    if ((this.pos.x > min) & (this.faceDirection == "left")) {
      this.pos.x -= this.speed;
      this.characterSprite.src = this.spriteFolder + "walkLeft.png";

      if (this.pos.x <= min + 10) this.faceDirection = "right";

      return;
    }

    if (this.pos.x <= max && this.faceDirection == "right") {
      this.pos.x += this.speed;
      this.characterSprite.src = this.spriteFolder + "walk.png";
      if (this.pos.x >= max + 10) this.faceDirection = "left";

      return;
    }
  }

  animateShoot()
  {
    this.characterSprite.src = this.spriteFolder + "shoot.png";
  }

  shootAtTarget(target) {}

  takeDamage(amount) {
    this.health -= amount;
    this.damaged = true;
    console.log("damaged");
  }

  // take hit animation

  getEvent(ctx) {
    let that = this;
    document.addEventListener("onBulletHit", function (e) {
      that.takeDamage(20);
      let effect = new Effect(that, 64, 24, "../sprites/", "blood.png");
      effect.draw(ctx);
      effect.handleCharacterFrame();
    });

    document.addEventListener("onMeleeAttackRange", function (e) {
      that.takeDamage(30);
    });
  }

  die() {
    if (this.health <= 0) {
      this.characterSprite.src = this.spriteFolder + "Death.png";

      if (this.frameX < this.characterSprite.width / this.width - 1)
        this.frameX++;

      return true;
    }
    return false;
  }
}
