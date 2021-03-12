export default class Item {
  constructor(type, game) {
    this.image = new Image(8, 8);
    this.image.src = "assets/img/items.png";
    this.game = game;
    this.position = { x: game.gameWidth / 2, y: 0 };
    this.width = 130;
    this.size = 60;
    this.height = 119;
    this.speed = 40;
    this.imageIndex = 0;
    this.snd = {};
    this.snd[0] = new Audio("assets/snd/pickup2.wav");
    this.snd[1] = new Audio("assets/snd/loss.wav");
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      130 * this.imageIndex,
      0,
      130,
      119,
      this.position.x - this.width / 2,
      this.position.y - this.height / 2,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    if (deltaTime) {
      this.position.y += this.speed / deltaTime;
    }
    let basket_position = this.game.player.basketBox;
    let basket_size = this.game.player.basketBox.size;
    if (
      detectCollision(basket_position, this.position, basket_size, this.size)
    ) {
      this.position = { x: randomXPosition(this.game.gameWidth), y: -30 };
      this.speed += 5;
      this.game.player.maxSpeed += 3;
      this.game.score += 1;
      this.snd[0].play();
      this.imageIndex = makeRandomIndex(0, 3);
    }
    if (this.position.y > this.game.gameHeight) {
      this.snd[1].play();
      this.game.gameOver();
    }
  }
}

function detectCollision(position1, position2, size1, size2) {
  let distanceX = position1.x - position2.x;
  let distanceY = position1.y - position2.y;
  let distance = (distanceX ** 2 + distanceY ** 2) ** (1 / 2);
  return distance <= size1 + size2;
}

function randomXPosition(maxWidth) {
  let x = Math.random() * maxWidth * 0.95;
  return x;
}

function makeRandomIndex(min, max) {
  let greater = min;
  let last_value = 0;
  for (let i = min; i < max + 1; i++) {
    let value = Math.random();
    if (value > last_value) {
      greater = i;
    }
    last_value = value;
  }
  return greater;
}
