class MainMenu {
    constructor(imageMainMenu, world) {
        this.image = imageMainMenu
        this.scale = 2
        this.width = 16
        this.height = 16
        this.offset = 2
        this.world = world
        this.createEntity()
    }

    createEntity() {
        const TOTAL_SPRITES_X = 6
        const TOTAL_SPRITES_Y = 6
        const TOP_LEFT_FRAME_X = 54
        const TOP_LEFT_FRAME_Y = 234
        const INITIAL_POSITION_X = width / 2 - 100
        const INITIAL_POSITION_Y = height / 2 - 100

        let windowPositionX = INITIAL_POSITION_X
        let windowPositionY = INITIAL_POSITION_Y
        let frameX = TOP_LEFT_FRAME_X
        let frameY = TOP_LEFT_FRAME_Y

        // Top window
        for (let i = 0; i <= TOTAL_SPRITES_X; i++) {
            // if (i > 0 && i < TOTAL_SPRITES_X - 1) {
            //     frameX = TOP_LEFT_FRAME_X + (this.width + this.offset)
            // } else if (i === TOTAL_SPRITES_X - 1) {
            //     frameX = TOP_LEFT_FRAME_X + (this.width + this.offset) * 2
            // }
            this.drawSprite(windowPositionX, windowPositionY, frameX, frameY)
            frameX = TOP_LEFT_FRAME_X + (this.width + this.offset) * i
            
            for (let j = 0; j < TOTAL_SPRITES_Y - 1; j++) {
                windowPositionX += this.width * this.scale - 2    
                this.drawSprite(windowPositionX, windowPositionY, frameX, frameY)
            }

            this.drawSprite(windowPositionX, windowPositionY, frameX, frameY)

            frameY = TOP_LEFT_FRAME_Y + (this.width + this.offset) * i
            windowPositionX = INITIAL_POSITION_X
            windowPositionY = INITIAL_POSITION_Y 
        }
    }

    drawSprite(x, y, frameX, frameY) {
        this.world.createEntity()
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