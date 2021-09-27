import Character from "./character.js";

export default class Player extends Character {
  constructor(pos, width, height, spriteFolder) {
    super(pos, width, height, spriteFolder);
    this.event = new CustomEvent("onMeleeAttackRange");
  }
  movePlayer(keys, target) {
    if (keys["ArrowUp"] || keys["w"]) {
      this.pos.y -= this.speed;
      this.characterSprite.src = this.spriteFolder + "walkUp.png";
      this.faceDirection = "up";
      this.moving = true;
    }
    if ((keys["ArrowDown"] || keys["s"])) {
      this.pos.y += this.speed;
      this.characterSprite.src = this.spriteFolder + "walkDown.png";
      this.faceDirection = "down";
      this.moving = true;
    }

    if ((keys["ArrowLeft"] || keys["a"])) {
      this.pos.x -= this.speed;
      this.characterSprite.src = this.spriteFolder + "walkLeft.png";
      this.faceDirection = "left";
      this.moving = true;
    }

    if ((keys["ArrowRight"] || keys["d"])) {
      this.pos.x += this.speed;
      this.characterSprite.src = this.spriteFolder + "walk.png";
      this.faceDirection = "right";
      this.moving = true;
      console.log(this.pos.x);
    }

    this.invokeEvent(target);
    if (this.moving == false) {
      switch (this.faceDirection) {
        case "up":
          this.characterSprite.src = this.spriteFolder + "idleUp.png";

          break;
        case "down":
          this.characterSprite.src = this.spriteFolder + "idleDown.png";

          break;
        case "right":
          this.characterSprite.src = this.spriteFolder + "idleRight.png";

          break;
        case "left":
          this.characterSprite.src = this.spriteFolder + "idleLeft.png";

          break;
      }
    }
  }

  stopMove() {
    let that = this;
    document.addEventListener("keyup", function (e) {
      that.moving = false;
    });
  }

  moveToMousePos(mouseX, mouseY) {
    if (this.moving) {
      if (
        this.pos.x <= mouseX + 10 &&
        this.pos.x > mouseX - 10 &&
        this.pos.y <= mouseY + 10 &&
        this.pos.y > mouseY - 10
      ) {
        this.moving = false;
      }
      if (this.pos.x > mouseX) {
        this.pos.x -= this.speed;
      }

      if (
        Math.abs(this.pos.x - mouseX) > Math.abs(this.pos.y - mouseY) &&
        this.pos.x > mouseX
      ) {
        this.frameY = 1;
      }

      if (
        Math.abs(this.pos.x - mouseX) > Math.abs(this.pos.y - mouseY) &&
        this.pos.x < mouseX
      ) {
        this.frameY = 2;
      }

      if (
        Math.abs(this.pos.x - mouseX) < Math.abs(this.pos.y - mouseY) &&
        this.pos.y < mouseY
      ) {
        this.frameY = 0;
      }

      if (
        Math.abs(this.pos.x - mouseX) < Math.abs(this.pos.y - mouseY) &&
        this.pos.y > mouseY
      ) {
        this.frameY = 3;
      }

      if (this.pos.x < mouseX) {
        this.pos.x += this.speed;
      }

      if (this.pos.y > mouseY) {
        this.pos.y -= this.speed;
      }

      if (this.pos.y < mouseY) {
        this.pos.y += this.speed;
      }
    }
  }
  invokeEvent(target) {
    // console.log(this.collider.collided);
    // console.log(`attacked : ${this.attacked}`);
    let that = this;

    this.collider.checkHitCollision(
      this.pos.x,
      this.pos.y,
      target,
      function () {
        document.dispatchEvent(that.event);
      }
    );
  }
}
