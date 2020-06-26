const createAllEntities = (game) => {
    const world = game.world;
    const characterMatrix = buildMatrix(4, 4, 220, 270)
    const jumpVariation = 40
    const initialPositionY = height - 135

    playerEntity = world.createEntity()
        .addComponent(Player)
        .addComponent(Renderable)
        .addComponent(Animable)
        .addComponent(Position, { x: 0, y: initialPositionY })
        .addComponent(PlayerPhysics, { 
            initialPositionY, 
            jumpSpeed: 0, 
            jumpAmount: 2, 
            jumpVariation, 
            gravity: 3 
        })
        .addComponent(Sprite, {
            image: game.characterImage,
            width: 110,
            height: 135,
            imageWidth: 220,
            imageHeight: 270,
            matrix: characterMatrix,
            frame: 0,
            collisionOffset: 0.7
        })

    const slimeMatrix = buildMatrix(7, 4, 104, 104)
    const slimeSpeed = 8;
    world.createEntity()
        .addComponent(Enemy)
        .addComponent(Renderable)
        .addComponent(Animable)
        .addComponent(Position, { x: width - 52, y: height - 52 })
        .addComponent(Velocity, { x: slimeSpeed, y: 0 })
        .addComponent(Sprite, {
            image: game.enemyImage,
            width: 52,
            height: 52,
            imageWidth: 104,
            imageHeight: 104,
            matrix: slimeMatrix,
            frame: 0,
            collisionOffset: 0.7
        })
}
