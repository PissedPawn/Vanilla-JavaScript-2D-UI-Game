import Vector2 from "../../vector2.js";
import Wall from "../walls/wall.js";

export default class TopWall extends Wall {
  constructor(pos, spriteFolder = "/assets/walls", sprite = "/Wooden/top.png") {
    super(pos, spriteFolder, sprite);
    this.characterSprite.src = spriteFolder + sprite;
  }
}
