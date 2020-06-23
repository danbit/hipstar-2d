import { Background } from './scripts/background'
import { Character } from './scripts/character'

export const mySketch = (p5) => {
  const BACKGROUND_SPEED = 3;
  let imageBackground;
  let characterImage;
  let background;
  let character;
  let soundtrack;

  p5.preload = () => {
    characterImage = p5.loadImage('assets/sprites/character/correndo.png');
    imageBackground = p5.loadImage('assets/sprites/background/floresta.png');
    soundtrack = p5.loadSound('assets/sounds/trilha_jogo.mp3');
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    background = new Background(p5, imageBackground, BACKGROUND_SPEED);
    character = new Character(p5, characterImage);
    p5.frameRate(30);
    soundtrack.loop();
  }

  p5.draw = () => {
    background.render();
    background.update();
    character.render();
    character.update();
  }

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
  }
}