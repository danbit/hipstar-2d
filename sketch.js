const game = new Game()
window.disableAllCollisions = true

let isGameOver

preload = () => {
  game.onCreate()
}

setup = () => {
  createCanvas(640, 360)
  frameRate(40)
  game.onStart()
}

keyPressed = () => {
  game.onInput('keyPressed', key, keyCode)
}

draw = () => {
  game.onUpdate()
}
