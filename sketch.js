const game = new Game()
window.disableAllCollisions = true

let isGameOver

preload = () => {
  game.onCreate()
}

setup = () => {
  createCanvas(640, 360)
  frameRate(30)
  game.onStart()
}

keyPressed = () => {
  game.onInput('keyPressed', key)
}

draw = () => {
  game.onUpdate()
}

windowResized = () => {
  resizeCanvas(window.innerWidth, window.innerHeight)
}
