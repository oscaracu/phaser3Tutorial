class Start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  preload() {
    this.load.spritesheet("background", "Space_BG.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("bg3", "Space_Background_4.png");
    this.load.audio("menu", "menu.wav");
    this.load.spritesheet("spaceShip", "Player/playerShip.png", {
      frameWidth: 16,
      frameHeight: 23,
    });
    this.load.audio("startFX", "start-level.wav");
  }

  create() {
    this.anims.create({
      key: "shipAnim",
      frames: this.anims.generateFrameNumbers("spaceShip", {
        start: 3,
        end: 5,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "bg",
      frames: this.anims.generateFrameNumbers("background"),
      frameRate: 2,
      repeat: -1,
      yoyo: true,
    });

    if (hiScore === undefined) {
      hiScore = 5000;
    }
    this.hiScore = hiScore;

    this.bgMusic = this.sound.add("menu");
    this.startFX = this.sound.add("startFX");

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
    this.spaceShip = this.add
      .sprite(config.width / 2, 200, "spaceShip")
      .setScale(2.5)
      .play("shipAnim");

    this.hiScoreLabel = this.add.text(config.width - 108, 5, "HI-SCORE", {
      fontFamily: '"Press Start 2P"',
      fontSize: 12,
      color: "red",
    });
    this.hiScoreCounter = this.add.text(config.width - 110, 24, this.hiScore, {
      fontFamily: '"Press Start 2P"',
      fontSize: 14,
      color: "white",
    });
    this.add
      .text(config.width / 2 - 80, 240, "Space", {
        fontFamily: '"Press Start 2P"',
        fontSize: 32,
        color: "red",
      })
      .setStroke("#fff", 16);
    this.add
      .text(config.width / 2 - 56, 280, "Hero", {
        fontFamily: '"Press Start 2P"',
        fontSize: 32,
        color: "beige",
      })
      .setStroke("red", 16);
    let playLabel = this.add.text(
      config.width / 2 - 114,
      380,
      "Press ENTER to PLAY",
      { fontFamily: '"Press Start 2P"', fontSize: 12, color: "green" }
    );
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.useKeys1 = this.add.text(
      config.width / 2 - 94,
      config.height - 200,
      "Use ←↑→ to move",
      { fontFamily: '"Press Start 2P"', fontSize: 12, color: "yellow" }
    );

    this.useKeys2 = this.add.text(
      config.width / 2 - 123,
      config.height - 180,
      "Use SPACEBAR to shot",
      { fontFamily: '"Press Start 2P"', fontSize: 12, color: "yellow" }
    );

    this.tweens.add({
      targets: playLabel,
      alpha: 0,
      ease: "linear",
      duration: 750,
      repeat: -1,
      yoyo: true,
    });
  }

  update() {
    this.background.setFrame(this.bgSprite.frame.name);

    this.background.tilePositionY -= 1;
    this.bg3.tilePositionY -= 0.5;

    if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
      this.tweens.add({
        targets: this.bgMusic,
        volume: 0,
        ease: "Linear",
        duration: 1000,
      });

      this.startFX.play();

      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.scene.switch("playGame");
        },
      });
    }
  }
}
