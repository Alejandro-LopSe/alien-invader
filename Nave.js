

export default class Nave {
  derecha_d = false;
  izquierda_p = false;
  disparo = false;

  constructor(canvas, vel, bulletController) {
    this.canvas = canvas;
    this.vel = vel;


    this.bulletController = bulletController;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 50;
    this.height = 48;

    this.image = new Image();
    this.image.src = "images/nave.png";

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  draw(ctx) {
    if (this.disparo) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
    }
    this.move();
    this.collideWithWalls();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collideWithWalls() {
    //left
    if (this.x < 0) {
      this.x = 0;
    }

    //right
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  move() {
    if (this.derecha_d) {
      this.x += this.vel;
    } else if (this.izquierda_p) {
      this.x += -this.vel;
    }
  }

  keydown = (event) => {
    if (event.code == "ArrowRight") {
      this.derecha_d = true;
    }
    if (event.code == "ArrowLeft") {
      this.izquierda_p = true;
    }
    if (event.code == "Space") {
      this.disparo = true;
    }
  };

  keyup = (event) => {
    if (event.code == "ArrowRight") {
      this.derecha_d = false;
    }
    if (event.code == "ArrowLeft") {
      this.izquierda_p = false;
    }
    if (event.code == "Space") {
      this.disparo = false;
    }
  };
}
