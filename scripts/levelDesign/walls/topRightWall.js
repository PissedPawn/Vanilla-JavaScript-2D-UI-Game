import Vector2 from "../../vector2.js";
import Wall from "../walls/wall.js";

export default class TopRightWall extends Wall {
  constructor(
    pos,
    spriteFolder = "/assets/walls",
    sprite = "/Wooden/topright.png"
  ) {
    super(pos, spriteFolder, sprite);
    this.characterSprite.src = spriteFolder + sprite;
    this.pos = new Vector2(500 - this.width/2, 0);
  }
}
