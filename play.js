class Play extends Phaser.Scene {
    constructor() {
        super('playGame');
    }

    playerStart(){

        
        if (this.player0.y > this.startPos) {
            this.player0.y -= 2;
            if (this.player0.y <= this.startPos) {
                console.log(this.player0.y);
                this.player0.setCollideWorldBounds(true);
                this.startPos = config.height;
                this.player0.body.checkCollision.none = false;
                console.log(this.player0.body.checkCollision.none)
                this.time.removeAllEvents();
            }
        }


    }

    
    shootBeam() {
        var beam = new Beam(this);
        beam.scale = 2.5;
    }

    enemyMoves(enemy) {
        enemy.y += Phaser.Math.Between(1,3);
        if (enemy.y > config.height) {
            this.enemyReset(enemy);
        }
    }

    enemyReset(enemy) {

        enemy.y = Phaser.Math.Between(0, -200);
        enemy.x = Phaser.Math.Between(20, config.width - 20);

    }

    playerHurt(){

        this.player0.play('explode');
        
        this.player0.body.checkCollision.none = true;
        
        this.time.addEvent({
            delay: 2500,
            callback: () => {
                
                this.player0.setAcceleration(0);
                this.player0.setCollideWorldBounds(false);
                this.startPos = config.height - 100;
                this.player0.y = 700;
                this.player0.x = config.width / 2;
                this.player0.play('default');
                
                this.playerStart();

            }
        });


    }

    preload() {
        this.load.spritesheet("background", "Space_BG.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("player", "Player/playerShip.png", { frameWidth: 16, frameHeight: 23 });
        this.load.image("beam", "Projectiles/Player_beam.png");
        this.load.spritesheet("alan", "Enemies/Alan.png", { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("bonbon", "Enemies/Bon_Bon.png", { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("lips", "Enemies/Lips.png", { frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("explosion", "Effects/Explosion.png", { frameWidth: 16, frameHeight: 16 });
    }

    create() {

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 10,
            repeat: 0

        });

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

        this.anims.create({
            key: 'alan1',
            frames: this.anims.generateFrameNumbers('alan', {start: 3, end: 5}),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        this.anims.create({
            key: "bonbon1",
            frames: this.anims.generateFrameNumbers('bonbon'),
            frameRate: 4,
            repeat: -1,
            yoyo: false
        });

        this.anims.create({
            key: "lips1",
            frames: this.anims.generateFrameNumbers('lips'),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        this.startPos = config.height - 100;
        this.alanStartPos = Phaser.Math.Between(20, config.width - 20);
        this.bonbonStartPos = Phaser.Math.Between(20, config.width - 20);
        this.lipsStartPos = Phaser.Math.Between(20, config.width -20);

        this.bgSprite = this.add.sprite(0, 0, "background").setVisible(false).play('bg');
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0);
        this.background.setTilePosition(32, 32);
        this.background.setAlpha(0.30);
        this.player0 = this.physics.add.sprite(config.width / 2, 700, "player", 5).setScale(2.5);
        this.alan0 = this.physics.add.sprite(this.alanStartPos, Phaser.Math.Between(0, -200), "alan").setScale(2.5).play("alan1");
        this.bonbon0 = this.physics.add.sprite(this.bonbonStartPos, Phaser.Math.Between(0, -200), "bonbon").setScale(2.5).play("bonbon1");
        this.lips0 = this.physics.add.sprite(this.lipsStartPos, Phaser.Math.Between(0, -200), "lips").setScale(2.5).play("lips1");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        this.enemies = this.physics.add.group();
        this.enemies.add(this.alan0);
        this.enemies.add(this.bonbon0);
        this.enemies.add(this.lips0);

        this.physics.add.overlap(this.player0, this.enemies, this.playerHurt, null, this);

    }

    update() {

        this.playerStart();

        this.player0.setVelocity(0);

        this.background.setFrame(this.bgSprite.frame.name);

        this.background.tilePositionY -= 1;

        this.enemyMoves(this.alan0, 1);
        this.enemyMoves(this.bonbon0, 1);
        this.enemyMoves(this.lips0, 1);

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