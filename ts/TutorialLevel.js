/// <reference path="references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FloodTactics;
(function (FloodTactics) {
    var TutorialLevel = (function (_super) {
        __extends(TutorialLevel, _super);
        function TutorialLevel() {
            _super.apply(this, arguments);
        }
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
            //var popup = this.game.add.sprite(400, 200, 'whiteBackground300x300');
            var popup = this.game.add.sprite(400, 200, 'whiteBackground');
            popup.scale.setTo(1.5);
            popup.anchor.set(0.5);
            var content = "Welcome to Flood Tactics.\n" +
                "In every level, goal is written below grid.\n" +
                "Now, goal is to change color of all squares to blue.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 18);
            //var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
            text.maxWidth = 190; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 60, 'button', function () {
                //var button = this.game.add.button(0, 110, 'button', () => {
                popup.destroy(true); //destroyChildren = true;
                _this.popupTwo();
            }, this);
            button.scale.set(0.2);
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
            var popup = this.game.add.sprite(300, 200, 'whiteBackground');
            popup.scale.setTo(1.5, 1.8);
            popup.anchor.set(0.5);
            var content = "Here are flooding rules.\n" +
                "Every color is able to absorb its neighbors, according to rules.\n" +
                "In this scenario, blue spreads over brown and red, brown spreads over red and yellow, and so on.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 27);
            text.maxWidth = 190; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.scale.set(1, 0.833333);
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 70, 'button', function () {
                popup.destroy(true); //destroyChildren = true;
                _this.popupThree();
            }, this);
            button.scale.set(0.2, 0.16666);
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
            var popup = this.game.add.sprite(600, 500, 'whiteBackground');
            popup.scale.setTo(1.5);
            popup.anchor.set(0.5);
            var content = "Lets see, how flooding works.\n" +
                "Here we have blue square.\n" +
                "It will flood over red and brown, but not over green and yellow.\n" +
                "Click on the blue square.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 20);
            text.maxWidth = 190; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 60, 'button', function () {
                popup.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.2);
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
            var popup = this.game.add.sprite(600, 500, 'whiteBackground');
            popup.scale.setTo(1.7);
            popup.anchor.set(0.5);
            var content = "Well done. As you see, now you have 3 blue squares.\n" +
                "But green and yellow squares are not changed.\n" +
                "To get rid of green, look at the table of rules on the right.\n" +
                "Green can be flooded by red and yellow.\n" +
                "Click any yellow square next to green one.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 20);
            text.maxWidth = 190; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 60, 'button', function () {
                popup.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.2);
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
            var popup = this.game.add.sprite(600, 500, 'whiteBackground');
            popup.scale.setTo(1.5);
            popup.anchor.set(0.5);
            var content = "Well done. Now you have only blue and yellow colors.\n" +
                "But green and yellow squares are not changed.\n" +
                "To get rid of green, look at the table of rules on the right.\n" +
                "Green can be flooded by red and yellow.\n" +
                "Click any yellow square next to green one.";
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 20);
            text.maxWidth = 190; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 60, 'button', function () {
                popup.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.2);
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