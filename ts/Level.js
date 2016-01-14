var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.apply(this, arguments);
        }
        //init se volá před createm
        Level.prototype.init = function (levelName) {
            _super.prototype.init.call(this, levelName);
        };
        Level.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            var winningDescription = this.game.add.bitmapText(622, 515, 'sego', "Winning condition: " + this.winChecker.getDescription(), 28);
            winningDescription.maxWidth = 204; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            var score = this.game.add.sprite(620, 770, 'score');
            score.scale.set(0.25);
            var content = String(this.game.score);
            this.game.add.bitmapText(740, 780, 'sego', content, 28);
            //var button = this.game.add.button(180, 640, 'button', () => {this.saveGame();}, this);
            //button.scale.set(0.2);
            //button.anchor.set(0.5);
            //var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
            //var buttonText = this.game.add.text(0, 0, "save level", style);
            //button.addChild(buttonText);
            //buttonText.scale.set(5);
            //buttonText.anchor.set(0.5);
            this.treshold = 2;
            if (this.game.score > this.treshold) {
                var maxSeconds = 240;
                this.timer = this.game.time.create();
                this.timeToLose = this.timer.add((maxSeconds / (this.game.score - this.treshold)) * Phaser.Timer.SECOND, function () {
                    _this.game.score = 0;
                    var popup = _this.game.add.sprite(_this.game.world.centerX, _this.game.world.centerY, 'gameOver');
                    popup.anchor.setTo(0.5);
                    popup.scale.set(0.05);
                    _this.winningTween = _this.game.add.tween(popup.scale);
                    _this.winningTween.to({ x: 0.3, y: 0.3 }, 2000, Phaser.Easing.Elastic.Out, true);
                }, this);
                this.timer.start();
                var timerBackground = this.game.add.sprite(620, 720, 'timer');
                this.timeText = this.game.add.bitmapText(300, 20, 'sego', content, 28);
                timerBackground.addChild(this.timeText);
                this.timeText.scale.set(5, 5);
                timerBackground.scale.set(0.25);
            }
        };
        Level.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.game.score > this.treshold && typeof this.timeToLose != 'undefined') {
                var content = this.formatTime(Math.round((this.timeToLose.delay - this.timer.ms) / Phaser.Timer.SECOND));
                this.timeText.setText(content);
                this.timeText.update();
            }
        };
        Level.prototype.formatTime = function (s) {
            // Convert seconds (s) to a nicely formatted and padded time string
            var minutes = "0" + Math.floor(s / 60);
            var seconds = "0" + (s - minutes * 60);
            return minutes.substr(-2) + ":" + seconds.substr(-2);
        };
        Level.prototype.saveGame = function () {
            var json = this.grid.toJson();
            FloodTactics.Utils.download(json);
        };
        return Level;
    })(FloodTactics.AbstractLevel);
    FloodTactics.Level = Level;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Level.js.map