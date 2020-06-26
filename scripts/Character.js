class Character {
    constructor(characterImage, world) {
        this.characterImage = characterImage
        this.createEntities(world)
    }

    createEntities(world) {
        const jumpVariation = 40
        const initialPositionX = 16
        const initialPositionY = height - 32

        world.createEntity()
            .addComponent(PlayerTag)
            .addComponent(Renderable)
            .addComponent(Animable)
            .addComponent(Position, { x: initialPositionX, y: initialPositionY })
            .addComponent(Animation, {
                current: "running",
                animations: {
                    running: {
                        row: 1,
                        totalFrames: 5
                    },
                    jumpingUp: {
                        row: 6,
                        totalFrames: 3
                    },
                    jumpingDown: {
                        row: 5,
                        totalFrames: 3
                    }
                }
            })
            .addComponent(PlayerPhysics, {
                initialPositionY,
                jumpSpeed: 0,
                jumpAmount: 2,
                jumpVariation,
                maxJumpHeight: 16,
                gravity: 3
            })
            .addComponent(Sprite, {
                image: this.characterImage,
                width: 16,
                height: 16,
                imageWidth: 16,
                imageHeight: 16,
                isSpriteSheet: true,
                frame: 0,
                collisionOffset: 0.7
            })
    }
}