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
            //  Load our actual games assets
            this.load.image('background', 'images/background.jpg');
            this.load.image('yellow', 'images/yellow.png');
            this.load.image('brown', 'images/brown.png');
            this.load.image('red', 'images/red.png');
            this.load.image('blue', 'images/blue.png');
            this.load.image('green', 'images/green.png');
            this.load.image('black', 'images/black.png');
            this.load.image('levelCompleted', 'images/level_completed.jpg');
            this.load.image('button', 'images/button.jpg');
            this.load.image('whiteBackground', 'images/whiteBackground.png');
            this.load.image('whiteBackground300x300', 'images/whiteBackground300x300.png');
            this.load.image('whiteBackground300x360', 'images/whiteBackground300x360.png');
            this.load.bitmapFont('arial', 'fonts/arial.png', 'fonts/arial.xml');
            this.load.bitmapFont('arialBlack', 'fonts/arialBlack.png', 'fonts/arial.xml');
        };
        Preloader.prototype.create = function () {
            this.game.state.start('Menu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    FloodTactics.Preloader = Preloader;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Preloader.js.map