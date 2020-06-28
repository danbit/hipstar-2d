const game = new GameController()
window.disableAllCollisions = false

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
  game.onInput('keyPressed', key, keyCode)
}

draw = () => {
  game.onUpdate()
}
