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
            var background = this.game.add.sprite(0, 0, 'menuBackground');
            background.scale.set(0.25);
            var tutorialButton = this.game.add.button(313, 190, 'tutorial', function () { _this.game.state.start('TutorialLevel', true, false, 'tutorial.json'); }, this); //4. parametr je parametrem init funkce
            tutorialButton.scale.set(0.25);
            var level1Button = this.game.add.button(313, 310, 'level1', function () { _this.game.state.start('Level', true, false, 'level2.json'); }, this); //4. parametr je parametrem init funkce
            level1Button.scale.set(0.25);
            var level2Button = this.game.add.button(313, 430, 'level2', function () { _this.game.state.start('Level', true, false, 'level4.json'); }, this); //4. parametr je parametrem init funkce
            level2Button.scale.set(0.25);
            var creditsButton = this.game.add.button(313, 550, 'credits', function () { _this.game.state.start('Credits'); }, this);
            creditsButton.scale.set(0.25);
        };
        return Menu;
    })(Phaser.State);
    FloodTactics.Menu = Menu;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Menu.js.map