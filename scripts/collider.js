export default class Collider {
  constructor(shape) {
    this.shape = shape;
    this.pos = this.shape.pos;
    this.width = this.shape.width + 1;
    this.height = this.shape.height + 1;
    this.collided = false;
  }

  checkHitCollision(x, y, target, func) {
    // if (
    //   target.pos.x + target.width < this.pos.x ||
    //   target.pos.x > this.pos.x + this.width ||
    //   target.pos.y + target.height < this.pos.y ||
    //   target.pos.y > this.pos.y + this.height
    // ) {
    //   this.collided = false;
    //   console.log("not Colliding");
    // } else {
    //   if (this.collided == false) {
    //     this.collided = true;
    //     func();

    //     target.pos.y = this.pos.y - target.height;
    //   }
    // }

    if (target.pos.y > this.pos.y + 16) {
      this.collided = true;
      console.log("colliding");
      target.pos.y = this.pos.y + target.height;
    } else {
    }
  }
}
