class Background {
  constructor(image, speed) {
    this.image = image;
    this.speed = speed;
    this.x1 = 0;
    this.x2 = width;

    // const rectangleIntial = new Rectangle(new Vector2D(this.x1, 0), width, height);
    // this.spriteRenderInital = new SpriteRender(this.image, rectangleIntial);

    // const rectangleFinal = new Rectangle(new Vector2D(this.x2, 0), width, height);
    // this.spriteRenderFinal = new SpriteRender(this.image, rectangleFinal);
  }

  update() {
    this.x1 -= this.speed;
    this.x2 -= this.speed;

    if (this.x1 < -width) {
      this.x1 = width;
    }
    if (this.x2 < -width) {
      this.x2 = width;
    }
  }
}