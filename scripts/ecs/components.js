class Renderable extends TagComponent { }
class Collidable extends TagComponent { }
class Animable extends TagComponent { }
class Colletable extends TagComponent { }
class BackgroundTag extends TagComponent { }
class PlayerTag extends TagComponent { }
class EnemyTag extends TagComponent { }
class UITag extends TagComponent { }
class HealthHudTag extends TagComponent { }

class Position extends Component { }
Position.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number }
};

class Sprite extends Component { }
Sprite.schema = {
  image: { type: Types.Object },
  imagesAux: { type: Types.Object },
  imageWidth: { type: Types.Number },
  imageHeight: { type: Types.Number },
  isSpriteSheet: { type: Types.Boolean },
  width: { type: Types.Number },
  height: { type: Types.Number },
  frame: { type: Types.Number },
  frameObj: { type: Types.Object },
  collisionOffset: { type: Types.Number },
  flipImage: { type: Types.Boolean },  
}

class Velocity extends Component { }
Velocity.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
  maxX: { type: Types.Number },
  minX: { type: Types.Number },
}

class PlayerInput extends Component { }
PlayerInput.schema = {
  key: { type: Types.String },
  keyCode: { type: Types.String },
}

class PlayerPhysics extends Component { }
PlayerPhysics.schema = {
  initialPositionY: { type: Types.Number },
  jumpSpeed: { type: Types.Number },
  jumpAmount: { type: Types.Number },
  jumpVariation: { type: Types.Number },
  maxJumpHeight: { type: Types.Number },
  gravity: { type: Types.Number },
  onGround: { type: Types.Boolean },
  collisionEnabled: { type: Types.Boolean, default: true },
}

class Animation extends Component { }
Animation.schema = {
  current: { type: Types.String },
  animations: { type: Types.Object },
  cycles: { type: Types.Number },
  frameDelay: { type: Types.Number },
}

class GameState extends Component { }
GameState.schema = {
  isRunning: { type: Types.Boolean },
  onMenu: { type: Types.Boolean },
  gameOver: { type: Types.Boolean },
  playerIsDead: { type: Types.Boolean },
}

class Score extends Component { }
Score.schema = {
  value: { type: Types.Boolean },
}

class Health extends Component { }
Health.schema = {
  value: { type: Types.Boolean },
  image: { type: Types.Object },
}
