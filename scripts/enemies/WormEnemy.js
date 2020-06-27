class WormEnemy extends Enemy {
    constructor(enemyImage, world, x, y) {
        super(world)
        this.enemyImage = enemyImage
        this.x = x
        this.y = y
        this.width = 16
        this.height = 8
        this.updateEntity()
    }

    updateEntity() {
        const scale = 2
        const initialPositionX = this.x || width - 16
        const initialPositionY = this.y || height - 38

        this.entity
            .addComponent(Position, { x: initialPositionX, y: initialPositionY })
            .addComponent(Velocity, { x: 5, y: 0 })
            .addComponent(Animation, {
                current: "walking",
                animations: {
                    walking: {
                        row: 0,
                        totalFrames: 6
                    }
                }
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
