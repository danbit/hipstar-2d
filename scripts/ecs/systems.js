class SpriteRendererSystem extends System {
    // This method will get called on every frame by default
    execute(_delta, _time) {
        // Iterate through all the entities on the query
        this.queries.renderables.results.forEach(entity => {
            const sprite = entity.getComponent(Sprite)
            const position = entity.getComponent(Position)
            const animation = entity.getComponent(Animation)
            this.render(sprite, position, animation)
        })
    }

    render(sprite, position, animation) {
        if (sprite.isSpriteSheet) {
            const currentAnimation = animation.animations[animation.current]
            let positionX = position.x

            if (sprite.flipImage) {
                push(); //save current "default" matrix
                scale(-1, 1); //scale the matrix
                positionX = -position.x - sprite.width
            }
            image(
                sprite.image,
                positionX,
                position.y,
                sprite.width,
                sprite.height,
                sprite.frame * sprite.imageWidth,
                currentAnimation.row * sprite.imageHeight,
                sprite.imageWidth,
                sprite.imageHeight
            )
            if (sprite.flipImage) {
                pop();
            }
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
            const position = entity.getMutableComponent(Position)
            const velocity = entity.getComponent(Velocity)

            position.x -= velocity.x

            if (position.x < -width) {
                position.x = width
            }
        })

        // let nextBackgroundIndex = 1
        const backgrounds = this.queries.backgrounds.results

        for (let i = 0; i < backgrounds.length; i++) {
            const backgroundEntity = backgrounds[i]
            const position = backgroundEntity.getMutableComponent(Position)
            const velocity = backgroundEntity.getComponent(Velocity)

            position.x -= velocity.x

            if (position.x <= -width) {
                position.x = width
            }

            // const nextBackgroundEntity = backgrounds[nextBackgroundIndex]
            // const nextBackgroundPosition = nextBackgroundEntity.getMutableComponent(Position)


            // if (nextBackgroundPosition.x <= -width) {
            //     nextBackgroundPosition.x = width + position.x
            // }

            // console.log('nextBackground', nextBackgroundIndex)

            // nextBackgroundIndex++
            // if (nextBackgroundIndex >= backgrounds.length) {
            //     nextBackgroundIndex = 0
            // }
        }
    }
}
HorizontalMovementSystem.queries = {
    entities: { components: [Not(BackgroundTag), Position, Velocity] },
    backgrounds: { components: [BackgroundTag, Position, Velocity] },
}

class PlayerMovementSystem extends System {
    execute(_delta, _time) {
        let hasVerticalInput = false

        this.queries.inputs.results.forEach(entity => {
            const input = entity.getComponent(PlayerInput)
            if (input.keyCode === 38 || input.keyCode === 32) {
                hasVerticalInput = true
            }
            entity.removeComponent(PlayerInput, true)
        })

        const playerEntity = this.queries.player.results[0]
        if (!playerEntity) return

        this.position = playerEntity.getMutableComponent(Position)
        this.physics = playerEntity.getMutableComponent(PlayerPhysics)
        this.animation = playerEntity.getMutableComponent(Animation)
        this.sprite = playerEntity.getMutableComponent(Sprite)

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
            this.physics.jumpSpeed = - this.physics.jumpVariation
            this.physics.jumpAmount--
        }
    }

    appliesGravity() {
        this.position.y += this.physics.jumpSpeed
        this.physics.jumpSpeed += this.physics.gravity

        if (this.position.y > this.physics.initialPositionY) {
            this.position.y = this.physics.initialPositionY
            this.physics.jumpAmount = 2
            this.physics.jumpSpeed = 0
        }

        // TODO create a enum for animations
        const onGround = this.position.y === this.physics.initialPositionY
        const jumpingUp = this.animation.current === 'jumpingUp'

        if (onGround && !jumpingUp) {
            this.animation.current = 'running'
            this.physics.onGround = true
        } else {
            if (this.position.y == this.physics.maxJumpHeight) {
                this.animation.current = 'jumpingDown'
            }
            else if (this.position.y < this.physics.maxJumpHeight) {
                this.animation.current = 'doubleJumping'
            }
            this.physics.onGround = false
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
            const sprite = entity.getMutableComponent(Sprite)
            const animation = entity.getMutableComponent(Animation)
            const currentAnimation = animation.animations[animation.current]

            sprite.frame++
            if (sprite.frame >= currentAnimation.totalFrames) {
                sprite.frame = 0
            }
        })
    }
}
AnimationSystem.queries = {
    entities: { components: [Animable] },
}

class CollisionSystem extends System {
    execute(_delta, _time) {
        if (window.disableAllCollisions) {
            return
        }
        const player = this.queries.player.results[0]
        this.queries.enimies.results.forEach(enemy => {
            if (this.isColliding(player, enemy)) {
                this.gameOver()
            }
        })
    }

    gameOver() {
        background('rgba(0%,0%,0%,.80)')
        fill("#cc0000")
        game.soundtrack.stop()
        textAlign(CENTER)
        textSize(48)
        text("Game Over", width / 2, height / 2)
        isGameOver = true
        noLoop()
    }

    isColliding(player, enemy) {
        const playerSprite = player.getComponent(Sprite)
        const playerPosition = player.getComponent(Position)
        const enemySprite = enemy.getComponent(Sprite)
        const enamyPosition = enemy.getComponent(Position)

        const colliding = collideRectRect(
            playerPosition.x,
            playerPosition.y,
            playerSprite.width * playerSprite.collisionOffset,
            playerSprite.height * playerSprite.collisionOffset,
            enamyPosition.x,
            enamyPosition.y,
            enemySprite.width * enemySprite.collisionOffset,
            enemySprite.height * enemySprite.collisionOffset,
        )
        return colliding
    }
}
CollisionSystem.queries = {
    player: { components: [PlayerTag, Position, Sprite] },
    enimies: { components: [EnemyTag, Position, Sprite] },
}
