class SpriteRendererSystem extends System {
    // This method will get called on every frame by default
    execute(_delta, _time) {
        // Iterate through all the entities on the query
        this.queries.renderables.results.forEach(entity => {
            const sprite = entity.getComponent(Sprite);
            const position = entity.getComponent(Position);

            this.render(sprite, position);
        });
    }

    render(sprite, position) {
        if (sprite.matrix) {
            image(
                sprite.image,
                position.x,
                position.y,
                sprite.width,
                sprite.height,
                sprite.matrix[sprite.frame][0],
                sprite.matrix[sprite.frame][1],
                sprite.imageWidth,
                sprite.imageHeight
            )
        } else {
            image(
                sprite.image,
                position.x,
                position.y,
                sprite.width,
                sprite.height
            )
        }
    }
}
// Define a query of entities that have "Renderable" and "Sprite" components
SpriteRendererSystem.queries = {
    renderables: { components: [Renderable, Sprite] }
}

class HorizontalMovementSystem extends System {
    execute(_delta, _time) {
        this.queries.entities.results.forEach(entity => {
            const position = entity.getMutableComponent(Position);
            const velocity = entity.getComponent(Velocity);

            position.x -= velocity.x;

            if (position.x < -width) {
                position.x = width;
            }
        });
    }
}
HorizontalMovementSystem.queries = {
    entities: { components: [Position, Velocity] },
}

class PlayerMovementSystem extends System {
    execute(_delta, _time) {
        const playerEntity = this.queries.entities.results[0]
        if(!playerEntity) return

        const position = playerEntity.getMutableComponent(Position);
        const physics = playerEntity.getMutableComponent(PlayerPhysics);
        const input = playerEntity.getMutableComponent(PlayerInput);

        if (input.key === 'ArrowUp') {
            console.log('ArrowUp')
            this.jump(physics)
            this.appliesGravity(position, physics)
        }
        playerEntity.removeComponent(PlayerInput, true)
    }

    jump(physics) {
        if (physics.jumpAmount > 0) {
            physics.jumpSpeed = - 31
            physics.jumpAmount--;
        }
    }

    appliesGravity(position, physics) {
        position.y += physics.jumpSpeed;
        physics.jumpSpeed += physics.gravity;

        if (position.y > physics.initialPositionY) {
            position.y = physics.initialPositionY;
            physics.jumpAmount = 2;
        }

        console.log(physics)
    }
}
PlayerMovementSystem.queries = {
    entities: { components: [Player, Position, PlayerInput, PlayerPhysics] },
}

class AnimationSystem extends System {
    execute(_delta, _time) {
        this.queries.entities.results.forEach(entity => {
            const sprite = entity.getMutableComponent(Sprite);

            sprite.frame++;
            if (sprite.frame >= sprite.matrix.length - 1) {
                sprite.frame = 0;
            }
        });
    }
}
AnimationSystem.queries = {
    entities: { components: [Position, Animable] },
}


// class CollisionSystem extends System {
//     execute(_delta, _time) {
//         this.queries.entities.results.forEach(entity => {
//             const sprite = entity.getMutableComponent(Sprite);

//             sprite.frame++;
//             if (sprite.frame >= sprite.matrix.length - 1) {
//                 sprite.frame = 0;
//             }
//         });
//     }
// }

// CollisionSystem.queries = {
//     entities: { components: [Position, Animable] },
// }