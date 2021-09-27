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
let quitButton = document.getElementById("quit");
let optionsButton = document.getElementById("options");
let game = new Game("canvas", 500, 500, "/black.png");
let enemy = new Enemy(1, new Vector2(100, 100), 32, 45, "/assets/police/", 100);
let player = new Player(new Vector2(128, 400), 32, 45, "/assets/police/");

const WIDTH = game.width;
const HEIGHT = game.height;
let floors = [];
let furniture = new Furniture(new Vector2(16, 16));

let walls = [
  new TopLeftWall(),
  new TopRightWall(),
  new BottomLeftWall(),
  new BottomRightWall(),
  new TopWall(new Vector2(64, 0)),
  new TopWall(new Vector2(128, 0)),
  new TopWall(new Vector2(192, 0)),
  new TopWall(new Vector2(256, 0)),
  new TopWall(new Vector2(320, 0)),
  new TopWall(new Vector2(384, 0)),
  new BottomWall(new Vector2(64, 436)),
  new BottomWall(new Vector2(128, 436)),
  new BottomWall(new Vector2(192, 436)),
  new BottomWall(new Vector2(256, 436)),
  new BottomWall(new Vector2(320, 436)),
  new BottomWall(new Vector2(384, 436)),
  new LeftWall(new Vector2(0, 64)),
  new LeftWall(new Vector2(0, 128)),
  new LeftWall(new Vector2(0, 192)),
  new LeftWall(new Vector2(0, 256)),
  new LeftWall(new Vector2(0, 320)),
  new LeftWall(new Vector2(0, 384)),
  new RightWall(new Vector2(436, 64)),
  new RightWall(new Vector2(436, 128)),
  new RightWall(new Vector2(436, 192)),
  new RightWall(new Vector2(436, 256)),
  new RightWall(new Vector2(436, 320)),
  new RightWall(new Vector2(436, 384)),
  // inside Walls
  new LeftWall(new Vector2(128, 16)),
  new LeftWall(new Vector2(128, 64)),
  new LeftWall(new Vector2(128, 128)),

  new LeftWall(new Vector2(256, 16)),
  new LeftWall(new Vector2(256, 64)),
  new LeftWall(new Vector2(256, 128)),
  new BottomWall(new Vector2(16, 128)),
  new BottomWall(new Vector2(192, 128)),
  new BottomWall(new Vector2(256, 128)),
  new BottomWall(new Vector2(320, 128)),
  new BottomWall(new Vector2(370, 128)),
  new RightWall(new Vector2(256, 232)),
  new RightWall(new Vector2(256, 256)),
  new RightWall(new Vector2(256, 320)),
  new RightWall(new Vector2(256, 370)),
];

let ctx = game.ctx;
let clickAudio = new Audio();
clickAudio.src = "/sounds/buttonClick.wav";

const clickedPlay = () => {
  playButton.style.visibility = "hidden";
  quitButton.style.top = "392px";
  optionsButton.style.top = "442px";
  optionsButton.style.left = "0px";
  quitButton.style.left = "300px";
  playClicked = true;
  configButtons();
};
const playAudio = () => {
  clickAudio.play();
};

let buttons = document.getElementsByTagName("button");

const configButtons = () => {
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("mouseenter", playAudio);
  }
};

playButton.addEventListener("click", clickedPlay);

let fpsInterval, startTime, now, then, elapsed;

let playClicked;

const keys = [];
game.getAllInputs(keys);
player.stopMove();

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
      floors.map((e) => {
        //if (e.drew) return;
        e.draw(ctx);
        e.drew = true;
      });

      furniture.draw(ctx);

      walls.map((e) => {
        // if (e.drew) return;

        e.draw(ctx);
        e.drew = true;
      });
      player.movePlayer(keys, furniture);
      player.draw(ctx);
      player.handleCharacterFrame();

      return;
    }

    for (let w = 0; w < WIDTH; w += 32) {
      for (let h = 0; h < HEIGHT; h += 32) {
        if (h > HEIGHT / 2 && w > WIDTH / 2 + 50) {
          floors.push(
            new Floor(new Vector2(w, h), "/assets/floors", "/Floor3.png")
          );
        } else
          floors.push(
            new Floor(new Vector2(w, h), "/assets/floors", "/Floor5.png")
          );
      }
    }
    game.drawStartScene();
    enemy.animateMove(400, 30);
    enemy.draw(ctx);
    enemy.handleCharacterFrame();
  }
}

startAnimating(24);
