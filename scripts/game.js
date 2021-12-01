export default class Game {
  constructor(canvasId, width, height, image) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.width = this.canvas.width;
    this.canvas.height = height;
    this.height = this.canvas.height;
    this.screenW = window.innerWidth;
    this.screenH = window.innerHeight;
    (this.mouseX = 0), (this.mouseY = 0);
    this.background = new Image();
    this.background.src = image;
  }

  getMousePos(event) {
    this.mouseX = event.clientX - (this.screenW - this.width) / 2;
    this.mouseY = -(event.clientY - (this.screenH - this.height) / 2);

    //console.log(this.mouseX+ " ; " + this.mouseY)
  }
  drawGameScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  drawStartScene() {
    var grd = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    grd.addColorStop(0, "blue");
    grd.addColorStop(1, "red");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, 500, 500);
  }

  getKeyDown(keys) {
    window.addEventListener("keydown", function (e) {
      keys[e.key] = true;
    });
  }

  getKeyUp(keys) {
    window.addEventListener("keyup", function (e) {
      delete keys[e.key];
    });
  }

  getAllInputs(keys) {
    this.getKeyDown(keys);
    this.getKeyUp(keys);
  }
}
