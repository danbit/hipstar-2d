class Coin {
    constructor(imageCoin, world) {
        this.image = imageCoin
        this.scale = 1.5
        this.width = 9
        this.height = 9
        this.maxSpeedX = 5
        this.minSpeedX = 15
        this.createEntity(world)
    }

    createEntity(world) {
        const initialPositionX = width + this.width
        const initialPositionY = height - math.random(40, 100)

        world.createEntity()
            .addComponent(Colletable)
            .addComponent(Renderable)
            .addComponent(Collidable)
            .addComponent(Score, { value: 10 })
            .addComponent(Position, { x: initialPositionX, y: initialPositionY })
            .addComponent(Velocity, {
                x: math.random(this.minSpeedX, this.maxSpeedX),
                y: 0,
                minX: this.minSpeedX,
                maxX: this.maxSpeedX
            })
            .addComponent(Sprite, {
                image: this.image,
                width: this.width * this.scale,
                height: this.height * this.scale
            })
    }
}