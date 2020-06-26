class SpriteRendererSystem extends System {
    // This method will get called on every frame by default
    execute(_delta, _time) {
        // Iterate through all the entities on the query
        this.queries.renderables.results.forEach(entity => {
            const sprite = entity.getComponent(Sprite);
            const position = entity.getComponent(Position);
            const animation = entity.getComponent(Animation);

            this.render(sprite, position, animation);
        });
    }

    render(sprite, position, animation) {
        if (sprite.isSpriteSheet) {
            const currentAnimation = animation.animations[animation.current]
            console.log('animation.current', animation.current)
            image(
                sprite.image,
                position.x,
                position.y,
                sprite.width,
                sprite.height,
                sprite.frame * sprite.width,
                currentAnimation.row * sprite.height,
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
        if (window.enableRenderCollider) {
            noFill()
            rect(position.x, position.y, sprite.width, sprite.height)
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

        this.position = playerEntity.getMutableComponent(Position);
        this.physics = playerEntity.getMutableComponent(PlayerPhysics);
        this.animation = playerEntity.getMutableComponent(Animation);

        if (hasVerticalInput) {
            this.jump()
        }

        this.appliesGravity()
        playerEntity.removeComponent(PlayerInput, true)
    }

    jump() {
        if (this.physics.jumpAmount > 0) {
            game.jumpSound.play()
            this.animation.current = 'jumpingUp'
            this.physics.jumpSpeed = - this.physics.maxJumpHeight
            this.physics.jumpAmount--
        }
    }

    appliesGravity() {
        this.position.y += this.physics.jumpSpeed;
        this.physics.jumpSpeed += this.physics.gravity;
        
        if (this.position.y > this.physics.initialPositionY) {            
            this.position.y = this.physics.initialPositionY;
            this.physics.jumpAmount = 2;
            this.physics.jumpSpeed = 0
        }
    }
}
PlayerMovementSystem.queries = {
    player: { components: [PlayerTag, Position, PlayerPhysics] },
    inputs: { components: [PlayerInput] },
}

class AnimationSystem extends System {
    execute(_delta, _time) {
        this.queries.entities.results.forEach(entity => {
            const sprite = entity.getMutableComponent(Sprite);
            const animation = entity.getMutableComponent(Animation);
            const currentAnimation = animation.animations[animation.current]

            sprite.frame++;
            if (sprite.frame >= currentAnimation.totalFrames) {
                sprite.frame = 0;
                animation.current = 'running'
                console.log('running')
            }
        });
    }
}
AnimationSystem.queries = {
    entities: { components: [Animable] },
}

class CollisionSystem extends System {
    execute(_delta, _time) {
        if (window.disableAllCollisions) {
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
