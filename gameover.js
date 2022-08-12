class GameOver extends Phaser.Scene {
    constructor () {
        super('gameOver');
    }

    preload() {
        this.load.image("gameoverTitle", "UIobjects/GAME_OVER.png");
    }

    create() {
        this.title = this.add.image(config.width/2, config.height/2, "gameoverTitle").setScale(2);

        this.time.addEvent({
            delay: 6000,
            callback: () => {

                this.scene.stop('playGame');                    
                this.scene.switch('start');

            }
        });

    }

}