import Collider from "./collider.js";
import Vector2 from "./vector2.js";

export default class Object {
  constructor(pos, spriteFolder, sprite) {
    (this.pos = pos),
      (this.characterSprite = new Image()),
      (this.characterSprite.src = spriteFolder + sprite);
    this.collider = new Collider(this);
    (this.width = this.characterSprite.width),
      (this.height = this.characterSprite.height);
    this.drew = false;
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
      this.width / 2,
      this.height / 2
    );
  }
}
