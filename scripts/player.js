import Character from "./character.js";
import Vector2 from "./vector2.js";

export default class Player extends Character {
  constructor(pos, width, height, spriteFolder) {
    super(pos, width, height, spriteFolder);
    this.event = new CustomEvent("onMeleeAttackRange");
  }
  movePlayer(keys) {
    if (keys["ArrowUp"] || keys["w"]) {
      this.pos.y -= this.speed;
      this.characterSprite.src = this.spriteFolder + "walkUp.png";
      this.faceDirection = "up";
      this.moving = true;
    }
    if (keys["ArrowDown"] || keys["s"]) {
      this.pos.y += this.speed;
      this.characterSprite.src = this.spriteFolder + "walkDown.png";
      this.faceDirection = "down";
      this.moving = true;
    }

    if (keys["ArrowLeft"] || keys["a"]) {
      this.pos.x -= this.speed;
      this.characterSprite.src = this.spriteFolder + "walkLeft.png";
      this.faceDirection = "left";
      this.moving = true;
    }

    if (keys["ArrowRight"] || keys["d"]) {
      this.pos.x += this.speed;
      this.characterSprite.src = this.spriteFolder + "walk.png";
      this.faceDirection = "right";
      this.moving = true;
    }





    // this.invokeEvent(target);
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

  moveTopDownWithMouse(keys, mousePos) {
    if (keys["ArrowUp"] || keys["w"]) {
      let threshold = 2;
      let velocityX = mousePos.x - this.pos.x;
      let velocityY = (-mousePos.y) - this.pos.y;
      if ((velocityX < threshold && velocityX > -threshold) || velocityX == 0) {

      }
      else {

        this.pos.x += velocityX / Math.abs(velocityX) * threshold;
      }
      if ((velocityY < threshold && velocityY > -threshold) || velocityY == 0) {

      }

      else {
        this.pos.y += velocityY / Math.abs(velocityY) * threshold;
      }

      console.log(this.pos.x)
      console.log(this.pos.y)


    }
  }

  stopMove() {
    let that = this;
    document.addEventListener("keyup", function (e) {
      that.moving = false;
    });
  }

  getRotation(mousePos) {

    let playerCenterX = (this.pos.x - this.width / 2)
    let playerCenterY = (this.pos.y - this.height / 2)
    let directionX = mousePos.x - playerCenterX;
    let directionY = mousePos.y + playerCenterY;

    let right = this.#normalize(0, (playerCenterX + this.width / 2) / playerCenterX);
    let direction = this.#normalize(directionX, directionY);

    let dot = right[0] * direction[0] + right[1] * direction[1];
    let det = right[0] * direction[1] - right[1] * direction[0];

    // console.log("CenterX "+ playerCenterX)
    // console.log("CenterY "+ playerCenterY)
    // console.log("                             ")
    // console.log("directionX "+ directionX)
    // console.log("directionY "+ directionY)

    // console.log("                             ")
    // console.log("direction "+ direction)
    // console.log("right "+ right)


    // let degree = Math.acos(right[0] * direction[0] + right[1] * direction[1]) * 180 / Math.PI;
    let degree = -Math.atan2(det, dot)
    // console.log(degree* 180 / Math.PI);
    return degree; // in radians


  }

  #normalize(x, y) {

    let n = Math.sqrt(x * x + y * y);
    return [x / n, y / n];
  }

  drawRotated(canvas, ctx, degrees) {

    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    // console.log(this.pos)

    ctx.rotate(degrees);

    ctx.drawImage(this.characterSprite, -this.width / 2, -this.height / 2);
    ctx.restore();
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
