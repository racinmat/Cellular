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
        AbstractLevel.prototype.create = function () {
            var _this = this;
            this.muted = false;
            this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }; //zablokování vyskočení menu u kliknutí pravým tlačítkem
            //zde se nastavuje vítězná podmínka
            this.winChecker = new FloodTactics.OneColorWinChecker(FloodTactics.Color.Blue);
            //this.winChecker = new CountNeighborsWinChecker();
            this.winningTween = null;
            this.winningDescription = this.game.add.bitmapText(400, 420, 'arialBlack', "Winning condition: " + this.winChecker.getDescription(), 32);
            this.winningDescription.maxWidth = 700; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            this.winningDescription.anchor.set(0.5);
            var button = this.game.add.button(180, 480, 'button', function () { _this.grid.restartLevel(); }, this);
            button.scale.set(0.2);
            button.anchor.set(0.5);
            var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
            var buttonText = this.game.add.text(0, 0, "Reset level", style);
            button.addChild(buttonText);
            buttonText.scale.set(5);
            buttonText.anchor.set(0.5);
            button = this.game.add.button(180, 560, 'button', function () { _this.game.state.start('Menu', true, false); }, this);
            button.scale.set(0.2);
            button.anchor.set(0.5);
            var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
            buttonText = this.game.add.text(0, 0, "Menu", style);
            button.addChild(buttonText);
            buttonText.scale.set(5);
            buttonText.anchor.set(0.5);
            var backgroundSound = this.game.add.audio('backgroundSound');
            backgroundSound.play();
            var changeIcon = function () {
                //console.log('sound clicked');
                if (_this.muted) {
                    _this.soundIcon.key = 'soundLoud';
                }
                else {
                    _this.soundIcon.key = 'soundSilent';
                }
                _this.muted = !_this.muted;
                _this.game.sound.mute = _this.muted;
                _this.soundIcon.loadTexture(_this.soundIcon.key);
            };
            this.soundIcon = this.game.add.button(30, 770, 'soundLoud', changeIcon, this);
            this.soundIcon.anchor.set(0.5);
            this.soundIcon.scale.set(0.05);
        };
        AbstractLevel.prototype.update = function () {
            var _this = this;
            if (this.winChecker.checkWin(this.grid)) {
                if (this.winningTween === null) {
                    var popup = this.game.add.sprite(400, 400, 'levelCompleted');
                    popup.anchor.setTo(0.5, 0.5);
                    popup.scale.set(0.2);
                    this.winningTween = this.game.add.tween(popup.scale);
                    this.winningTween.to({ x: 1, y: 1 }, 2000, Phaser.Easing.Elastic.Out, true);
                    this.winningTween.onComplete.add(function () { _this.game.state.start('Level'); });
                }
            }
        };
        return AbstractLevel;
    })(Phaser.State);
    FloodTactics.AbstractLevel = AbstractLevel;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=AbstractLevel.js.map