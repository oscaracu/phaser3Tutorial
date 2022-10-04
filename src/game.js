var hiScore;

var gameSettings = {
  playerSpeed: 100,
};

var config = {
  type: Phaser.AUTO,
  width: 540,
  height: 720,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [Start, Play, GameOver],
  pixelArt: true,
};

window.onload = function () {
  var game = new Phaser.Game(config);
};
