class SpriteRender {
    constructor(image, sourceRectangle, destinationRectangle) {
        this.image = image;
        this.sourceRectangle = sourceRectangle;
        this.destinationRectangle = destinationRectangle;
    }

    render() {
        image(
            this.image,
            this.sourceRectangle.vector2D.x,
            this.sourceRectangle.vector2D.y,
            this.sourceRectangle.width,
            this.sourceRectangle.height
        )

        if (this.destinationVector2D && this.destinationRectangle) {
            image(
                this.image,
                this.destinationRectangle.vector2D.x,
                this.destinationRectangle.vector2D.y,
                this.destinationRectangle.width,
                this.destinationRectangle.height,
                this.sourceRectangle.vector2D.x,
                this.sourceRectangle.vector2D.y,
                this.sourceRectangle.width,
                this.sourceRectangle.height
            )
        }
    }
}
