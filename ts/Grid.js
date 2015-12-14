/// <reference path="references.ts"/>
/// <reference path="../../../../Program Files (x86)\JetBrains\PhpStorm 9.0\plugins\JavaScriptLanguage\typescriptCompiler\external\lib.es6.d.ts"/>
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
            var _this = this;
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
            //this.colorRules.set(Color.Blue, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //this.colorRules.set(Color.Brown, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //this.colorRules.set(Color.Red, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
            //this.colorRules.set(Color.Yellow, [Color.Brown, Color.Red, Color.Yellow, Color.Blue]);
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
                    var number = 3;
                    //konec dat pro čtverce
                    this.squares[i][j] = new FloodTactics.Square(this.game, 42 + 64 * i, 42 + 64 * j, this, new Phaser.Point(i, j), power, directions, max, FloodTactics.ColorHelper.getRandom(), number);
                    _super.prototype.addChild.call(this, this.squares[i][j]);
                }
            }
            //vykreslení pravidel pro přebarvování
            var i = 0;
            this.colorRules.forEach(function (values, key) {
                var square = _this.game.add.sprite(500, 80 + 80 * i, FloodTactics.ColorHelper.toString(key));
                square.anchor.setTo(0.5, 0.5); //posunu, aby souřadnice určovaly střed a ne okraj spritu
                square.scale.set(0.5);
                var text = _this.game.add.bitmapText(530, 80 + 80 * i, 'arial', ">", 30);
                text.anchor.setTo(0.5, 0.5);
                var j = 0;
                for (var _i = 0; _i < values.length; _i++) {
                    var color2 = values[_i];
                    var square = _this.game.add.sprite(560 + 40 * j, 80 + 80 * i, FloodTactics.ColorHelper.toString(color2));
                    square.anchor.setTo(0.5, 0.5);
                    square.scale.set(0.5);
                    j++;
                }
                i++;
            });
        }
        Grid.prototype.getSquare = function (point) {
            return this.squares[point.x][point.y];
        };
        Grid.prototype.getNeighbors = function (square) {
            var neighbors = [];
            for (var _i = 0, _a = square.getNeighborPoints(); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                neighbors.push(this.getSquare(neighbor));
            }
            return neighbors;
        };
        Grid.prototype.expand = function (square) {
            for (var _i = 0, _a = this.getNeighbors(square); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                var colorsToBeCaptured = this.colorRules.get(square.getColor());
                if (colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
                    neighbor.setColor(square.getColor());
                }
            }
        };
        Grid.prototype.flood = function (square) {
            for (var _i = 0, _a = this.getNeighbors(square); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                var colorsToBeCaptured = this.colorRules.get(square.getColor());
                if (colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
                    neighbor.setColor(square.getColor());
                    neighbor.flood();
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