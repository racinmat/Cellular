/// <reference path="../references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var OneColorWinChecker = (function () {
        function OneColorWinChecker(color) {
            this.color = color;
        }
        OneColorWinChecker.prototype.checkWin = function (squares) {
            for (var _i = 0; _i < squares.length; _i++) {
                var row = squares[_i];
                for (var _a = 0; _a < row.length; _a++) {
                    var square = row[_a];
                    if (square.getColor() != this.color) {
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