class Character {
    constructor(characterImage, world) {
        this.characterImage = characterImage
        this.scale = 2;
        this.createEntities(world)
    }

    createEntities(world) {
        const initialPositionX = 16
        const initialPositionY = height - 54

        world.createEntity()
            .addComponent(PlayerTag)
            .addComponent(Renderable)
            .addComponent(Animable)
            .addComponent(Position, { x: initialPositionX, y: initialPositionY })
            .addComponent(Animation, {
                current: "running",
                animations: {
                    idle: {
                        row: 4,
                        totalFrames: 4
                    },
                    running: {
                        row: 1,
                        totalFrames: 6
                    },
                    jumpingUp: {
                        row: 6,
                        totalFrames: 3
                    },
                    jumpingDown: {
                        row: 5,
                        totalFrames: 3
                    },
                    doubleJumping: {
                        row: 8,
                        totalFrames: 3
                    }
                }
            })
            .addComponent(PlayerPhysics, {
                initialPositionY,
                jumpSpeed: 0,
                jumpAmount: 2,
                jumpVariation: 16,
                maxJumpHeight: 264,
                gravity: 3
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