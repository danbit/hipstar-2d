class MainMenu extends WindowUI {
    constructor(imageUI, world) {
        super(world, imageUI, 5, 6)
        this.renderElements()
    }
    
    renderElements(){
        let x = width / 2 - 30        
        let y = width / 2 - 130        
        this.startButton = new Button(this.world, this.image, x, y)

        x -= 25
        y += 5
        this.icon = new Icon(this.world, this.image, x, y, 1)
    }
}
