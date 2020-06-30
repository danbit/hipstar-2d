// debug values
window.disableAllCollisions = false
window.enableRenderCollider = false

let lastTime;
let isGameOver
let gameController

preload = () => {
  gameController = new GameController()
  gameController.onCreate()
}

setup = () => {
  createCanvas(480, 270) // 640, 360
  frameRate(30)
  gameController.onStart()
}

keyPressed = () => {
  gameController.onInput('keyPressed', key, keyCode)
}

draw = () => {
  let time = performance.now();
  let delta = time - lastTime;
  lastTime = time;

  // Run all the systems
  gameController.onUpdate(delta, time)
}
