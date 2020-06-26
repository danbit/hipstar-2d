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
        if (window.enableRenderCollider) {
            noFill()
            rect(position.x, position.y, sprite.width, sprite.height)
        }
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
        let hasVerticalInput = false;

        this.queries.inputs.results.forEach(entity => {
            const input = entity.getComponent(PlayerInput);

            if (input.key === 'ArrowUp') {
                hasVerticalInput = true
            }
            entity.removeComponent(PlayerInput, true)
        })

        const playerEntity = this.queries.player.results[0]
        if (!playerEntity) return

        const position = playerEntity.getMutableComponent(Position);
        const physics = playerEntity.getMutableComponent(PlayerPhysics);

        if (hasVerticalInput) {
            this.jump(physics)
        }

        this.appliesGravity(position, physics, playerEntity)
        playerEntity.removeComponent(PlayerInput, true)
    }

    jump(physics) {
        if (physics.jumpAmount > 0) {
            game.jumpSound.play()
            physics.jumpSpeed = - 31
            physics.jumpAmount--
        }
    }

    appliesGravity(position, physics) {
        position.y += physics.jumpSpeed;
        physics.jumpSpeed += physics.gravity;

        if (position.y > physics.initialPositionY) {
            position.y = physics.initialPositionY;
            physics.jumpAmount = 2;
        }
    }
}
PlayerMovementSystem.queries = {
    player: { components: [PlayerTag, Position, PlayerPhysics] },
    inputs: { components: [PlayerInput] },
}

class AnimationSystem extends System {
    execute(_delta, _time) {
        this.queries.enemies.results.forEach(entity => {
            const sprite = entity.getMutableComponent(Sprite);

            sprite.frame++;
            if (sprite.frame >= sprite.matrix.length - 1) {
                sprite.frame = 0;
            }
        });

        const playerEntity = this.queries.player.results[0]
        const sprite = entity.getMutableComponent(Sprite);
    }
}
AnimationSystem.queries = {
    player: { components: [PlayerTag, Animable] },
    enemies: { components: [EnemyTag, Animable] },
}

class CollisionSystem extends System {
    execute(_delta, _time) {
        if(window.disableAllCollisions){
            return;
        }
        const player = this.queries.player.results[0]
        this.queries.enimies.results.forEach(enemy => {
            if (this.isColliding(player, enemy)) {                
                this.gameOver()
            }
        });
    }

    gameOver() {
        background('rgba(0%,0%,0%,.80)');
        fill("#cc0000");
        game.soundtrack.stop()
        textAlign(CENTER)
        textSize(48);
        text("Game Over", width / 2, height / 2)
        isGameOver = true;
        noLoop()
    }

    isColliding(player, enemy) {
        const playerSprite = player.getComponent(Sprite);
        const playerPosition = player.getComponent(Position);
        const enemySprite = enemy.getComponent(Sprite);
        const enamyPosition = enemy.getComponent(Position);

        const colliding = collideRectRect(
            playerPosition.x,
            playerPosition.y,
            playerSprite.width * playerSprite.collisionOffset,
            playerSprite.height * playerSprite.collisionOffset,
            enamyPosition.x,
            enamyPosition.y,
            enemySprite.width * enemySprite.collisionOffset,
            enemySprite.height * enemySprite.collisionOffset,
        );
        return colliding;
    }
}
CollisionSystem.queries = {
    player: { components: [PlayerTag, Position, Sprite] },
    enimies: { components: [EnemyTag, Position, Sprite] },
}

class GameSystem extends System {
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
GameSystem.queries = {
    entities: { components: [Position, Animable] },
}
