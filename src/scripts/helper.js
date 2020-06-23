  export const buildSpriteSheet = (x = 4, y = 4, width = 220, height = 270) => {
    let arr = [];
    let positionX = 0;
    let positionY = 0;
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        arr.push([positionX, positionY]);
        positionX += width;
      }
      positionX = 0;
      positionY += height;
    }
    return arr;
  }