/// <reference path="references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FloodTactics;
(function (FloodTactics) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.apply(this, arguments);
        }
        Menu.prototype.create = function () {
            var _this = this;
            //tutorial tlačítko
            var button = this.game.add.button(400, 100, 'button', function () { _this.game.state.start('TutorialLevel', true, false); }, this);
            button.scale.set(0.3);
            button.anchor.set(0.5);
            var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
            var buttonText = this.game.add.text(400, 100, "Tutorial", style);
            buttonText.anchor.set(0.5);
            //random level tlačítko
            var button = this.game.add.button(400, 200, 'button', function () { _this.game.state.start('Level', true, false); }, this);
            button.scale.set(0.3);
            button.anchor.set(0.5);
            var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
            var buttonText = this.game.add.text(400, 200, "Random level", style);
            buttonText.anchor.set(0.5);
        };
        return Menu;
    })(Phaser.State);
    FloodTactics.Menu = Menu;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Menu.js.map