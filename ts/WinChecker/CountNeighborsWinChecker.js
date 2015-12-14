/// <reference path="../references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var CountNeighborsWinChecker = (function () {
        function CountNeighborsWinChecker() {
        }
        CountNeighborsWinChecker.prototype.checkWin = function (grid) {
            for (var _i = 0, _a = grid.getSquares(); _i < _a.length; _i++) {
                var row = _a[_i];
                for (var _b = 0; _b < row.length; _b++) {
                    var square = row[_b];
                    var sameColorNeighborsCount = 0;
                    for (var _c = 0, _d = grid.getNeighbors(square); _c < _d.length; _c++) {
                        var neighbor = _d[_c];
                        if (neighbor.getColor() == square.getColor()) {
                            sameColorNeighborsCount++;
                        }
                    }
                    if (square.getNumber() != sameColorNeighborsCount) {
                        return false;
                    }
                }
            }
            return true;
        };
        CountNeighborsWinChecker.prototype.getDescription = function () {
            return "Every square must same equal its number and amount of neighbors with same color as color of the square.";
        };
        return CountNeighborsWinChecker;
    })();
    FloodTactics.CountNeighborsWinChecker = CountNeighborsWinChecker;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=CountNeighborsWinChecker.js.map