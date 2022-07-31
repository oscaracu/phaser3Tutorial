var gameSettings = {
    playerSpeed: 100,
};

var config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Play, GameOver],
    pixelArt: true
};


window.onload = function () {
    var game = new Phaser.Game(config);
};