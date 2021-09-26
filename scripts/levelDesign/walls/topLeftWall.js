import Vector2 from "../../vector2.js";
import Wall from "../walls/wall.js";

export default class TopLeftWall extends Wall {
  constructor(
    pos,
    spriteFolder = "/assets/walls",
    sprite = "/Wooden/topleft.png"
  ) {
    super(pos, spriteFolder, sprite);
    this.characterSprite.src = spriteFolder + sprite;
    this.pos = new Vector2(0, 0);
  }
}
