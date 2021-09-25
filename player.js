import Character from "./character.js";

export default class Player extends Character {
  constructor(pos, width, height, spriteFolder) {
    super(pos, width, height, spriteFolder);
    this.event = new CustomEvent("onMeleeAttackRange");
  }
  movePlayer(keys) {
    if ((keys["ArrowUp"] || keys["w"]) && this.pos.y > 150) {
      this.pos.y -= this.speed;
      this.frameY = 3;
      this.moving = true;
    }
    if ((keys["ArrowDown"] || keys["s"]) && this.pos.y < 448) {
      this.pos.y += this.speed;
      this.frameY = 0;
      this.moving = true;
    }

    if ((keys["ArrowLeft"] || keys["a"]) && this.pos.x > 12) {
      this.pos.x -= this.speed;
      this.frameY = 1;
      this.moving = true;
    }

    if ((keys["ArrowRight"] || keys["d"]) && this.pos.x < 448) {
      this.pos.x += this.speed;
      this.frameY = 2;
      this.moving = true;
      console.log(this.pos.x);
    }

    this.handleCharacterFrame();
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
}
