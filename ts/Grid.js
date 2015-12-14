/// <reference path="references.ts"/>
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
            //načítání typů čtverců
            //data pro čtverce, budou se načítat z jsonu
            var power = 1;
            var directDirections = [];
            directDirections[0] = new Phaser.Point(-1, 0);
            directDirections[1] = new Phaser.Point(1, 0);
            directDirections[2] = new Phaser.Point(0, -1);
            directDirections[3] = new Phaser.Point(0, 1);
            var diagonalDirections = [];
            diagonalDirections[0] = new Phaser.Point(-1, -1);
            diagonalDirections[1] = new Phaser.Point(1, -1);
            diagonalDirections[2] = new Phaser.Point(-1, 1);
            diagonalDirections[3] = new Phaser.Point(1, 1);
            //konec dat pro čtverce
            var redType = new FloodTactics.SquareType(FloodTactics.Color.Red, power, directDirections);
            var blueType = new FloodTactics.SquareType(FloodTactics.Color.Blue, power, directDirections);
            var brownType = new FloodTactics.SquareType(FloodTactics.Color.Brown, power, diagonalDirections);
            var yellowType = new FloodTactics.SquareType(FloodTactics.Color.Yellow, power, diagonalDirections);
            var types = [];
            types.push(redType);
            types.push(brownType);
            types.push(blueType);
            types.push(yellowType);
            //konec načítání typů čtverců
            var number = 3;
            var max = new Phaser.Point(this.rows - 1, this.columns - 1);
            for (var i = 0; i < this.rows; i++) {
                this.squares[i] = [];
                for (var j = 0; j < this.columns; j++) {
                    this.squares[i][j] = this.createSquareFromType(i, j, max, Phaser.ArrayUtils.getRandomItem(types), number);
                    //každý čverec má stejné vlastnosti, ale náhodnou barvu
                    //this.squares[i][j] = this.createSquare(i, j, power, directions, max, ColorHelper.getRandom(), number);
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
            //kopírování čverců
            this.initialSquares = [];
            for (var i = 0; i < this.rows; i++) {
                this.initialSquares[i] = [];
                for (var j = 0; j < this.columns; j++) {
                    this.initialSquares[i][j] = this.squares[i][j].serialize();
                }
            }
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
                    neighbor.setSquareType(square.getSquareType());
                }
            }
        };
        Grid.prototype.flood = function (square) {
            for (var _i = 0, _a = this.getNeighbors(square); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                var colorsToBeCaptured = this.colorRules.get(square.getColor());
                if (colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
                    neighbor.setSquareType(square.getSquareType());
                    neighbor.flood();
                }
            }
        };
        Grid.prototype.getSquares = function () {
            return this.squares;
        };
        Grid.prototype.restartLevel = function () {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.columns; j++) {
                    this.squares[i][j].deserialize(this.initialSquares[i][j]);
                }
            }
            console.log("level restarted");
        };
        Grid.prototype.createSquareFromType = function (x, y, max, squareType, number) {
            return new FloodTactics.Square(this.game, 42 + 64 * x, 42 + 64 * y, this, new Phaser.Point(x, y), max, squareType, number);
        };
        return Grid;
    })(Phaser.Sprite);
    FloodTactics.Grid = Grid;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Grid.js.map