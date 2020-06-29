class GoblinEnemy extends Enemy {
    constructor(enemyImage, world, x, y) {
        super(world)
        this.enemyImage = enemyImage
        this.x = x
        this.y = y
        this.width = 16
        this.height = 16
        this.minSpeedX = 5
        this.maxSpeedX = 6  
        this.updateEntity()
    }

    updateEntity() {
        const scale = 3
        const initialPositionX = this.x || width + this.width
        const initialPositionY = this.y || height - 65

        this.entity.addComponent(Position, { x: initialPositionX, y: initialPositionY })
            .addComponent(Velocity, { x: 0, y: 0, maxX: this.maxSpeedX, minX: this.minSpeedX })
            .addComponent(Animation, {
                current: "walking",
                animations: {
                    walking: {
                        row: 0,
                        totalFrames: 3
                    }
                },
                cycles: 0,
                frameDelay: 3
            })
            .addComponent(Sprite, {
                image: this.enemyImage,
                width: this.width * scale,
                height: this.height * scale,
                imageWidth: this.width,
                imageHeight: this.height,
                isSpriteSheet: true,
                frame: 0,
                collisionOffset: 0.7,
                flipImage: true
            })
    }
}
