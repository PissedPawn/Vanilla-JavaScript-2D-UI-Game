import BottomLeftWall from "../scripts/levelDesign/walls/bottomLeftWall.js";
import BottomRightWall from "../scripts/levelDesign/walls/bottomRightWall.js";
import Enemy from "./enemy.js";
import Game from "./game.js";
import TopLeftWall from "../scripts/levelDesign/walls/topLeftWall.js";
import TopRightWall from "../scripts/levelDesign/walls/topRightWall.js";
import Vector2 from "./vector2.js";
import TopWall from "../scripts/levelDesign/walls/topWall.js";
import LeftWall from "../scripts/levelDesign/walls/leftWall.js";
import RightWall from "../scripts/levelDesign/walls/rightWall.js";
import BottomWall from "../scripts/levelDesign/walls/bottomWall.js";
import Wall from "./levelDesign/walls/wall.js";
import Floor from "./levelDesign/walls/floor.js";
import Furniture from "./levelDesign/walls/furniture.js";
import Player from "./player.js";

let playButton = document.getElementById("play");

let gunButton = document.getElementById("gun");
let smokeButton = document.getElementById("smoke");
let nadeButton = document.getElementById("nade");
let toolButton = document.getElementById("tool");


let beltButton = document.getElementById("beltButton");
let belt = document.getElementsByClassName("belt");
let quitButton = document.getElementById("quit");
let optionsButton = document.getElementById("options");
let game = new Game("canvas", 500, 500, "/Level_1.png");
let enemy = new Enemy(1, new Vector2(100, 100), 32, 45, "/assets/police/", 100);
let player = new Player(new Vector2(200, 250), 32, 45, "/assets/police/");

let canvas = document.getElementById("canvas")

const WIDTH = game.width;
const HEIGHT = game.height;

const plane = game.background;


// var currentPos = [];
// canvas.onmousemove = function (e) {
//   if (e.pageX !== currentPos[0] && e.pageY !== currentPos[1]) {
//     currentPos = [e.pageX, e.pageY];

//     game.getMousePos(e)
//   }
// }

var currentPos = [];
$("canvas").on({
  mousemove: function (e) {
    if (e.pageX !== currentPos[0] && e.pageY !== currentPos[1]) {
      currentPos = [e.pageX, e.pageY];
      game.getMousePos(e)

    }
  },
  click: function (e) {

    console.log("shoot")

  }
});


//document.addEventListener(onmousemove, game.getMousePos)
// let floors = [];
// let furniture = new Furniture(new Vector2(16, 16));

// let walls = [
//   new TopLeftWall(),
//   new TopRightWall(),
//   new BottomLeftWall(),
//   new BottomRightWall(),
//   new TopWall(new Vector2(64, 0)),
//   new TopWall(new Vector2(128, 0)),
//   new TopWall(new Vector2(192, 0)),
//   new TopWall(new Vector2(256, 0)),
//   new TopWall(new Vector2(320, 0)),
//   new TopWall(new Vector2(384, 0)),
//   new BottomWall(new Vector2(64, 436)),
//   new BottomWall(new Vector2(128, 436)),
//   new BottomWall(new Vector2(192, 436)),
//   new BottomWall(new Vector2(256, 436)),
//   new BottomWall(new Vector2(320, 436)),
//   new BottomWall(new Vector2(384, 436)),
//   new LeftWall(new Vector2(0, 64)),
//   new LeftWall(new Vector2(0, 128)),
//   new LeftWall(new Vector2(0, 192)),
//   new LeftWall(new Vector2(0, 256)),
//   new LeftWall(new Vector2(0, 320)),
//   new LeftWall(new Vector2(0, 384)),
//   new RightWall(new Vector2(436, 64)),
//   new RightWall(new Vector2(436, 128)),
//   new RightWall(new Vector2(436, 192)),
//   new RightWall(new Vector2(436, 256)),
//   new RightWall(new Vector2(436, 320)),
//   new RightWall(new Vector2(436, 384)),
//   // inside Walls
//   new LeftWall(new Vector2(128, 16)),
//   new LeftWall(new Vector2(128, 64)),
//   new LeftWall(new Vector2(128, 128)),

//   new LeftWall(new Vector2(256, 16)),
//   new LeftWall(new Vector2(256, 64)),
//   new LeftWall(new Vector2(256, 128)),
//   new BottomWall(new Vector2(16, 128)),
//   new BottomWall(new Vector2(192, 128)),
//   new BottomWall(new Vector2(256, 128)),
//   new BottomWall(new Vector2(320, 128)),
//   new BottomWall(new Vector2(370, 128)),
//   new RightWall(new Vector2(256, 232)),
//   new RightWall(new Vector2(256, 256)),
//   new RightWall(new Vector2(256, 320)),
//   new RightWall(new Vector2(256, 370)),
// ];

let ctx = game.ctx;
let clickAudio = new Audio();
clickAudio.src = "/sounds/buttonClick.wav";

const clickedPlay = () => {
  beltButton.style.visibility = "visible";
  playButton.style.visibility = "hidden";
  quitButton.style.bottom = "0px";
  optionsButton.style.bottom = "0px";
  quitButton.style.transform = "translate(0, 150%)";
  optionsButton.style.transform = "translate(0, 250%)";

  optionsButton.style.left = "0px";
  quitButton.style.left = "300px";
  playClicked = true;
  configButtons();
};

const playAudio = () => {
  clickAudio.play();


};


const toggleItemBelt = () => {

  $('.beltItem', belt).toggle();

  //game is paused

}

let buttons = document.getElementsByTagName("button");

const configButtons = () => {
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("mouseenter", playAudio);
  }
};

const equipItemFromBelt = () => {
  console.log("equipped");
}

playButton.addEventListener("click", clickedPlay);

gunButton.addEventListener("click", equipItemFromBelt);
smokeButton.addEventListener("click", equipItemFromBelt);
nadeButton.addEventListener("click", equipItemFromBelt);
toolButton.addEventListener("click", equipItemFromBelt);
$('#beltButton').click(toggleItemBelt);

let fpsInterval, startTime, now, then, elapsed;

let playClicked;

const keys = [];
game.getAllInputs(keys);
player.stopMove();

function getMousePos(event) {
  game.getMousePos(event);
}

let x = game.mouseX;
let y = game.mouseY;

document.addEventListener("click", getMousePos);

//gameLoop.startAnimating(game.drawGameScreen());

//FPS LOOP

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    if (playClicked) {
      game.drawGameScreen();

      ///player.movePlayer(keys);
      // player.moveToMousePos(game.mouseX, game.mouseY);
      player.moveTopDownWithMouse(keys, new Vector2(game.mouseX, game.mouseY));
     // player.draw(ctx);
      //player.handleCharacterFrame();
      player.drawRotated(game.canvas, game.ctx, player.getRotation(new Vector2(game.mouseX, game.mouseY)))



      return;
    }


    game.drawStartScene();
    enemy.animateMove(400, 30);
    enemy.draw(ctx);
    enemy.handleCharacterFrame();
  }
}

startAnimating(24);
