class AnimationSystem extends System {
    execute(_delta, _time) {
        this.queries.entities.results.forEach(entity => {
            const sprite = entity.getMutableComponent(Sprite)
            const animation = entity.getMutableComponent(Animation)
            const currentAnimation = animation.animations[animation.current]
            animation.cycles++

            if (animation.cycles % animation.frameDelay === 0) {
                sprite.frame++
                if (sprite.frame >= currentAnimation.totalFrames) {
                    sprite.frame = 0
                    animation.cycles = 0
                }
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
        const gameEntity = this.queries.game.results[0]
        const player = this.queries.player.results[0]

        this.queries.enimies.results.forEach(enemy => {
            if (this.isColliding(player, enemy)) {
                const gameState = gameEntity.getMutableComponent(GameState)
                gameState.gameOver = true
            }
        })

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
    game: { components: [GameState] },
    player: { components: [Collidable, PlayerTag] },
    enimies: { components: [Collidable, EnemyTag] },
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

        this.queries.enemies.results.forEach(entity => {
            const position = entity.getMutableComponent(Position)
            const velocity = entity.getMutableComponent(Velocity)
            const sprite = entity.getComponent(Sprite)

            position.x -= velocity.x
            if (position.x < -sprite.width * 2) {
                entity.removeComponent(Renderable)
                velocity.x = 0
                position.x = width + sprite.width
            }
        })
    }
}
HorizontalMovementSystem.queries = {
    entities: { components: [Position, Velocity] },
    enemies: { components: [EnemyTag, Position, Velocity] },
}

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
                push() //save current "default" matrix
                scale(-1, 1) //scale the matrix
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
                pop()
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

class EnemyWaveSystem extends System {
    execute(_delta, _time) {
        this.queries.entities.removed.forEach(entity => {
            const enemyEntity = this.randomEnemy()
            enemyEntity.addComponent(Renderable)

            const velocity = enemyEntity.getMutableComponent(Velocity)
            velocity.x = this.randomSpeedX(velocity)
        })
    }
    randomEnemy() {
        const enemies = this.world.entityManager.queryComponents([EnemyTag]).entities
        return enemies[Math.floor(random(0, enemies.length))]
    }

    randomSpeedX(velocity) {
        return math.random(velocity.minX, velocity.maxX)
    }
}
EnemyWaveSystem.queries = {
    entities: {
        components: [EnemyTag, Renderable],
        listen: {
            removed: true,
        }
    },
}

class ScoreSystem extends System {
    execute(_delta, _time) {
        const gameQuery = this.queries.game

        let gameEntity = gameQuery.results[0]
        const gameState = gameEntity.getComponent(GameState)
        const score = gameEntity.getMutableComponent(Score)

        if (gameState.isRunning) {
            score.value += 0.2
        }
    }
}
ScoreSystem.queries = {
    game: {
        components: [GameState, Score],
    }
}

class GUISystem extends System {
    execute(_delta, _time) {
        this.queries.game.changed.forEach(entity => {
            const gameState = entity.getComponent(GameState)
            if (gameState.gameOver) {
                this.gameOver()
            }
        })

        this.queries.score.changed.forEach(entity => {
            const score = entity.getComponent(Score)
            this.chageScore(score)
        })
    }

    chageScore(score) {
        textAlign(RIGHT)
        fill('#FFF')
        textSize(30)
        text(parseInt(score.value), width - 10, 30)
    }

    gameOver() {
        background('rgba(0%,0%,0%,.80)')
        fill("#cc0000")
        game.soundtrack.stop() // TODO create sound system
        textAlign(CENTER)
        textSize(36)
        text("Game Over", width / 2, height / 2)
        noLoop()
    }
}
GUISystem.queries = {
    game: {
        components: [GameState],
        listen: {
            changed: [GameState]
        }
    },
    score: {
        components: [Score],
        listen: {
            changed: [Score]
        }
    }
}

