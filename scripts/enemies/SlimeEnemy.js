class SlimeEnemy extends Enemy {
    constructor(enemyImage, world, x, y) {
        super(world)
        this.enemyImage = enemyImage
        this.x = x
        this.y = y
        this.width = 16
        this.height = 23
        this.maxSpeedX = 4
        this.minSpeedX= 5
        this.updateEntity()
    }

    updateEntity() {
        const scale = 2
        const initialPositionX = this.x || width + this.width
        const initialPositionY = this.y || height - 64

        this.entity.addComponent(Position, { x: initialPositionX, y: initialPositionY })
            .addComponent(Velocity, { x: 0, y: 0, maxX: this.maxSpeedX, minX: this.minSpeedX })
            .addComponent(Animation, {
                current: "walking",
                animations: {
                    walking: {
                        row: 0,
                        totalFrames: 15
                    }
                },
                cycles: 0,
                frameDelay: 2
            })
            .addComponent(Sprite, {
                image: this.enemyImage,
                width: this.width * scale,
                height: this.height * scale,
                imageWidth: this.width,
                imageHeight: this.height,
                isSpriteSheet: true,
                frame: 0,
                collisionOffset: 0.7
            })
    }
}
