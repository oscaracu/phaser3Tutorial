class Play extends Phaser.Scene {
    constructor() {
        super('playGame');
    }

    preload() {
        this.load.image("background", "Space_BG.png");
        this.load.spritesheet("player", "Player/Player_ship.png", { frameWidth: 16 });
        this.load.spritesheet("boosters", "Player/Boosters.png", { frameWidth: 16 });
        this.load.image("beam", "Projectiles/Player_beam.png");
        this.load.image("alan", "Enemies/Alan.png");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setScale(1);
        this.background.setOrigin(0);
        this.boost = this.physics.add.sprite(config.width/2, 557, 'boosters').setScale(2.5).setVisible(false);
        this.player0 = this.physics.add.sprite(config.width / 2, 520, "player", 1).setScale(2.5);
        this.player0.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'left',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'right',
            frames: [{ key: 'player', frame: 2 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'boostAnim',
            frames: ('boosters'),
            frameRate: 10,
            repeat: -1,
        });

        this.boost.play('boostAnim');




    }

    update() {
        this.background.tilePositionY -= 1;
        this.movePlayerManager();

        if (this.boost.y > config.height) {
            this.boost.y = this.player0.y+38;
        };

        if (this.boost.y < 58) {
            this.boost.y = this.player0.y+38;
        }

        if (this.boost.x < 20) {
            this.boost.x = this.player0.x;
        }

        if (this.boost.x > config.width-20) {
            this.boost.x = this.player0.x;
        }

    }

    movePlayerManager() {

        if (this.cursorKeys.left.isDown) {
            this.player0.setVelocityX(-gameSettings.playerSpeed);
            this.boost.setVelocityX(-gameSettings.playerSpeed);
            this.player0.anims.play('left', true);
        } else if (this.cursorKeys.right.isDown) {
            this.player0.setVelocityX(gameSettings.playerSpeed);
            this.boost.setVelocityX(gameSettings.playerSpeed);
            this.player0.anims.play('right', true);
        } else { 
            this.player0.setVelocityX(0); 
            this.player0.anims.play('turn', true);
            this.boost.setVelocityX(0);
        }

        if (this.cursorKeys.up.isDown) {
            this.boost.setVisible(true);
            this.player0.setVelocityY(-gameSettings.playerSpeed);
            this.boost.setVelocityY(-gameSettings.playerSpeed);

        } else if (this.cursorKeys.down.isDown) {
            this.boost.setVisible(false);
            this.player0.setVelocityY(gameSettings.playerSpeed);
            this.boost.setVelocityY(gameSettings.playerSpeed);
        } else { 
            this.boost.setVisible(false);
            this.player0.setVelocityY(0);
            this.boost.setVelocityY(0);
         }

    }


}