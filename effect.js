import Vector2 from "./vector2.js";

export default class Effect {
  constructor(holder, width, height, spriteFolder, effect) {
    this.pos = new Vector2();
    this.pos.x = holder.pos.x;
    this.pos.y = holder.pos.y + holder.height / 3;
    this.width = width;
    this.height = height;
    this.sprite = new Image();
    this.sprite.src = spriteFolder + effect;
    this.faceDirection = holder.faceDirection;
    this.frameX = 0;
    this.frameY = 0;
  }

  handleCharacterFrame() {
    if (this.frameX < this.sprite.width / this.width - 1) this.frameX++;
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
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
}
