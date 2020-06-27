class Enemy {
    constructor(characterImage, world) {
        this.enemyImage = characterImage
        this.scale = 2;
        // this.position = {}
        // this.animation = {}
        // this.sprite = {}
        this.initialPositionX = width - 16
        this.initialPositionY = height - 35
        this.createEntity(world)
    }

    createEntity(world) {

        world.createEntity()
            .addComponent(EnemyTag)
            .addComponent(Renderable)
            .addComponent(Animable)
            .addComponent(Position, { x: this.initialPositionX, y: this.initialPositionY })
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
                width: 16 * this.scale,
                height: 8 * this.scale,
                imageWidth: 16,
                imageHeight: 8,
                isSpriteSheet: true,
                frame: 0,
                collisionOffset: 0.7
            })
    }
}