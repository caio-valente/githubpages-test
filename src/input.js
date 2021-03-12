var canvas = document.getElementById("gameCanvas");

export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 39:
          game.player.setAnimationFrame("on");
          game.player.direction = "right";
          break;
        case 37:
          game.player.setAnimationFrame("on");
          game.player.direction = "left";
          break;
        case 82:
          game.backToMenu();
          break;
        case 80:
          game.togglePause();
          break;
        case 32:
          game.start();
          break;
        default:
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 39:
          if (game.player.direction === "right") {
            game.player.setAnimationFrame("off");
            game.player.direction = "stay";
          }
          break;
        case 37:
          if (game.player.direction === "left") {
            game.player.setAnimationFrame("off");
            game.player.direction = "stay";
          }
          break;
        default:
          break;
      }
    });
    canvas.addEventListener("touchstart", touchHandler);
    canvas.addEventListener("touchmove", touchHandler);
    canvas.addEventListener("touchend", (e) => {
      game.player.setAnimationFrame("off");
      game.player.direction = "stay";
      game.backToMenu();
    });
    function touchHandler(e) {
      e.preventDefault();
      let canvas = document.getElementById("gameCanvas");
      if (e.touches) {
        if (game.gamestate === 1) {
          let touchX = e.touches[0].pageX - canvas.offsetLeft;
          if (touchX > canvas.clientWidth / 2) {
            game.player.setAnimationFrame("mobile");
            game.player.direction = "right";
          } else {
            game.player.setAnimationFrame("mobile");
            game.player.direction = "left";
          }
        }
        if (game.gamestate === 2) {
          game.gamestate = 1;
        }
      }
    }
  }
}
