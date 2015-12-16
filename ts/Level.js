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
            _super.prototype.create.call(this);
        };
        Level.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return Level;
    })(FloodTactics.AbstractLevel);
    FloodTactics.Level = Level;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Level.js.map