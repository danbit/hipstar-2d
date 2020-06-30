class AnimationSystem extends System {
    execute(_delta, _time) {
        const gameEntity = this.queries.game.results[0]

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

                    // TODO change this actions to a GameState system
                    if (animation.current === 'death') {
                        const gameState = gameEntity.getMutableComponent(GameState)
                        gameState.gameOver = true
                    } else if (animation.current === 'disapearing') {
                        this.changedHearthSprite(entity)
                    }
                }
            }
        })
    }

    changedHearthSprite(healthHudEntity) {
        const sprite = healthHudEntity.getMutableComponent(Sprite)
        sprite.image = sprite.imagesAux.noHeart
        sprite.isSpriteSheet = false
    }
}
AnimationSystem.queries = {
    game: { components: [GameState] },
    entities: { components: [Animable] },
}

class CollisionSystem extends System {
    execute(_delta, _time) {
        if (window.disableAllCollisions) {
            return
        }
        const gameEntity = this.queries.game.results[0]
        const playerEntity = this.queries.player.results[0]

        if (!playerEntity.getComponent(PlayerPhysics).collisionEnabled) {
            return
        }

        this.queries.items.results.forEach(itemEntity => {
            if (this.isColliding(playerEntity, itemEntity)) {
                game.pickupCoinSound.play()
                const sprite = itemEntity.getComponent(Sprite)
                const position = itemEntity.getMutableComponent(Position)
                position.x = width + sprite.width

                const itemScore = itemEntity.getComponent(Score)
                itemEntity.removeComponent(Collidable)
                itemEntity.removeComponent(Renderable)

                const score = gameEntity.getMutableComponent(Score)
                score.value += itemScore.value
            }
        })

        this.queries.enimies.results.forEach(enemyEntity => {
            if (this.isColliding(playerEntity, enemyEntity)) {
                game.hitEnemySound.play()
                const health = playerEntity.getMutableComponent(Health)
                // TODO center all animations on AnimationSystem
                const animation = playerEntity.getMutableComponent(Animation)
                const physics = playerEntity.getComponent(PlayerPhysics)

                health.value -= 1
                if (health.value <= 0) {
                    const gameState = gameEntity.getMutableComponent(GameState)
                    physics.collisionEnabled = false
                    gameState.playerIsDead = true
                } else {
                    physics.collisionEnabled = false
                    setTimeout(() => {
                        physics.collisionEnabled = true
                        animation.current = 'running'
                    }, 1000);
                }
            }
        })
    }

    isColliding(playerEntity, entity) {
        const playerSprite = playerEntity.getComponent(Sprite)
        const playerPosition = playerEntity.getComponent(Position)
        const otherSprite = entity.getComponent(Sprite)
        const otherPosition = entity.getComponent(Position)
        const collisionOffset = otherSprite.isSpriteSheet ? otherSprite.collisionOffset : 1

        const colliding = collideRectRect(
            playerPosition.x,
            playerPosition.y,
            playerSprite.width * playerSprite.collisionOffset,
            playerSprite.height * playerSprite.collisionOffset,
            otherPosition.x,
            otherPosition.y,
            otherSprite.width * collisionOffset,
            otherSprite.height * collisionOffset,
        )
        return colliding
    }
}
CollisionSystem.queries = {
    game: { components: [GameState] },
    player: { components: [Collidable, PlayerTag] },
    enimies: { components: [Collidable, EnemyTag] },
    items: { components: [Collidable, Colletable] },
}

