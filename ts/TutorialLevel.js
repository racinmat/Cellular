var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var TutorialLevel = (function (_super) {
        __extends(TutorialLevel, _super);
        function TutorialLevel() {
            _super.apply(this, arguments);
        }
        //init se volá před createm
        TutorialLevel.prototype.init = function (levelName) {
            this.grid = new FloodTactics.Grid(this.game, 0, 0, 'backgroundSquare');
            if (levelName != undefined) {
                this.grid.deserialize(games[levelName]);
            }
        };
        TutorialLevel.prototype.create = function () {
            _super.prototype.create.call(this);
            //this.grid.deserialize(games["tutorial.json"]);	//proměnní, kterou jsem sem dal z PHPčka, které načetlo jsony
            this.popupOne();
        };
        TutorialLevel.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        TutorialLevel.prototype.popupOne = function () {
            var _this = this;
            var popup = this.game.add.sprite(400, 200, 'whiteBackground300x300');
            popup.anchor.set(0.5);
            var content = "Welcome to Cellular!\n" +
                "Your goal is to help a particular cell to dominate the field.\n" +
                "In every level, we will tell you which cell needs your help.\n" +
                "Now, the blue cell needs your help.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
            text.maxWidth = 285; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 90, 'button', function () {
                popup.destroy(true); //destroyChildren = true;
                _this.popupTwo();
            }, this);
            button.scale.set(0.3);
            button.anchor.set(0.5);
            var style = { font: "30px Arial", fill: "#000000", align: "center" };
            var buttonText = this.game.add.text(0, 0, "Next", style);
            buttonText.scale.set(4);
            buttonText.anchor.set(0.5);
            button.addChild(buttonText);
            popup.addChild(button);
            //var tween = this.game.add.tween(this.winningDescription.scale);
            //tween.to( { x: 1.05, y: 1.05 }, 1000, Phaser.Easing.Bounce.InOut, true, 1, true, true);
        };
        TutorialLevel.prototype.popupTwo = function () {
            var _this = this;
            var popup = this.game.add.sprite(300, 200, 'whiteBackground300x360');
            popup.anchor.set(0.5);
            var content = "Here you can see the capability of each cell.\n" +
                "Every cell is able to absorb other cells, but not all of them!.\n" +
                "In this scenario, blue spreads over brown and red, brown spreads over red and yellow, and so on.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
            text.maxWidth = 285; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 110, 'button', function () {
                popup.destroy(true); //destroyChildren = true;
                _this.popupThree();
            }, this);
            button.scale.set(0.3);
            button.anchor.set(0.5);
            var style = { font: "30px Arial", fill: "#000000", align: "center" };
            var buttonText = this.game.add.text(0, 0, "Next", style);
            buttonText.scale.set(4);
            buttonText.anchor.set(0.5);
            button.addChild(buttonText);
            popup.addChild(button);
            //var tween = this.game.add.tween(this.grid.rules.scale);
            //tween.to( { x: 1.05, y: 1.05 }, 1000, Phaser.Easing.Bounce.InOut, true, 1, true, true);
        };
        TutorialLevel.prototype.popupThree = function () {
            var _this = this;
            var popup = this.game.add.sprite(600, 500, 'whiteBackground300x300');
            popup.anchor.set(0.5);
            var content = "Lets see, how absorption works!\n" +
                "Here we have blue cell.\n" +
                "It will absorb all red and brown cells next to it, but green and \n" +
                "yellow cells will remain unabsorbed. Now, click on the blue cell.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
            text.maxWidth = 285; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 90, 'button', function () {
                popup.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.3);
            button.anchor.set(0.5);
            var style = { font: "30px Arial", fill: "#000000", align: "center" };
            var buttonText = this.game.add.text(0, 0, "Next", style);
            buttonText.scale.set(4);
            buttonText.anchor.set(0.5);
            button.addChild(buttonText);
            popup.addChild(button);
            this.grid.onClick.push(function (square) {
                if (square.getColor() == FloodTactics.Color.Blue) {
                    _this.popupFour();
                    return true;
                }
                return false;
            });
        };
        TutorialLevel.prototype.popupFour = function () {
            var _this = this;
            var popup = this.game.add.sprite(600, 500, 'whiteBackground300x360');
            popup.anchor.set(0.5);
            var content = "Well done. As you see, now you have 3 blue cells.\n" +
                "But green and yellow cells are still there.\n" +
                "To get rid of green, look at the table of rules on the right.\n" +
                "Green cells can be absorbed by red and yellow.\n" +
                "Try clicking  on any yellow cell next to a green one.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
            text.maxWidth = 285; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 140, 'button', function () {
                popup.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.3);
            button.anchor.set(0.5);
            var style = { font: "30px Arial", fill: "#000000", align: "center" };
            var buttonText = this.game.add.text(0, 0, "Next", style);
            buttonText.scale.set(4);
            buttonText.anchor.set(0.5);
            button.addChild(buttonText);
            popup.addChild(button);
            this.grid.onClick.push(function (square) {
                var pos = square.getGridPosition();
                var yellowNeighborOfGreen = (pos.x == 3 && pos.y == 1) || (pos.x == 3 && pos.y == 3) || (pos.x == 4 && pos.y == 2); //nějaký žlutý soused zeléného čtverce
                yellowNeighborOfGreen = yellowNeighborOfGreen && square.getColor() == FloodTactics.Color.Yellow;
                if (yellowNeighborOfGreen) {
                    _this.popupFive();
                    return true;
                }
                return false;
            });
        };
        TutorialLevel.prototype.popupFive = function () {
            var _this = this;
            var popup = this.game.add.sprite(600, 500, 'whiteBackground300x360');
            popup.anchor.set(0.5);
            var content = "Well done. Now you have only blue and yellow cells, and brown cell in the corner.\n" +
                "To get rid of all yellow cells, you have to stimulate brown or red cells.\n" +
                "Now, click on the brown cell.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
            text.maxWidth = 285; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 140, 'button', function () {
                popup.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.3);
            button.anchor.set(0.5);
            var style = { font: "30px Arial", fill: "#000000", align: "center" };
            var buttonText = this.game.add.text(0, 0, "Next", style);
            buttonText.scale.set(4);
            buttonText.anchor.set(0.5);
            button.addChild(buttonText);
            popup.addChild(button);
            this.grid.onClick.push(function (square) {
                if (square.getColor() == FloodTactics.Color.Brown) {
                    _this.popupSix();
                    return true;
                }
                return false;
            });
        };
        TutorialLevel.prototype.popupSix = function () {
            var popup = this.game.add.sprite(600, 500, 'whiteBackground300x360');
            popup.anchor.set(0.5);
            var content = "Well done. As you can see, brown cell absorbs yellow and blue absorbs brown.\n" +
                "With these rules (visualized on the right) in mind, completing the level should be piece of cake.\n" +
                "Remember, level is completed, when all cells are blue.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
            text.maxWidth = 285; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 140, 'button', function () {
                popup.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.3);
            button.anchor.set(0.5);
            var style = { font: "30px Arial", fill: "#000000", align: "center" };
            var buttonText = this.game.add.text(0, 0, "Next", style);
            buttonText.scale.set(4);
            buttonText.anchor.set(0.5);
            button.addChild(buttonText);
            popup.addChild(button);
        };
        return TutorialLevel;
    })(FloodTactics.AbstractLevel);
    FloodTactics.TutorialLevel = TutorialLevel;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=TutorialLevel.js.map