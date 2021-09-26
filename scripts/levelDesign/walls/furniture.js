import Object from "../../object.js";

export default class Furniture extends Object {
  constructor(pos, spriteFolder = "/assets/furnitures/", sprite = "couch.png") {
    super(pos, spriteFolder, sprite);
    this.characterSprite.src = spriteFolder + sprite;
  }

  draw(ctx) {
    ctx.drawImage(
      this.characterSprite,
      0,
      0,
      this.width,
      this.height,
      this.pos.x,
      this.pos.y,
      this.width / 8,
      this.height / 8
    );
  }
}
