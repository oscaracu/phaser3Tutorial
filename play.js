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

        this.anims.create({
            key: 'default',
            frames: this.anims.generateFrameNumbers('player', { frames: [5, 4, 3] }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 2, 0] }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [6, 7, 8] }),
            frameRate: 20,
            repeat: 0
        });

        this.player0 = this.physics.add.sprite(config.width / 2, 580, "player", 5).setScale(2.5);
        this.player0.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();


    }

    update() {

        this.background.tilePositionY -= 1;

        if (this.cursorKeys.left.isDown) {
    
            this.player0.anims.play('left', true).setVelocityX(-gameSettings.playerSpeed);
            
        } else if (this.cursorKeys.right.isDown) {
    
            this.player0.anims.play('right', true).setVelocityX(gameSettings.playerSpeed);
    
        } else {this.player0.anims.play('default', true).setVelocity(0);}
    
        if (this.cursorKeys.up.isDown) {
    
            this.player0.setVelocityY(-gameSettings.playerSpeed);
    
        } else if (this.cursorKeys.down.isDown) {
    
            this.player0.setVelocityY(gameSettings.playerSpeed);
    
        }
    }



    


}