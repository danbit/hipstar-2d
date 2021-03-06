class Character {
    constructor(characterImage, world) {
        this.characterImage = characterImage
        this.scale = 2
        this.health = 3
        this.createEntity(world)
    }

    createEntity(world) {
        const initialPositionX = 16
        const initialPositionY = height - 48

        world.createEntity()
            .addComponent(Collidable)
            .addComponent(PlayerTag)
            .addComponent(Renderable)
            .addComponent(Animable)
            .addComponent(Health, { value: this.health })
            .addComponent(Position, { x: initialPositionX, y: initialPositionY })
            .addComponent(Animation, {
                current: "idle",
                animations: {
                    death: {
                        row: 0,
                        totalFrames: 8
                    },  
                    running: {
                        row: 1,
                        totalFrames: 6
                    },
                    idle: {
                        row: 4,
                        totalFrames: 4
                    },
                    jumpingDown: {
                        row: 5,
                        totalFrames: 3
                    },
                    jumpingUp: {
                        row: 6,
                        totalFrames: 3
                    },
                    doubleJumping: {
                        row: 8,
                        totalFrames: 3
                    },
                    hurting: {
                        row: 9,
                        totalFrames: 3
                    }
                },
                cycles: 0,
                frameDelay: 2
            })
            .addComponent(PlayerPhysics, {
                initialPositionY,
                jumpSpeed: 0,
                jumpAmount: 2,
                jumpVariation: 16,
                maxJumpHeight: 255,
                gravity: 3,
                collisionEnabled: true
            })
            .addComponent(Sprite, {
                image: this.characterImage,
                width: 16 * this.scale,
                height: 16 * this.scale,
                imageWidth: 16,
                imageHeight: 16,
                isSpriteSheet: true,
                frame: 0,
                collisionOffset: 0.7
            })
    }
}