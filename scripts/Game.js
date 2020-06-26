class Game {

    onCreate() {
        this.imageForestLayer01 = loadImage('assets/sprites/background/forest/Forest_Layer_01.png');
        this.imageForestLayer02 = loadImage('assets/sprites/background/forest/Forest_Layer_02.png');
        this.imageForestLayer03 = loadImage('assets/sprites/background/forest/Forest_Layer_03.png');
        this.imageForestLayer04 = loadImage('assets/sprites/background/forest/Forest_Layer_04.png');
        this.imageForestLayer05 = loadImage('assets/sprites/background/forest/Forest_Layer_05.png');
        this.imageCharIdle = loadImage('assets/sprites/character/herochar_idle_anim_strip_4.png');
        this.imageCharRunning = loadImage('assets/sprites/character/herochar_run_anim_strip_6.png');
        this.imageCharSpriteSheet = loadImage('assets/sprites/character/herochar_spritesheet.png');
        this.enemyImage = loadImage('assets/sprites/enemies/gotinha.png');
        this.soundtrack = loadSound('assets/sounds/trilha_jogo.mp3');
        this.jumpSound = loadSound('assets/sounds/somPulo.mp3');
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

        this.background = new Background([this.imageForestLayer01, this.imageForestLayer02, this.imageForestLayer03,
        this.imageForestLayer04, this.imageForestLayer05], this.world)

        this.player = new Character(this.imageCharSpriteSheet, this.world)
        createAllEntities(this);
        this.soundtrack.loop();
    }

    onUpdate() {
        // Run all the systems
        this.world.execute(deltaTime);
    }

    onInput(type, key) {
        if (type === 'keyPressed') {
            if (isGameOver) {
                window.location.reload();
            }
            this.world.createEntity().addComponent(PlayerInput, { key })
        }
    }
}