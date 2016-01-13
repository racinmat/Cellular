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
            var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'creditsBackground');
            background.anchor.set(0.5);
            background.scale.set(0.25);
            //var content : string = "Matej Racinský - Main programmer\n" +
            //	"Michal Bureš - Game designer, Programmer\n" +
            //	"Pavel Liška - Graphic designer, animator.";
            var content = "ěč";
            var text = this.game.add.bitmapText(300, 200, 'sego', content, 28);
            text.maxWidth = 204; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
        };
        return Credits;
    })(Phaser.State);
    FloodTactics.Credits = Credits;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Credits.js.map