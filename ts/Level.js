/// <reference path="references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FloodTactics;
(function (FloodTactics) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.apply(this, arguments);
        }
        Level.prototype.create = function () {
            this.grid = new FloodTactics.Grid(this.game, 0, 0);
            //zde se nastavuje vítězná podmínka
            //this.winChecker = new OneColorWinChecker(Color.Blue);
            this.winChecker = new FloodTactics.CountNeighborsWinChecker();
            this.tween = null;
            var text = this.game.add.bitmapText(30, 400, 'arial', "Winning condition: " + this.winChecker.getDescription(), 32);
            text.maxWidth = 700; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
        };
        Level.prototype.update = function () {
            var _this = this;
            if (this.winChecker.checkWin(this.grid)) {
                if (this.tween === null) {
                    var popup = this.game.add.sprite(400, 400, 'levelCompleted');
                    popup.anchor.setTo(0.5, 0.5);
                    popup.scale.set(0.2);
                    this.tween = this.game.add.tween(popup.scale);
                    this.tween.to({ x: 1, y: 1 }, 2000, Phaser.Easing.Elastic.Out, true);
                    this.tween.onComplete.add(function () { _this.game.state.start('Level'); });
                }
            }
        };
        return Level;
    })(Phaser.State);
    FloodTactics.Level = Level;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Level.js.map