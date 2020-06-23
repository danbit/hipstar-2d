import { buildSpriteSheet } from './helper'

export class Character {
  constructor(p5, image) {
    this.p5 = p5;
    this.image = image;
    this.spriteSheet = buildSpriteSheet();
    this.imageWidth = 220;
    this.imageHeight = 270;
    this.characterWidth = 110;
    this.characterHeight = 135;
    this.positionX = 0;
    this.positionY = p5.height - 135;
    this.frame = 0;
  }

  render() {
    this.p5.image(
      this.image, this.positionX, this.positionY, this.characterWidth, this.characterHeight,
      this.spriteSheet[this.frame][0], this.spriteSheet[this.frame][1],
      this.imageWidth, this.imageHeight
    );    
  }

  update() {
    this.frame++;
    if (this.frame >= this.spriteSheet.length - 1) {
      this.frame = 0;
    }
  }
}