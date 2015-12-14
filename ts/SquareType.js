/// <reference path="references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var SquareType = (function () {
        function SquareType(color, power, directions) {
            this.color = color;
            this.power = power;
            this.directions = directions;
        }
        return SquareType;
    })();
    FloodTactics.SquareType = SquareType;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=SquareType.js.map