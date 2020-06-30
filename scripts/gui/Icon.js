class Icon {
    constructor(world, imageUI, x, y, rows = 2) {
        this.world = world
        this.image = imageUI
        this.scale = 1.5
        this.width = 14
        this.height = 12
        this.x = x
        this.y = y
        this.rows = rows
        this.offset = 2
        this.createEntity()
    }

    createEntity() {
        const TOTAL_SPRITES_X = this.rows
        const TOP_LEFT_FRAME_X = 55
        const TOP_LEFT_FRAME_Y = 470
        const INITIAL_POSITION_X = this.x || width / 2 - 100
        const INITIAL_POSITION_Y = this.y || height / 2 - 100

        let windowPositionX = INITIAL_POSITION_X
        let windowPositionY = INITIAL_POSITION_Y
        let frameX = TOP_LEFT_FRAME_X
        let frameY = TOP_LEFT_FRAME_Y

        for (let i = 1; i <= TOTAL_SPRITES_X; i++) {
            this.drawSprite(windowPositionX, windowPositionY, frameX, frameY)
            windowPositionX += this.width * this.scale - 2
            frameX += (this.width + this.offset) * 2
        }
    }

    drawSprite(x, y, frameX, frameY) {
        this.world.createEntity()
            .addComponent(UITag)
            .addComponent(Renderable)
            .addComponent(Position, { x, y })
            .addComponent(Sprite, {
                image: this.image,
                width: this.width * this.scale,
                height: this.height * this.scale,
                imageWidth: this.width,
                imageHeight: this.height,
                isSpriteSheet: true,
                frame: 0,
                frameObj: {
                    x: frameX,
                    y: frameY,
                },
            })
    }
}
