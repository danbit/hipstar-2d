// debug values
window.disableAllCollisions = false
window.enableRenderCollider = false

let lastTime;
let isGameOver
let game

preload = () => {
  game = new GameController()
  game.onCreate()
}

setup = () => {
  createCanvas(480, 270) // 640, 360
  frameRate(30)
  game.onStart()
}

keyPressed = () => {
  game.onInput('keyPressed', key, keyCode)
}

draw = () => {
  let time = performance.now();
  let delta = time - lastTime;
  lastTime = time;

  // Run all the systems
  game.onUpdate(delta, time)
}
