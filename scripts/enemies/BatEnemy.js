const BatEnemyTypes = {
    BLUE: { rowAnimation: 3 },
    ORANGE: { rowAnimation: 7 },
}

class BatEnemy extends Enemy {
    constructor(enemyImage, world, type = BatEnemyTypes.BLUE, x, y) {
        super(world)
        this.enemyImage = enemyImage
        this.type = type
        this.color = color
        this.x = x
        this.y = y
        this.width = 8
        this.height = 8
        this.speedX = 4
        this.speedY = this.type == BatEnemyTypes.ORANGE ? 7 : 5
        this.minSpeedX = this.type == BatEnemyTypes.ORANGE ? 6 : 4
        this.maxSpeedX = this.type == BatEnemyTypes.ORANGE ? 8 : 6
        this.updateEntity()
    }

    updateEntity() {
        const scale = 2
        const initialPositionX = this.x || width + this.width
        const initialPositionY = this.y || height - math.random(50, 100)

        this.entity.addComponent(Position, { x: initialPositionX, y: initialPositionY })
            .addComponent(Velocity, { x: 0, y: 0, maxX: this.maxSpeedX, minX: this.minSpeedX })
            .addComponent(Animation, {
                current: "walking",
                animations: {
                    walking: {
                        row: this.type.rowAnimation,
                        totalFrames: 3
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
