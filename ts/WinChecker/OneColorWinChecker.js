/// <reference path="../references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var OneColorWinChecker = (function () {
        function OneColorWinChecker(color) {
            this.color = color;
        }
        OneColorWinChecker.prototype.checkWin = function (grid) {
            if (!grid.initialized) {
                return false;
            }
            for (var _i = 0, _a = grid.getSquares(); _i < _a.length; _i++) {
                var row = _a[_i];
                for (var _b = 0; _b < row.length; _b++) {
                    var square = row[_b];
                    if (square.getColor() != this.color && grid.isColorActive(square.getColor())) {
                        return false;
                    }
                }
            }
            return true;
        };
        OneColorWinChecker.prototype.getDescription = function () {
            return "\nAll cells must have " + FloodTactics.ColorHelper.toString(this.color) + " color.";
        };
        OneColorWinChecker.prototype.setData = function (args) {
            this.color = args;
        };
        return OneColorWinChecker;
    })();
    FloodTactics.OneColorWinChecker = OneColorWinChecker;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=OneColorWinChecker.js.map