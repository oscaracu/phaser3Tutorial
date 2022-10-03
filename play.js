class Play extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  playerStart() {
    if (this.player0.y > this.startPos) {
      this.player0.y -= 2;
      if (this.player0.y <= this.startPos) {
        this.player0.setCollideWorldBounds(true);
        this.startPos = config.height;
        this.player0.body.checkCollision.none = false;
        this.time.removeAllEvents();
        this.playerActive = true;
        this.player0.body.moves = true;
        this.powerBarScore = 48;
      }
    }
  }

  shootBeam() {
    var beam = new Beam(this);
    beam.scale = 2.5;
    this.laserSound.play();
  }

  enemyMoves(enemy) {
    enemy.y += Phaser.Math.Between(this.enemyMinSpeed, this.enemyMaxSpeed);
    if (enemy.y > config.height && this.enemiesActive && this.playerActive) {
      this.powerBarScore -= 4;
      this.powerBarFull.setCrop(0, 0, this.powerBarScore, 16);

      if (this.powerBarScore === 0) {
        this.playerHurt();
      }

      this.enemyReset(enemy);
    }
  }

  enemyReset(enemy) {
    enemy.y = Phaser.Math.Between(0, -200);
    enemy.x = Phaser.Math.Between(20, config.width - 20);
    this.enemiesActive = true;
  }

  playerHurt() {
    hiScore = this.hiScore;

    this.playerLives--;

    this.playerActive = false;

    this.player0.play("explode");
    this.explosionSound.play({ volume: 3 });

    this.player0.body.checkCollision.none = true;

    let liveOut = Phaser.Utils.Array.RemoveAt(
      this.livesIcons,
      this.livesUI.getLength() - 1
    );

    if (liveOut) {
      liveOut.destroy();
    }

    if (this.playerLives === 0) {
      this.musicFadeOut();
      this.gameoverFX.play();
      this.player0.body.checkCollision.none = true;
    }

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        if (this.playerLives === 0) {
          this.scene.launch("gameOver");
          return;
        }

        this.player0.setAcceleration(0);
        this.player0.setCollideWorldBounds(false);
        this.startPos = config.height - 100;
        this.player0.y = 700;
        this.player0.x = config.width / 2;
        this.player0.play("default");

        this.playerStart();
      },
    });
  }

  musicFadeOut() {
    this.tweens.add({
      targets: this.bgMusic,
      volume: 0,
      ease: "Linear",
      duration: 3000,
    });
  }

  enemyDies(projectile, enemy) {
    this.enemiesActive = false;

    if (this.score % 2500 === 0 && this.score !== 0) {
      this.time.addEvent({
        delay: 5000,
        callback: () => {
          this.enemyMaxSpeed += 0.5;
          this.enemyMinSpeed += 0.5;
        },
      });
    }

    projectile.destroy();
    this.score += 100;
    this.player1Score.text = this.score;

    if (this.score >= this.hiScore) {
      this.hiScore = this.score;
      this.hiScoreCounter.text = this.hiScore;
    }

    let enemyAnim = enemy.anims.getName();
    enemy.setVelocity(0);
    enemy.setAcceleration(0);
    enemy.play("explode");
    this.explosionSound.play({ volume: 2 });
    enemy.body.checkCollision.none = true;

    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.enemyReset(enemy);
        enemy.play(enemyAnim);
        enemy.body.checkCollision.none = false;
      },
    });
  }

  preload() {
    this.load.spritesheet("background", "Space_BG.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("player", "Player/playerShip.png", {
      frameWidth: 16,
      frameHeight: 23,
    });
    this.load.image("beam", "Projectiles/Player_beam.png");
    this.load.spritesheet("alan", "Enemies/Alan.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("bonbon", "Enemies/Bon_Bon.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("lips", "Enemies/Lips.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("explosion", "Effects/Explosion.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("lives", "UIobjects/Player_life_icon.png");
    this.load.audio("bgMusic", "Race_to_Mars.mp3");
    this.load.audio("laserFX", "LASRGun_Classic Blaster A Fire_03.wav");
    this.load.audio("explosionFX", "EXPLDsgn_Explosion Impact_14.wav");
    this.load.image("bg3", "Space_Background_4.png");
    this.load.audio("gameoverFX", "scream.wav");
    this.load.spritesheet("powerBar", "UIobjects/powerBars.png", {
      frameWidth: 32,
      frameHeight: 16,
    });
  }

  create() {
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "default",
      frames: this.anims.generateFrameNumbers("player", { frames: [5] }),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: "forward",
      frames: this.anims.generateFrameNumbers("player", { frames: [3, 4, 5] }),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { frames: [1, 2, 0] }),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { frames: [6, 7, 8] }),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: "bg",
      frames: this.anims.generateFrameNumbers("background"),
      frameRate: 2,
      repeat: -1,
      yoyo: true,
    });

    this.anims.create({
      key: "alan1",
      frames: this.anims.generateFrameNumbers("alan", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });

    this.anims.create({
      key: "bonbon1",
      frames: this.anims.generateFrameNumbers("bonbon"),
      frameRate: 4,
      repeat: -1,
      yoyo: false,
    });

    this.anims.create({
      key: "lips1",
      frames: this.anims.generateFrameNumbers("lips"),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });

    this.hiScore = hiScore;
    this.powerBarScore = 32;
    this.enemyMinSpeed = 1;
    this.enemyMaxSpeed = 3;
    this.score = 0;
    this.playerLives = 3;
    this.startPos = config.height - 100;
    this.alanStartPos = Phaser.Math.Between(20, config.width - 20);
    this.bonbonStartPos = Phaser.Math.Between(20, config.width - 20);
    this.lipsStartPos = Phaser.Math.Between(20, config.width - 20);
    this.playerActive = true;
    this.enemiesActive = true;

    this.bgMusic = this.sound.add("bgMusic");
    this.gameoverFX = this.sound.add("gameoverFX");

    var bgMusicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };

    this.bgMusic.play(bgMusicConfig);
    this.laserSound = this.sound.add("laserFX");
    this.explosionSound = this.sound.add("explosionFX");

    this.bg3 = this.add.tileSprite(
      config.width / 2,
      80,
      config.width,
      1280,
      "bg3"
    );
    this.bg3.setAlpha(0.6);
    this.bgSprite = this.add
      .sprite(0, 0, "background")
      .setVisible(false)
      .play("bg");
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
    this.background.setOrigin(0);
    this.background.setTilePosition(32, 32);
    this.background.setAlpha(0.3);
    this.player0 = this.physics.add
      .sprite(config.width / 2, 700, "player", 5)
      .setScale(2.5);
    this.alan0 = this.physics.add
      .sprite(this.alanStartPos, Phaser.Math.Between(0, -200), "alan")
      .setScale(2.5)
      .play("alan1");
    this.bonbon0 = this.physics.add
      .sprite(this.bonbonStartPos, Phaser.Math.Between(0, -200), "bonbon")
      .setScale(2.5)
      .play("bonbon1");
    this.lips0 = this.physics.add
      .sprite(this.lipsStartPos, Phaser.Math.Between(0, -200), "lips")
      .setScale(2.5)
      .play("lips1");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.projectiles = this.add.group();

    this.enemies = this.physics.add.group();
    this.enemies.add(this.alan0);
    this.enemies.add(this.bonbon0);
    this.enemies.add(this.lips0);

    this.add.text(10, 10, "PLAYER 1", {
      fontFamily: '"Press Start 2P"',
      fontSize: 12,
      color: "red",
    });
    this.player1Score = this.add.text(10, 26, "0", {
      fontFamily: '"Press Start 2P"',
      fontSize: 12,
    });
    this.livesUI = this.add
      .group({
        key: "lives",
        frame: 0,
        repeat: this.playerLives - 1,
        setXY: { x: 15, y: 55, stepX: 25 },
      })
      .scaleXY(1);
    this.livesIcons = this.livesUI.getChildren();
    this.powerBarEmpty = this.add
      .sprite(config.width - 50, config.height - 40, "powerBar", 1)
      .setScale(2.5);
    this.powerBarFull = this.add
      .sprite(config.width - 50, config.height - 40, "powerBar", 0)
      .setScale(2.5)
      .setCrop(0, 0, 32, 16);
    this.hiScoreLabel = this.add.text(config.width - 108, 5, "HI-SCORE", {
      fontFamily: '"Press Start 2P"',
      fontSize: 12,
      color: "red",
    });
    this.hiScoreCounter = this.add.text(config.width - 110, 24, hiScore, {
      fontFamily: '"Press Start 2P"',
      fontSize: 14,
      color: "white",
    });

    this.physics.add.overlap(
      this.player0,
      this.enemies,
      this.playerHurt,
      null,
      this
    );
    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.enemyDies,
      null,
      this
    );
  }

  update() {
    this.playerStart();

    this.player0.setVelocity(0);

    this.background.setFrame(this.bgSprite.frame.name);

    this.background.tilePositionY -= 1;
    this.bg3.tilePositionY -= 0.5;

    this.enemyMoves(this.alan0);
    this.enemyMoves(this.bonbon0);
    this.enemyMoves(this.lips0);

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.playerActive === true) {
        this.shootBeam();
      }
    }

    if (this.cursorKeys.left.isDown) {
      if (this.playerActive === true) {
        this.player0.anims
          .play("left", true)
          .setAccelerationX(-2000)
          .setVelocityX(-gameSettings.playerSpeed);
      } else {
        this.player0.setAcceleration(0);
        this.player0.setVelocity(0);
      }
    } else if (this.cursorKeys.right.isDown) {
      if (this.playerActive === true) {
        this.player0.anims
          .play("right", true)
          .setAccelerationX(2000)
          .setVelocityX(gameSettings.playerSpeed);
      } else {
        this.player0.setAcceleration(0);
        this.player0.setVelocity(0);
      }
    }

    if (this.cursorKeys.up.isDown) {
      if (this.playerActive === true) {
        this.player0.anims
          .play("forward", true)
          .setAccelerationY(-5000)
          .setVelocityY(-gameSettings.playerSpeed);
        this.background.tilePositionY -= 2;
        this.bg3.tilePositionY -= 2;
      } else {
        this.player0.setAcceleration(0);
        this.player0.setVelocity(0);
      }
    } else if (this.cursorKeys.down.isDown) {
      if (this.playerActive === true) {
        this.player0.anims
          .play("default", true)
          .setAcceleration(0, 2500)
          .setVelocityY(gameSettings.playerSpeed / 4);
      } else {
        this.player0.setAcceleration(0);
        this.player0.setVelocity(0);
      }
    }

    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }
}
