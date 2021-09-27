import Collider from "./collider.js";
import Vector2 from "./vector2.js";

export default class Character {
  constructor(pos, width, height, spriteFolder, health) {
    (this.pos = pos),
      (this.width = width),
      (this.height = height),
      (this.frameX = 0),
      (this.frameY = 0),
      (this.speed = 10),
      (this.moving = false),
      (this.spriteFolder = spriteFolder);
    (this.characterSprite = new Image()),
      (this.characterSprite.src = spriteFolder + "idleUp.png");

    this.faceDirection = "up";
    this.health = health;
    this.collider = new Collider(this);
  }

  handleCharacterFrame() {
    switch (this.faceDirection) {
      //a bit buggy but works fine
      case "right":

      case "down":
        if (
          this.frameX < this.characterSprite.width / this.width - 1 &&
          this.moving
        ) {
          this.frameX++;
        } else this.frameX = 0;
        break;

      case "left":
      case "up":
        if (this.frameX > 0 && this.moving) this.frameX--;
        else this.frameX = this.characterSprite.width / this.width - 1;
        break;

      default:
        break;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.characterSprite,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }

  jump() {
    //to be made
  }
}
