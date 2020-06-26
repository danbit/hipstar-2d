class Character {
    constructor(images, world) {
        this.images = images
        this.createEntities(world)
    }

    createEntities(world) {
        const characterMatrix = buildMatrix(4, 4, 220, 270)
        const jumpVariation = 40
        const initialPositionY = height - 135

        world.createEntity()
            .addComponent(PlayerTag)
            .addComponent(Renderable)
            .addComponent(Animable)
            .addComponent(Position, { x: 0, y: initialPositionY })
            .addComponent(PlayerPhysics, {
                initialPositionY,
                jumpSpeed: 0,
                jumpAmount: 2,
                jumpVariation,
                gravity: 3
            })
            .addComponent(Sprite, {
                image: game.characterImage,
                width: 110,
                height: 135,
                imageWidth: 220,
                imageHeight: 270,
                matrix: characterMatrix,
                frame: 0,
                collisionOffset: 0.7
            })
    }
}