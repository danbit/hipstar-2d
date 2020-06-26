const game = new Game()  
window.disableAllCollisions = true

let isGameOver

function preload() {
  game.onCreate()
}

function setup() {
  createCanvas(480, 270)
  frameRate(30)
  game.onStart()
}

function keyPressed() {
  game.onInput('keyPressed', key)
}

function draw() {
  game.onUpdate()
}
