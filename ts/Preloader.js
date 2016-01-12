/// <reference path="references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FloodTactics;
(function (FloodTactics) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            var _this = this;
            //  Load our actual games assets
            this.load.image('background', 'images/background.png');
            this.load.image('backgroundSquare', 'images/backgroundSquare.png');
            this.load.image('playground', 'images/playground-plain.png');
            this.load.image('violet', 'images/yellow-cell.png');
            this.load.image('black', 'images/brown-cell.png');
            this.load.image('red', 'images/red-cell.png');
            this.load.image('blue', 'images/blue-cell.png');
            this.load.image('green', 'images/green-cell.png');
            this.load.image('empty', 'images/obstacle.png');
            this.load.image('levelCompleted', 'images/level_completed.jpg');
            this.load.image('button', 'images/button.jpg');
            this.load.image('buttonGenerate', 'images/buttonGenerateLevel.png');
            this.load.image('buttonReset', 'images/buttonResetLevel.png');
            this.load.image('buttonMenu', 'images/buttonMenu.png');
            this.load.image('whiteBackground', 'images/whiteBackground.png');
            this.load.image('whiteBackground300x300', 'images/whiteBackground300x300.png');
            this.load.image('whiteBackground300x360', 'images/whiteBackground300x360.png');
            this.load.image('soundSilent', 'images/sound off.png');
            this.load.image('soundLoud', 'images/sound on.png');
            this.load.bitmapFont('arial', 'fonts/arial.png', 'fonts/arial.xml');
            this.load.bitmapFont('arialBlack', 'fonts/arialBlack.png', 'fonts/arial.xml');
            this.load.bitmapFont('sego', 'fonts/segoeprbBlackTransparent.png', 'fonts/segoeprb.xml');
            this.load.audio('backgroundSound', 'audio/rain_song.mp3');
            this.load.audio('bubbling', 'audio/bubbling2.wav');
            this.load.image('rules', 'images/rules.png');
            this.load.image('notebook', 'images/notebook2.png');
            this.load.image('nextButton', 'images/NEXT-02.png');
            this.load.image('menuBackground', 'images/MENU-01.png');
            this.load.image('credits', 'images/credits.png');
            this.load.image('level1', 'images/level 1.png');
            this.load.image('level2', 'images/level 2.png');
            this.load.image('tutorial', 'images/tutorial.png');
            var directions = new Map();
            directions.set('left', 'doleva');
            directions.set('right', 'doprava');
            directions.set('up', 'nahoru');
            directions.set('down', 'dolu');
            var colors = ['black', 'red', 'blue', 'green', 'violet'];
            directions.forEach(function (value, key) {
                for (var _i = 0; _i < colors.length; _i++) {
                    var color = colors[_i];
                    _this.load.spritesheet(color + '-' + key, 'animations/' + color + '/' + value + '-startCell.png', 267, 267);
                    //this.load.spritesheet(color + '-' + key + '-t', 'animations/' + color + '/' + value + '-targetCell.png', 267, 267);
                    //this.load.spritesheet(color + '-' + key + '-part1', 'animations/' + color + '/' + value + '-startCell-part1.png', 267, 267);
                    _this.load.spritesheet(color + '-' + key + '-part1-t', 'animations/' + color + '/' + value + '-targetCell-part1.png', 267, 267);
                    //this.load.spritesheet(color + '-' + key + '-part2', 'animations/' + color + '/' + value + '-startCell-part2.png', 267, 267);
                    _this.load.spritesheet(color + '-' + key + '-part2-t', 'animations/' + color + '/' + value + '-targetCell-part2.png', 267, 267);
                }
            });
        };
        Preloader.prototype.create = function () {
            this.game.state.start('Menu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    FloodTactics.Preloader = Preloader;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Preloader.js.map