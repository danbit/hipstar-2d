class Game {
    onCreate() {
        this.imageForestLayer01 = loadImage('assets/sprites/background/forest/Forest_Layer_01.png')
        this.imageForestLayer02 = loadImage('assets/sprites/background/forest/Forest_Layer_02.png')
        this.imageForestLayer03 = loadImage('assets/sprites/background/forest/Forest_Layer_03.png')
        this.imageForestLayer04 = loadImage('assets/sprites/background/forest/Forest_Layer_04.png')
        this.imageForestLayer05 = loadImage('assets/sprites/background/forest/Forest_Layer_05.png')
        this.imageCharSprite = loadImage('assets/sprites/character/herochar_spritesheet.png')
        this.imageEnemyWorm = loadImage('assets/sprites/enemies/worm_spritesheet.png')
        this.imageEnemySlime = loadImage('assets/sprites/enemies/slime_spritesheet.png')
        this.imageEnemyMushroom = loadImage('assets/sprites/enemies/mushroom_spritesheet.png')
        this.imageEnemyGoblin = loadImage('assets/sprites/enemies/goblin_spritesheet.png')
        this.imageEnemyBats = loadImage('assets/sprites/enemies/bat_fly_spritesheet.png')
        this.soundtrack = loadSound('assets/sounds/trilha_jogo.mp3')
        this.jumpSound = loadSound('assets/sounds/sound_jump.mp3')
    }

    onStart() {
        // Create world and register the systems on it
        this.world = new World()
            .registerComponent(BackgroundTag)
            .registerComponent(PlayerTag)
            .registerComponent(EnemyTag)
            .registerComponent(Position)
            .registerComponent(Sprite)
            .registerComponent(Velocity)
            .registerComponent(Animable)
            .registerComponent(Renderable)
            .registerComponent(PlayerInput)
            .registerComponent(PlayerPhysics)
            .registerComponent(Animation)
            .registerSystem(SpriteRendererSystem)
            .registerSystem(HorizontalMovementSystem)
            .registerSystem(AnimationSystem)
            .registerSystem(PlayerMovementSystem)
            .registerSystem(CollisionSystem)

        this.background = new Background([
            this.imageForestLayer01,
            this.imageForestLayer02,
            this.imageForestLayer03,
            this.imageForestLayer04,
            this.imageForestLayer05],
            this.world)
        this.player = new Character(this.imageCharSprite, this.world)
        this.worm = new WormEnemy(this.imageEnemyWorm, this.world)
        this.slime = new SlimeEnemy(this.imageEnemySlime, this.world)
        this.mushroom = new MushroomEnemy(this.imageEnemyMushroom, this.world)
        this.goblin = new GoblinEnemy(this.imageEnemyGoblin, this.world)
        this.batBlue = new BatEnemy(this.imageEnemyBats, this.world)
        this.soundtrack.loop()
    }

    onUpdate() {
        // Run all the systems
        this.world.execute(deltaTime)
    }

    onInput(type, key) {
        if (type === 'keyPressed') {
            if (isGameOver) {
                window.location.reload()
            }
            this.world.createEntity().addComponent(PlayerInput, { key })
        }
    }
}