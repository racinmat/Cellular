/// <reference path="references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FloodTactics;
(function (FloodTactics) {
    var AbstractLevel = (function (_super) {
        __extends(AbstractLevel, _super);
        function AbstractLevel() {
            _super.apply(this, arguments);
        }
        AbstractLevel.prototype.init = function (levelName) {
            this.winChecker = new FloodTactics.OneColorWinChecker(FloodTactics.Color.Violet);
            var playground = this.game.add.sprite(0, 0, 'playground');
            playground.scale.set(0.25);
            this.grid = new FloodTactics.Grid(this.game, 204, 47, 'backgroundSquare', this);
            if (levelName != undefined) {
                this.grid.deserialize(games[levelName]);
            }
            this.grid.initialize();
        };
        AbstractLevel.prototype.create = function () {
            var _this = this;
            this.game.sound.mute = this.game.muted;
            this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }; //zablokování vyskočení menu u kliknutí pravým tlačítkem
            //zde se nastavuje vítězná podmínka
            this.winningTween = null;
            var menuButton = this.game.add.button(82, 546, 'buttonMenu', function () { _this.game.state.start('Menu', true, false); }, this);
            menuButton.scale.set(0.25);
            var resetButton = this.game.add.button(82, 612, 'buttonReset', function () { _this.grid.restartLevel(); }, this);
            resetButton.scale.set(0.25);
            var generateButton = this.game.add.button(82, 678, 'buttonGenerate', function () { _this.game.state.start('Level'); }, this);
            generateButton.scale.set(0.25);
            //var backgroundSound : Phaser.Sound = this.game.add.audio('backgroundSound');
            backgroundSound.play();
            var changeIcon = function () {
                //console.log('sound clicked');
                if (_this.game.muted) {
                    _this.soundIcon.key = 'soundLoud';
                }
                else {
                    _this.soundIcon.key = 'soundSilent';
                }
                _this.game.muted = !_this.game.muted;
                _this.game.sound.mute = _this.game.muted;
                _this.soundIcon.loadTexture(_this.soundIcon.key);
            };
            this.soundIcon = this.game.add.button(82, 744, this.game.muted ? 'soundSilent' : 'soundLoud', changeIcon, this);
            //this.soundIcon.anchor.set(0.5);
            this.soundIcon.scale.set(0.25);
            var notebook = this.game.add.sprite(582, 476, 'notebook');
            notebook.scale.set(0.25);
        };
        AbstractLevel.prototype.update = function () {
            var _this = this;
            if (this.winChecker.checkWin(this.grid)) {
                if (this.winningTween === null) {
                    this.game.score++;
                    var popup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'levelCompleted');
                    popup.anchor.setTo(0.5);
                    popup.scale.set(0.05);
                    this.winningTween = this.game.add.tween(popup.scale);
                    this.winningTween.to({ x: 0.3, y: 0.3 }, 2000, Phaser.Easing.Elastic.Out, true);
                    this.winningTween.onComplete.add(function () { _this.game.state.start('Level'); });
                }
            }
        };
        return AbstractLevel;
    })(Phaser.State);
    FloodTactics.AbstractLevel = AbstractLevel;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=AbstractLevel.js.map