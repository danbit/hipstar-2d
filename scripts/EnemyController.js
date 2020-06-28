class EnemyController {
    constructor(world, enemies) {
        this.world = world
        this.enemies = enemies
        this.initWave()
    }

    initWave() {
        const enemy = this.randomEnemy()
        console.log('enemy', enemy)
        enemy.entity.addComponent(Renderable)
        enemy.entity.getComponent(Velocity).x = this.randomSpeedX(enemy)

        console.log('enemy.entity.getComponent(Velocity).x', enemy.entity.getComponent(Velocity).x)
    }

    randomEnemy() {
        return this.enemies[Math.floor(random(0, this.enemies.length))];
    }

    randomSpeedX(enemy){
        return math.random(enemy.minSpeedX, enemy.maxSpeedX)
    }

}