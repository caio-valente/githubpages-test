const ANIMATIONFRAME = {
  STAND: 0,
  WALK: 1
};

export default class Player {
  constructor(type, game) {
    this.image = new Image();
    this.image.src = "assets/img/animated_girl.png";
    this.game = game;
    this.speed = 0;
    this.maxSpeed = 30;
    this.width = 150;
    this.height = 152.5;
    this.position = {
      x: this.game.gameWidth / 2,
      y: this.game.gameHeight - 55 - this.height / 2
    };
    this.reversed = 1;
    this.basketBox = {
      x: this.position.x + 40 + 80 * -1 * this.reversed,
      y: this.position.y + 40,
      size: 10
    };
    this.animationFrame = ANIMATIONFRAME.STAND;
  }
  draw(ctx) {
    let imageIndex = this.game.frameIndex / 7;
    imageIndex = Math.floor(imageIndex);
    if (this.animationFrame === ANIMATIONFRAME.STAND) {
      ctx.drawImage(
        this.image,
        300,
        305 * this.reversed,
        300,
        305,
        this.position.x - this.width / 2,
        this.position.y - this.height / 2,
        this.width,
        this.height
      );
    } else if (this.animationFrame === ANIMATIONFRAME.WALK) {
      ctx.drawImage(
        this.image,
        300 * imageIndex,
        305 * this.reversed,
        300,
        305,
        this.position.x - this.width / 2,
        this.position.y - this.height / 2,
        this.width,
        this.height
      );
    } else if (this.animationFrame === ANIMATIONFRAME.MOBILEWALK) {
      ctx.drawImage(
        this.image,
        0,
        305 * this.reversed,
        300,
        305,
        this.position.x - this.width / 2,
        this.position.y - this.height / 2,
        this.width,
        this.height
      );
    }
    // ctx.fillRect(
    //   this.basketBox.x,
    //   this.basketBox.y,
    //   this.basketBox.size,
    //   this.basketBox.size
    // );
  }

  update(deltaTime) {
    if (!deltaTime) return;
    switch (this.direction) {
      case "right":
        this.speed = this.maxSpeed;
        this.reversed = 0;
        if (this.position.x + this.width / 2 >= this.game.gameWidth) {
          break;
        } else {
          this.position.x += this.speed / deltaTime;
          break;
        }
      case "left":
        this.speed = this.maxSpeed;
        this.reversed = 1;
        if (this.position.x - this.width / 2 < 0) {
          break;
        } else {
          this.position.x -= this.speed / deltaTime;
          break;
        }
      default:
        this.speed = 0;
        break;
    }
    this.basketBox = {
      x: this.position.x + 40 + 80 * -1 * this.reversed,
      y: this.position.y + 40,
      size: 10
    };
  }
  setAnimationFrame(state) {
    if (state === "on") {
      this.animationFrame = ANIMATIONFRAME.WALK;
    } else if (state === "off") {
      this.animationFrame = ANIMATIONFRAME.STAND;
    } else if (state === "mobile") {
      this.animationFrame = ANIMATIONFRAME.WALKMOBILE;
    }
  }
}
