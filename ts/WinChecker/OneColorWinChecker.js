/// <reference path="../references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var OneColorWinChecker = (function () {
        function OneColorWinChecker(color) {
            this.color = color;
        }
        OneColorWinChecker.prototype.checkWin = function (grid) {
            var inactiveColors = grid.getInactiveColors();
            for (var _i = 0, _a = grid.getSquares(); _i < _a.length; _i++) {
                var row = _a[_i];
                for (var _b = 0; _b < row.length; _b++) {
                    var square = row[_b];
                    if (square.getColor() != this.color && inactiveColors.indexOf(square.getColor()) == -1) {
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