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
            background.scale.set(0.25);
            background.anchor.set(0.5);
        };
        return Credits;
    })(Phaser.State);
    FloodTactics.Credits = Credits;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Credits.js.map