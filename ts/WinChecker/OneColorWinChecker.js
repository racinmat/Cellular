/// <reference path="../references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var OneColorWinChecker = (function () {
        function OneColorWinChecker(color) {
            this.color = color;
        }
        OneColorWinChecker.prototype.checkWin = function (grid) {
            for (var _i = 0, _a = grid.getSquares(); _i < _a.length; _i++) {
                var row = _a[_i];
                for (var _b = 0; _b < row.length; _b++) {
                    var square = row[_b];
                    if (square.getSquareType() != this.color) {
                        return false;
                    }
                }
            }
            return true;
        };
        OneColorWinChecker.prototype.getDescription = function () {
            return "All squares in grid must be in " + FloodTactics.ColorHelper.toString(this.color) + " color.";
        };
        return OneColorWinChecker;
    })();
    FloodTactics.OneColorWinChecker = OneColorWinChecker;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=OneColorWinChecker.js.map