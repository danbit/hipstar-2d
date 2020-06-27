class Renderable extends TagComponent { }
class Collidable extends TagComponent {}
class Animable extends TagComponent {}
class BackgroundTag extends TagComponent { }
class PlayerTag extends TagComponent { }
class EnemyTag extends TagComponent { }

class Position extends Component { }
Position.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number }
};

class Sprite extends Component { }
Sprite.schema = {
  image: { type: Types.Object },
  imageWidth: { type: Types.Number },
  imageHeight: { type: Types.Number },
  isSpriteSheet: { type: Types.Boolean },
  width: { type: Types.Number },
  height: { type: Types.Number },
  frame: { type: Types.Number },
  collisionOffset: { type: Types.Number },
  flipImage: { type: Types.Boolean },
}

class Velocity extends Component { }
Velocity.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number }
}

class PlayerInput extends Component {}
PlayerInput.schema = {
  key: { type: Types.String },
  keyCode: { type: Types.String },
}

class PlayerPhysics extends Component {}
PlayerPhysics.schema = {
  initialPositionY: { type: Types.Number },
  jumpSpeed: { type: Types.Number },
  jumpAmount: { type: Types.Number },
  jumpVariation: { type: Types.Number },
  maxJumpHeight: { type: Types.Number },
  gravity: { type: Types.Number },
  onGround: { type: Types.Boolean }, 
}

class Animation extends Component { }
Animation.schema = {
  current: { type: Types.String },
  animations: { type: Types.Object },  
  running: { type: Types.Boolean },
  idle: { type: Types.String },
  jump: { type: Types.String }
};
