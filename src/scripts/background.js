export class Background {
  constructor(p5, image, speed) {
    this.p5 = p5;
    this.image = image;
    this.speed = speed;
    this.x1 = 0;
    this.x2 = p5.width;
    this.width = p5.width
    this.height = p5.height
  }

  render() {
    this.p5.image(this.image, this.x1, 0, this.width, this.height);
    this.p5.image(this.image, this.x2, 0, this.width, this.height);
  }

  update() {
    this.x1 -= this.speed;
    this.x2 -= this.speed;

    if (this.x1 < - this.width) {
      this.x1 =  this.width;
    }
    if (this.x2 < - this.width) {
      this.x2 =  this.width;
    }
  }
}