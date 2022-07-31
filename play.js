class Play extends Phaser.Scene {
    constructor() {
        super('playGame');
    }

    preload() {
        this.load.image("background", "Space_BG.png");
        this.load.spritesheet("player", "Player/playerShip.png", { frameWidth: 16, frameHeight: 23 });
        this.load.image("beam", "Projectiles/Player_beam.png");
        this.load.image("alan", "Enemies/Alan.png");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setScale(1);
        this.background.setOrigin(0);
        this.player0 = this.physics.add.sprite(config.width / 2, 580, "player", 4).setScale(2.5);
        this.player0.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1] }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [5, 6] }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 3] }),
            frameRate: 20,
            repeat: -1
        });






    }

    update() {

        this.background.tilePositionY -= 1;
        this.movePlayerManager();

    }

    movePlayerManager() {


        if (this.cursorKeys.left.isDown) {

            this.player0.setVelocityX(-gameSettings.playerSpeed);
            this.player0.anims.play('left', true);

        } else if (this.cursorKeys.right.isDown) {

            this.player0.setVelocityX(gameSettings.playerSpeed);
            this.player0.anims.play('right', true);

        } else if (this.cursorKeys.up.isDown) {

            this.player0.setVelocityY(-gameSettings.playerSpeed);
            this.player0.anims.play('up', true);

        } else if (this.cursorKeys.down.isDown) {

            this.player0.setVelocityY(gameSettings.playerSpeed);
            this.player0.anims.play('turn', true);

        } else {

            this.player0.setVelocityX(0);
            this.player0.setVelocityY(0);
            this.player0.anims.play('turn', true);

        }


    }


}