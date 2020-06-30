class WindowUI {
    constructor(world, imageUI, rows = 3, cols = 3, x, y) {
        this.world = world
        this.image = imageUI
        this.scale = 2
        this.width = 16
        this.height = 16
        this.x = x
        this.y = y
        this.rows = rows
        this.cols = cols
        this.offset = 2
        this.createEntity()
    }

    createEntity() {
        const TOTAL_SPRITES_X = this.rows
        const TOTAL_SPRITES_Y = this.cols
        const TOP_LEFT_FRAME_X = 54
        const TOP_LEFT_FRAME_Y = 234
        const INITIAL_POSITION_X = this.x || width / 2 - 100
        const INITIAL_POSITION_Y = this.y || height / 2 - 100

        let windowPositionX = INITIAL_POSITION_X
        let windowPositionY = INITIAL_POSITION_Y
        let frameX = TOP_LEFT_FRAME_X
        let frameY = TOP_LEFT_FRAME_Y

        for (let i = 1; i <= TOTAL_SPRITES_X; i++) {
            this.drawSprite(windowPositionX, windowPositionY, frameX, frameY)

            frameX += this.width + this.offset
            for (let j = 0; j < TOTAL_SPRITES_Y - 1; j++) {
                windowPositionX += this.width * this.scale - 2
                this.drawSprite(windowPositionX, windowPositionY, frameX, frameY)
            }

            frameX += (this.width + this.offset)
            windowPositionX += this.width * this.scale - 2
            this.drawSprite(windowPositionX, windowPositionY, frameX, frameY)

            frameX = TOP_LEFT_FRAME_X
            if (i >= 1 && i < TOTAL_SPRITES_X - 1) {
                frameY = TOP_LEFT_FRAME_Y + (this.height + this.offset)
            } else {
                frameY = TOP_LEFT_FRAME_Y + (this.height + this.offset) * 2
            }
            windowPositionX = INITIAL_POSITION_X
            windowPositionY = INITIAL_POSITION_Y + (this.height * 2 - this.offset) * i
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