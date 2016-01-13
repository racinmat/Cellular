/// <reference path="references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FloodTactics;
(function (FloodTactics) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 898, 908, Phaser.AUTO, 'content', null);
            this.muted = false;
            this.score = 0;
            this.state.add('Boot', FloodTactics.Boot, false);
            this.state.add('Preloader', FloodTactics.Preloader, false);
            this.state.add('Menu', FloodTactics.Menu, false);
            this.state.add('Level', FloodTactics.Level, false);
            this.state.add('TutorialLevel', FloodTactics.TutorialLevel, false);
            this.state.add('Credits', FloodTactics.Credits, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    FloodTactics.Game = Game;
})(FloodTactics || (FloodTactics = {}));
window.onload = function () {
    game = new FloodTactics.Game();
};
//# sourceMappingURL=Game.js.map