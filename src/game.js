import Item from "/src/item";
import Player from "/src/player";
import InputHandler from "/src/input";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.player = new Player("player", this);
    this.speedup = new Item("speedup", this);
    this.gameObjects = [this.player, this.speedup];
    this.score = 0;
    this.topscore = localStorage.getItem("topscore")
      ? localStorage.getItem("topscore")
      : 0;
    new InputHandler(this);
    this.bkgImage = new Image();
    this.bkgImage.src = "/assets/img/ground.png";
    this.snd = new Audio("assets/snd/advance.wav");
  }

  start() {
    if (this.gamestate === GAMESTATE.MENU) {
      this.snd.play();
      this.gamestate = GAMESTATE.RUNNING;
      this.frameIndex = 0;
    }
  }

  update(deltaTime) {
    if (this.gamestate === GAMESTATE.RUNNING) {
      this.frameIndex += 1;
      if (this.frameIndex / 7 >= 3) {
        this.frameIndex = 0;
      }
      this.gameObjects.forEach((element) => {
        element.update(deltaTime);
      });
      this.topscore = this.score > this.topscore ? this.score : this.topscore;
    }
    return;
  }

  draw(ctx) {
    this.bkgGradient = ctx.createLinearGradient(
      -this.gameWidth / 2,
      1.5 * this.gameHeight,
      1.5 * this.gameWidth,
      -this.gameHeight / 2
    );
    this.bkgGradient.addColorStop(0, "#edfbf8");
    this.bkgGradient.addColorStop(0.5, "white");
    this.bkgGradient.addColorStop(1, "#f8bac7");
    // Set the fill style and draw a rectangle
    ctx.fillStyle = this.bkgGradient;
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    ctx.drawImage(this.bkgImage, 0, this.gameHeight - 70, this.gameWidth, 70);
    this.gameObjects.forEach((element) => {
      element.draw(ctx);
    });
    let ua = navigator.userAgent.toLowerCase();
    let android = ua.indexOf("android") > -1 ? true : false;
    let ios =
      ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 ? true : false;
    if (this.gamestate === GAMESTATE.RUNNING) {
      ctx.font = "lighter 32px Helvetica";
      ctx.fillStyle = "rgb(243,140,161)";
      ctx.textAlign = "center";
      ctx.fillText("SCORE", (this.gameWidth * 5) / 6, this.gameHeight / 12);
      ctx.font = "lighter 64px Helvetica";
      ctx.fillText(
        this.score,
        (this.gameWidth * 5) / 6,
        (2 * this.gameHeight) / 12
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(243,140,161,0.8)";
      ctx.fill();
      ctx.font = "lighter 64px Helvetica";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "lighter 32px Helvetica";
      let scores = `Your score: ${this.score} - Top score: ${this.topscore}`;
      ctx.fillText(scores, this.gameWidth / 2, this.gameHeight / 4);
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
      ctx.font = "lighter 32px Helvetica";
      if (android || ios) {
        ctx.fillText(
          "Touch to restart",
          this.gameWidth / 2,
          (3 * this.gameHeight) / 4
        );
      } else {
        ctx.fillText(
          "Press R to restart",
          this.gameWidth / 2,
          (3 * this.gameHeight) / 4
        );
      }
    }
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(243,140,161,0.5)";
      ctx.fill();
      ctx.font = "lighter 64px Helvetica";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(243,140,161,1)";
      ctx.fill();
      ctx.font = "lighter 32px Helvetica";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      if (android || ios) {
        ctx.fillText(
          "TOUCH ANYWHERE TO PLAY!",
          this.gameWidth / 2,
          this.gameHeight / 2
        );
      } else {
        ctx.fillText(
          "PRESS SPACE TO PLAY!",
          this.gameWidth / 2,
          this.gameHeight / 2
        );
      }
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.snd.play();
      this.gamestate = GAMESTATE.RUNNING;
    } else if (this.gamestate === GAMESTATE.RUNNING) {
      this.snd.play();
      this.gamestate = GAMESTATE.PAUSED;
    }
  }

  gameOver() {
    this.gamestate = GAMESTATE.GAMEOVER;
  }

  backToMenu() {
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      this.snd.play();
      this.gamestate = GAMESTATE.MENU;
      this.player = new Player("player", this);
      this.speedup = new Item("speedup", this);
      this.gameObjects = [this.player, this.speedup];
      this.score = 0;
      localStorage.setItem("topscore", this.topscore);
    }
  }
}
