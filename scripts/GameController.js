class GameController {
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
        this.imageHeartHud = loadImage('assets/sprites/hud/hearts_hud.png')
        this.imageNoHeartHud = loadImage('assets/sprites/hud/no_hearts_hud.png')
        this.imageLostHeartsHud = loadImage('assets/sprites/hud/lost_hearts_anim_strip_5.png')
        this.imageCoinHud = loadImage('assets/sprites/hud/coins_hud.png')
        
        this.soundtrack = loadSound('assets/sounds/trilha_jogo.mp3')
        this.jumpSound = loadSound('assets/sounds/sound_jump.mp3')
    }

    onStart() {
        // Create world and register the systems on it
        this.world = new World()
            .registerComponent(BackgroundTag)
            .registerComponent(PlayerTag)
            .registerComponent(EnemyTag)
            .registerComponent(HealthHudTag)
            .registerComponent(Position)
            .registerComponent(Sprite)
            .registerComponent(Velocity)
            .registerComponent(Animable)
            .registerComponent(Collidable)
            .registerComponent(Renderable)
            .registerComponent(PlayerInput)
            .registerComponent(PlayerPhysics)
            .registerComponent(Animation)
            .registerComponent(Score)
            .registerComponent(GameState)
            .registerComponent(Health)
            .registerComponent(Colletable)
            .registerSystem(SpriteRendererSystem)
            .registerSystem(HorizontalMovementSystem)
            .registerSystem(AnimationSystem)
            .registerSystem(PlayerMovementSystem)
            .registerSystem(CollisionSystem)
            .registerSystem(EnemyWaveSystem)
            .registerSystem(ScoreSystem)
            .registerSystem(GUISystem)
            .registerSystem(HealthSystem)
            .registerSystem(ItemSystem)

        this.gameEntity = this.world.createEntity()
            .addComponent(GameState, { isRunning: true })
            .addComponent(Score, { value: 0 })

        this.background = new Background([
            this.imageForestLayer01,
            this.imageForestLayer02,
            this.imageForestLayer03,
            this.imageForestLayer04,
            this.imageForestLayer05],
            this.world)
        this.player = new Character(this.imageCharSprite, this.world)
        this.hearth = new HeartHud(this.imageHeartHud, this.imageNoHeartHud, this.imageLostHeartsHud, this.world)
        this.coin =  new Coin(this.imageCoinHud, this.world)   

        const worm = new WormEnemy(this.imageEnemyWorm, this.world)
        const slime = new SlimeEnemy(this.imageEnemySlime, this.world)
        const mushroom = new MushroomEnemy(this.imageEnemyMushroom, this.world)
        const batBlue = new BatEnemy(this.imageEnemyBats, this.world)
        const batOrange = new BatEnemy(this.imageEnemyBats, this.world, BatEnemyTypes.ORANGE)
        const goblin = new GoblinEnemy(this.imageEnemyGoblin, this.world)

        this.enemies = []
        this.enemies.push(worm)
        this.enemies.push(slime)
        this.enemies.push(mushroom)
        this.enemies.push(batBlue)
        this.enemies.push(batOrange)
        this.enemies.push(goblin)
        this.enemyController = new EnemyController(this.world, this.enemies)

        this.soundtrack.loop()
    }

    onUpdate(delta, time) {
        // Run all the systems
        this.world.execute(delta, time)
    }

    onInput(type, key, keyCode) {
        if (type === 'keyPressed') {
            if (this.gameEntity.getComponent(GameState).gameOver) {
                window.location.reload()
            }
            this.gameEntity.addComponent(PlayerInput, { key, keyCode })
        }
    }
}