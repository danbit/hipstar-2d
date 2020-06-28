class HeartHud {
    constructor(imageHeartHud, imageNoHeartHud, imageLostHearts, world) {
        this.imageHeart = imageHeartHud
        this.imageNoHeart = imageNoHeartHud
        this.imageLostHearts = imageLostHearts
        this.scale = 1;
        this.width = 16
        this.height = 16
        this.createEntities(world)
    }

    createEntities(world) {
        let initialPositionX = 5
        const initialPositionY = 10
        const offsetPositionX = 5
        const playerEntity = world.entityManager.queryComponents([PlayerTag]).entities[0]
        const healthValue = playerEntity.getComponent(Health).value

        for (let i = 0; i < healthValue; i++) {
            world.createEntity()
                .addComponent(HudTag)
                .addComponent(Renderable)
                .addComponent(Position, { x: initialPositionX, y: initialPositionY })
                .addComponent(Sprite, {
                    image: this.imageHeart,
                    width: this.width * this.scale,
                    height: this.height * this.scale,
                    imageWidth: this.width,
                    imageHeight: this.height,
                    isSpriteSheet: false,
                    frame: 0,
                    collisionOffset: 0.7
                })
            initialPositionX += offsetPositionX + this.width
        }
    }
}