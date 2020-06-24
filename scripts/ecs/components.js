class Renderable extends TagComponent { }
class Background extends TagComponent { }

class Position extends Component { }

Position.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number }
};

class Sprite extends Component { }

Sprite.schema = {
  image: { type: Types.Object },
  width: { type: Types.Number },
  height: { type: Types.Number }
}

class Movement extends Component { }

Movement.schema = {
  velocity: { type: Types.Vector2DType },
  acceleration: { type: Types.Vector2DType }
};

class Velocity extends Component { }

Velocity.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number }
};