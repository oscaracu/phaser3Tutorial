class Play extends Phaser.Scene {
    constructor() {
        super('playGame');
    }

    
    shootBeam() {
        var beam = new Beam(this);
        beam.scale = 2.5;
    }

    preload() {
        this.load.spritesheet("background", "Space_BG.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("player", "Player/playerShip.png", { frameWidth: 16, frameHeight: 23 });
        this.load.image("beam", "Projectiles/Player_beam.png");
        this.load.image("alan", "Enemies/Alan.png");
    }

    create() {

        this.anims.create({
            key: 'default',
            frames: this.anims.generateFrameNumbers('player', { frames: [5] }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'forward',
            frames: this.anims.generateFrameNumbers('player', { frames: [3, 4, 5] }),
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

        this.anims.create({
            key: 'bg',
            frames: this.anims.generateFrameNumbers('background'),
            frameRate: 2,
            repeat: -1,
            yoyo: true
        });

        this.bgSprite = this.add.sprite(0, 0, "background").setVisible(false).play('bg');
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0);
        this.background.setTilePosition(32, 32);
        this.background.setAlpha(0.30);
        this.player0 = this.physics.add.sprite(config.width / 2, 580, "player", 5).setScale(2.5);
        this.player0.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();


    }

    update() {

        this.player0.setVelocity(0);

        this.background.setFrame(this.bgSprite.frame.name);

        this.background.tilePositionY -= 1;

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootBeam();
        }

        if (this.cursorKeys.left.isDown) {
            
            this.player0.anims.play('left', true).setAccelerationX(-2000).setVelocityX(-gameSettings.playerSpeed);
            
        } else if (this.cursorKeys.right.isDown) {
    
            this.player0.anims.play('right', true).setAccelerationX(2000).setVelocityX(gameSettings.playerSpeed);
    
        } 
    
        if (this.cursorKeys.up.isDown) {
    
            this.player0.anims.play('forward', true).setAccelerationY(-5000).setVelocityY(-gameSettings.playerSpeed);
            this.background.tilePositionY -= 2;
    
        } else if (this.cursorKeys.down.isDown) {
    
            this.player0.anims.play('default', true).setAcceleration(0, 2500).setVelocityY(gameSettings.playerSpeed/4);
    
        }
        
        for (var i = 0; i < this.projectiles.getChildren().length; i++) {

            var beam = this.projectiles.getChildren()[i];
            beam.update();

        }

    }



    


}