class HorizontalMovementSystem extends System {
    execute(_delta, _time) {
        this.queries.backgrounds.results.forEach(entity => {
            const position = entity.getMutableComponent(Position)
            const velocity = entity.getComponent(Velocity)

            position.x -= velocity.x
            if (position.x < -width) {
                position.x = width
            }
        })

        this.queries.entities.results.forEach(entity => {
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
    entities: { components: [Not(BackgroundTag), Renderable, Position, Velocity] },
    backgrounds: { components: [BackgroundTag, Renderable, Position, Velocity] },
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
            let frameX = 0
            let frameY = 0
            if (animation) {
                const currentAnimation = animation.animations[animation.current]
                frameX = sprite.frame * sprite.imageWidth
                frameY = currentAnimation.row * sprite.imageHeight
            } else {
                frameX = sprite.frameObj.x
                frameY = sprite.frameObj.y
                // console.log('sprite.frameObj', sprite.frameObj)
            }
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
                frameX,
                frameY,
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

        const gameEntity = this.queries.game.results[0]
        this.gameState = gameEntity.getComponent(GameState)

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
        if (this.physics.jumpAmount > 0 && !this.gameState.gameOver) {
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

        if (!this.physics.collisionEnabled && !this.gameState.playerIsDead) {
            this.animation.current = 'hurting'
            return
        } else if (!this.physics.collisionEnabled && this.gameState.playerIsDead) {
            this.animation.current = 'death'
            frameRate(10)
            return
        }

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
    game: { components: [GameState] },
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
        let gameEntity = this.queries.game.results[0]
        const gameState = gameEntity.getComponent(GameState)
        const score = gameEntity.getMutableComponent(Score)

        if (gameState.isRunning) {
            score.value += 0.2
        }
    }
}
ScoreSystem.queries = {
    game: {
        components: [GameState, Score, Not(Colletable)],
    }
}

class GUISystem extends System {
    execute(_delta, _time) {
        this.queries.game.changed.forEach(entity => {
            const gameState = entity.getComponent(GameState)
            if (gameState.gameOver) {
                this.renderGameOverScreen()
            }
        })

        this.queries.score.changed.forEach(entity => {
            const score = entity.getComponent(Score)
            this.renderScore(score)
        })
    }

    renderScore(score) {
        textAlign(RIGHT)
        fill('#FFF')
        textSize(24)
        text(parseInt(score.value), width - 10, 30)
    }

    renderGameOverScreen() {
        background('rgba(0%,0%,0%,.80)')
        fill("#cc0000")
        game.soundtrack.stop() // TODO create sound system
        game.soundGameOver.play()
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
        components: [Score, Not(Colletable)],
        listen: {
            changed: [Score]
        }
    },
    health: {
        components: [HealthHudTag],
        listen: {
            removed: true
        }
    }
}

class HealthSystem extends System {
    execute(_delta, _time) {
        const healthHudEntities = this.queries.healthHud.results

        this.queries.entities.changed.forEach(entity => {
            const health = entity.getComponent(Health)
            this.removeHealth(healthHudEntities, health)
        })
    }

    removeHealth(healthHudEntities, health) {
        const healthHudEntity = healthHudEntities[health.value]
        const sprite = healthHudEntity.getMutableComponent(Sprite)
        sprite.image = sprite.imagesAux.lostHeart
        sprite.isSpriteSheet = true

        healthHudEntity
            .addComponent(Animable)
            .addComponent(Animation, {
                current: "disapearing",
                animations: {
                    disapearing: {
                        row: 0,
                        totalFrames: 5
                    }
                },
                cycles: 0,
                frameDelay: 2
            })
    }
}
HealthSystem.queries = {
    healthHud: {
        components: [HealthHudTag]
    },
    entities: {
        components: [Health],
        listen: {
            changed: [Health]
        }
    }
}

class ItemSystem extends System {
    execute(_delta, _time) {
        this.queries.entities.removed.forEach(entity => {
            setTimeout(() => this.recycleItem(entity), math.random(500, 2000))
        })
    }

    recycleItem(entity) {
        const velocity = entity.getMutableComponent(Velocity)
        const position = entity.getMutableComponent(Position)
        velocity.x = this.randomSpeedX(velocity)
        position.y = this.randomPositionY()

        entity.addComponent(Renderable)
        if (!entity.hasComponent(Collidable)) {
            entity.addComponent(Collidable)
        }
    }

    randomPositionY() {
        return height - math.random(40, 115) // TODO add max and min to Position component
    }

    randomSpeedX(velocity) {
        return math.random(velocity.minX, velocity.maxX)
    }
}
ItemSystem.queries = {
    entities: {
        components: [Colletable, Renderable],
        listen: {
            removed: true,
        }
    },
}
