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
        this.boosters = this.physics.add.sprite(config.width/2, 557, "boosters").setScale(2.5);
        this.player = this.physics.add.sprite(config.width / 2, 520, "player", 1).setScale(2.5);
        this.player.setCollideWorldBounds(true);
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

        this.anims.create(
            {
                key: 'boostAnim',
                frames: this.anims.generateFrameNumbers("boosters"),
                frameRate: 20,
                repeat: -1,
            }
        );


    }

    update() {
        this.background.tilePositionY -= 1;
        this.movePlayerManager();
    }

    movePlayerManager() {

        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.anims.play('left', true);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play('right', true);
        } else { 
            this.player.setVelocityX(0); 
            this.player.anims.play('turn', true);
        }

        if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        } else { this.player.setVelocityY(0); }
    }
}