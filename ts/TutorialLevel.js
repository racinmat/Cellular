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
            this.popupOne();
        };
        TutorialLevel.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        TutorialLevel.prototype.popupOne = function () {
            var _this = this;
            var popup = this.game.add.sprite(400, 400, 'whiteBackground');
            popup.scale.setTo(1.5);
            popup.anchor.set(0.5);
            var content = "Welcome to Flood Tactics.\n" +
                "In every level, goal is written below grid.\n" +
                "Now, it is to change color of all squares to blue."; //zde udělat zvýraznění textu
            //var text = this.game.add.text(0, 0, content, style);    //souřadnice relativně k parentovi
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 20);
            text.maxWidth = 190; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 60, 'button', function () {
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
        };
        TutorialLevel.prototype.popupTwo = function () {
            var _this = this;
            var popup = this.game.add.sprite(400, 400, 'whiteBackground');
            popup.scale.setTo(1.5);
            popup.anchor.set(0.5);
            var content = "Here are flooding rules.\n" +
                "Every color is able to absorb its neighbors, according to rules.\n" +
                "In this scenario, ."; //zde udělat zvýraznění textu
            //var text = this.game.add.text(0, 0, content, style);    //souřadnice relativně k parentovi
            var text = this.game.add.bitmapText(0, -30, 'arialBlack', content, 20);
            text.maxWidth = 190; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            text.anchor.set(0.5);
            popup.addChild(text);
            var button = this.game.add.button(0, 60, 'button', function () {
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
        };
        TutorialLevel.prototype.popupThree = function () {
            var popup = this.game.add.sprite(400, 400, 'whiteBackground');
            popup.scale.setTo(1.5);
            popup.anchor.set(0.5);
            var content = "Welcome to Flood Tactics.\n" +
                "In every level, goal is written below grid.\n" +
                "Now, it is to change color of all squares to blue."; //zde udělat zvýraznění textu
            //var text = this.game.add.text(0, 0, content, style);    //souřadnice relativně k parentovi
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