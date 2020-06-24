let imageBackground;
let characterImage;
let background;
let backgroundParallax;
let character;
let soundtrack;
let world;
let lastTime;

const BACKGROUND_SPEED = 3;

function preload() {
  characterImage = loadImage('assets/sprites/character/correndo.png');
  imageBackground = loadImage('assets/sprites/background/floresta.png');
  soundtrack = loadSound('assets/sounds/trilha_jogo.mp3');
}

function setup() {
  lastTime = performance.now();
  createCanvas(windowWidth, windowHeight);

  // Create world and register the systems on it
  world = new World();
  world
    .registerComponent(Position)
    .registerComponent(Sprite)
    .registerComponent(Velocity)
    .registerComponent(Renderable)
    .registerComponent(Background)
    .registerSystem(SpriteRendererSystem)
    .registerSystem(HorizontalMovementSystem);

  background = world.createEntity()
    .addComponent(Background)
    .addComponent(Renderable)
    .addComponent(Position, { x: 0, y: 0 })
    .addComponent(Velocity, { x: BACKGROUND_SPEED, y: 0 })
    .addComponent(Sprite, { image: imageBackground, width, height })

  backgroundParallax = world.createEntity()
    .addComponent(Background)
    .addComponent(Renderable)
    .addComponent(Position, { x: width, y: 0 })
    .addComponent(Velocity, { x: BACKGROUND_SPEED, y: 0 })
    .addComponent(Sprite, { image: imageBackground, width, height })

  const characterMatrix = buildMatrix(4, 4, 220, 270);
  character = world.createEntity()
    .addComponent(Player)
    .addComponent(Renderable)
    .addComponent(Position, { x: 0, y: height - 110 })
    .addComponent(Sprite, {
      image: characterImage,
      width: 220,
      height: 110,
      imageWidth: 110,
      imageHeight: 135,
      matrix: characterMatrix
    })

  frameRate(30);
  //soundtrack.loop();
}

function draw() {
  let time = performance.now();
  let delta = time - lastTime;
  lastTime = time;

  // Run all the systems
  world.execute(delta, time);
}
