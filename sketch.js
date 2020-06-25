let imageBackground;
let enemyImage;
let characterImage;
let soundtrack;
let jumpSound;
let world;
let lastTime;

function preload() {
  characterImage = loadImage('assets/sprites/character/correndo.png');
  imageBackground = loadImage('assets/sprites/background/floresta.png');
  enemyImage = loadImage('assets/sprites/enemies/gotinha.png');
  soundtrack = loadSound('assets/sounds/trilha_jogo.mp3');
  jumpSound = loadSound('assets/sounds/somPulo.mp3');
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
    .registerComponent(Animable)
    .registerComponent(Renderable)
    .registerComponent(Background)
    .registerComponent(Player)
    .registerComponent(PlayerInput)
    .registerComponent(PlayerPhysics)
    .registerSystem(SpriteRendererSystem)
    .registerSystem(HorizontalMovementSystem)
    .registerSystem(AnimationSystem)
    .registerSystem(PlayerMovementSystem)
    .registerSystem(CollisionSystem)

  createAllEntities(world);

  frameRate(30);
  //soundtrack.loop();
}

function keyPressed() {
  world.createEntity().addComponent(PlayerInput, { key })
}

function draw() {
  let time = performance.now();
  let delta = time - lastTime;
  lastTime = time;

  // Run all the systems
  world.execute(delta, time);
}
