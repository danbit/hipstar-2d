class Background {
    constructor(images, world) {
        this.images = images
        this.createEntities(world)
    }

    createEntities(world) {
        let backgroundSpeed = 1

        for (let index = 0; index < this.images.length; index++) {
            const image = this.images[index]

            world.createEntity()
                .addComponent(BackgroundTag)
                .addComponent(Renderable)
                .addComponent(Position, { x: 0, y: 0 })
                .addComponent(Velocity, { x: backgroundSpeed, y: 0 })
                .addComponent(Sprite, { image, width, height })

            world.createEntity().addComponent(BackgroundTag)
                .addComponent(Renderable)
                .addComponent(Position, { x: width, y: 0 })
                .addComponent(Velocity, { x: backgroundSpeed, y: 0 })
                .addComponent(Sprite, { image, width, height })

            backgroundSpeed *= 1.2
        }
    }
}