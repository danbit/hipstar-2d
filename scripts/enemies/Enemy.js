class Enemy {
    constructor(world) {
        this.entity = this.createEntity(world)
    }

    createEntity(world) {
        return world.createEntity()
            .addComponent(EnemyTag)
            .addComponent(Renderable)
            .addComponent(Animable)
    }
}