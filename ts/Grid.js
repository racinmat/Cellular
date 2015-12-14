/// <reference path="references.ts"/>
/// <reference path="../../../../Program Files (x86)\JetBrains\PhpStorm 9.0\plugins\JavaScriptLanguage\typescriptCompiler\external\lib.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FloodTactics;
(function (FloodTactics) {
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(game, x, y) {
            _super.call(this, game, x, y, 'background', 0);
            this.tint = 0x000000;
            this.game.add.existing(this);
            this.squares = [];
            //data pro level
            this.rows = 6;
            this.columns = 6;
            this.colorRules = new Map();
            this.colorRules.set(FloodTactics.Color.Blue, [FloodTactics.Color.Brown]);
            this.colorRules.set(FloodTactics.Color.Brown, [FloodTactics.Color.Red]);
            this.colorRules.set(FloodTactics.Color.Red, [FloodTactics.Color.Yellow]);
            this.colorRules.set(FloodTactics.Color.Yellow, [FloodTactics.Color.Blue]);
            //konec dat pro level
            var max = new Phaser.Point(this.rows - 1, this.columns - 1);
            for (var i = 0; i < this.rows; i++) {
                this.squares[i] = [];
                for (var j = 0; j < this.columns; j++) {
                    //data pro čtverce, budou se načítat z jsonu
                    var power = 1;
                    var directions = [];
                    directions[0] = new Phaser.Point(-1, 0);
                    directions[1] = new Phaser.Point(1, 0);
                    directions[2] = new Phaser.Point(0, -1);
                    directions[3] = new Phaser.Point(0, 1);
                    //konec dat pro čtverce
                    this.squares[i][j] = new FloodTactics.Square(this.game, 10 + 64 * i, 10 + 64 * j, this, new Phaser.Point(i, j), power, directions, max, FloodTactics.ColorHelper.getRandom());
                    _super.prototype.addChild.call(this, this.squares[i][j]);
                }
            }
        }
        Grid.prototype.getSquare = function (point) {
            return this.squares[point.x][point.y];
        };
        Grid.prototype.expand = function (square) {
            for (var _i = 0, _a = square.getNeighborPoints(); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                var neighborSquare = this.getSquare(neighbor);
                var colorsToBeCaptured = this.colorRules.get(square.getColor());
                if (colorsToBeCaptured.indexOf(neighborSquare.getColor()) > -1) {
                    neighborSquare.setColor(square.getColor());
                }
            }
        };
        Grid.prototype.getSquares = function () {
            return this.squares;
        };
        return Grid;
    })(Phaser.Sprite);
    FloodTactics.Grid = Grid;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Grid.js.map