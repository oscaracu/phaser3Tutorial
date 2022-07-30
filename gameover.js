class GameOver extends Phaser.Scene {
    constructor () {
        super('gameOver');
    }

    preload() {
        this.load.image("background", "Space_BG.png");
        this.load.image("gameoverTitle", "UIobjects/GAME_OVER.png");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 360, 640, "background");
        this.background.setOrigin(0);
        this.title = this.add.image(config.width/2, config.height/2, "gameoverTitle").setScale(2);
    }

}