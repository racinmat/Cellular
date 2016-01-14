/// <reference path="references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FloodTactics;
(function (FloodTactics) {
    var Credits = (function (_super) {
        __extends(Credits, _super);
        function Credits() {
            _super.apply(this, arguments);
        }
        Credits.prototype.create = function () {
            var _this = this;
            var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'creditsBackground');
            background.anchor.set(0.5);
            background.scale.set(0.25);
            var content = "Matěj Račinský \n" +
                " - Main programmer\n" +
                " - Level designer\n" +
                "Michal Bureš \n" +
                " - Game designer  \n" +
                " - Programmer \n" +
                "Pavel Liška  \n" +
                " - Graphic designer \n" +
                " - Animator \n" +
                "Game was developed \nin collaboration of \nFEL CTU, MFF UK and \nFDULS Plzeň, 2015";
            var text = this.game.add.bitmapText(300, 150, 'sego', content, 40);
            text.maxWidth = 300; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            var button = this.game.add.button(this.game.world.centerX, 830, 'buttonMenu', function () { _this.game.state.start('Menu'); }, this); //4. parametr je parametrem init funkce
            button.scale.set(0.5);
            button.anchor.set(0.5);
        };
        return Credits;
    })(Phaser.State);
    FloodTactics.Credits = Credits;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Credits.js.map