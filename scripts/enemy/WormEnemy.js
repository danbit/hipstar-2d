class WormEnemy extends Enemy {
    constructor(enemyImage, world, x, y) {
        super(world)
        this.enemyImage = enemyImage
        this.x = x
        this.y = y
        this.updateEntity()
    }

    updateEntity() {
        const scale = 2
        const initialPositionX = this.x || width - 16
        const initialPositionY = this.y || height - 38

        this.entity.addComponent(Position, { x: initialPositionX, y: initialPositionY })
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
                width: 16 * scale,
                height: 8 * scale,
                imageWidth: 16,
                imageHeight: 8,
                isSpriteSheet: true,
                frame: 0,
                collisionOffset: 0.7
            })
    }
}
