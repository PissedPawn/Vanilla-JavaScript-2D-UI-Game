import Enemy from "./enemy.js";
import Game from "./game.js";
import Vector2 from "./vector2.js";

let playButton = document.getElementById("play");
let quitButton = document.getElementById("quit");
let optionsButton = document.getElementById("options");
let game = new Game("canvas", 500, 500, "/black.png");
let enemy = new Enemy(1, new Vector2(100, 100), 32, 45, "/police/", 100);
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
      
      return;
    }
    game.drawStartScene();
    enemy.animateMove(400, 30);
    enemy.draw(ctx);
    enemy.handleCharacterFrame();
  }
}

startAnimating(24);
