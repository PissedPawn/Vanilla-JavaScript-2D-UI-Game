import Vector2 from "../../vector2.js";
import Wall from "../walls/wall.js";

export default class LeftWall extends Wall {
  constructor(
    pos,
    spriteFolder = "/assets/walls",
    sprite = "/Wooden/left.png"
  ) {
    super(pos, spriteFolder, sprite);
    this.characterSprite.src = spriteFolder + sprite;
    
  }
}
