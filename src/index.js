import "./styles.css";
import Game from "/src/game";

var canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 640;
const GAME_HEIGHT = 640;
const RATIO = 1;
resize();
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
gameLoop();

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = 0;
  deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  game.update(deltaTime);
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

function resize() {
  let ua = navigator.userAgent.toLowerCase();
  let android = ua.indexOf("android") > -1 ? true : false;
  let ios = ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 ? true : false;
  let currentWidth = window.innerWidth;
  let currentHeight = window.innerHeight;
  if (currentWidth <= currentHeight) {
    currentHeight = currentWidth * RATIO;
  } else {
    currentWidth = currentHeight * RATIO;
  }
  if (android || ios) {
    document.body.style.height = window.innerHeight + 50 + "px";
  }
  canvas.style.width = currentWidth + "px";
  canvas.style.height = currentHeight + "px";
  window.setTimeout(function () {
    window.scrollTo(0, 1);
  }, 1);
}

window.addEventListener("resize", resize, false);
