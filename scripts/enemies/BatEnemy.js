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
        this.updateEntity()
    }

    updateEntity() {
        const scale = 2
        const initialPositionX = this.x || width + 75
        const initialPositionY = this.y || height - 100

        this.entity.addComponent(Position, { x: initialPositionX, y: initialPositionY })
            .addComponent(Velocity, { x: 5, y: 0 })
            .addComponent(Animation, {
                current: "walking",
                animations: {
                    walking: {
                        row: this.type.rowAnimation,
                        totalFrames: 3
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
