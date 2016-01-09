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
        function Grid(game, x, y, background) {
            _super.call(this, game, x, y, background, 0);
            //this.tint = 0x000000;
            this.game.add.existing(this);
            this.squares = [];
            this.onClick = [];
            //data pro level
            this.rows = 6;
            this.columns = 6;
            this.colorRules = new Map();
            // 4 barvy, každá barva pořáží jednu jinou, cyklus
            //this.colorRules.set(Color.Blue, [Color.Brown]);
            //this.colorRules.set(Color.Brown, [Color.Red]);
            //this.colorRules.set(Color.Red, [Color.Yellow]);
            //this.colorRules.set(Color.Yellow, [Color.Blue]);
            //5 barev, každá barva poráží 2 jiné
            //this.colorRules.set(Color.Blue, [Color.Brown, Color.Red]);
            //this.colorRules.set(Color.Brown, [Color.Red, Color.Yellow]);
            //this.colorRules.set(Color.Red, [Color.Yellow, Color.Green]);
            //this.colorRules.set(Color.Yellow, [Color.Green, Color.Blue]);
            //this.colorRules.set(Color.Green, [Color.Blue, Color.Brown]);
            //6 barev, z toho je jedna "neaktivní", na nic nereaguje, jako zeď
            this.colorRules.set(FloodTactics.Color.Blue, [FloodTactics.Color.Brown, FloodTactics.Color.Red]);
            this.colorRules.set(FloodTactics.Color.Brown, [FloodTactics.Color.Red, FloodTactics.Color.Yellow]);
            this.colorRules.set(FloodTactics.Color.Red, [FloodTactics.Color.Yellow, FloodTactics.Color.Green]);
            this.colorRules.set(FloodTactics.Color.Yellow, [FloodTactics.Color.Green, FloodTactics.Color.Blue]);
            this.colorRules.set(FloodTactics.Color.Green, [FloodTactics.Color.Blue, FloodTactics.Color.Brown]);
            this.colorRules.set(FloodTactics.Color.Black, []);
            //4 barvy, každá barva poráží všechny ostatní
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
            //var diagonalDirections : Phaser.Point[] = [];
            //diagonalDirections[0] = new Phaser.Point(-1, -1);
            //diagonalDirections[1] = new Phaser.Point(1, -1);
            //diagonalDirections[2] = new Phaser.Point(-1, 1);
            //diagonalDirections[3] = new Phaser.Point(1, 1);
            var redType = new FloodTactics.SquareType(FloodTactics.Color.Red, power, directDirections);
            var blueType = new FloodTactics.SquareType(FloodTactics.Color.Blue, power, directDirections);
            var brownType = new FloodTactics.SquareType(FloodTactics.Color.Brown, power, directDirections);
            var yellowType = new FloodTactics.SquareType(FloodTactics.Color.Yellow, power, directDirections);
            var greenType = new FloodTactics.SquareType(FloodTactics.Color.Green, power, directDirections);
            var blackType = new FloodTactics.SquareType(FloodTactics.Color.Black, power, directDirections);
            var types = [];
            types.push(redType);
            types.push(brownType);
            types.push(blueType);
            types.push(yellowType);
            types.push(greenType);
            types.push(blackType);
            //konec načítání typů čtverců
            var number = 3;
            //konec dat pro čtverce
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
            this.rules = this.game.add.sprite(500, 450, 'rules');
            this.rules.scale.set(0.25);
            //this.rules = this.game.add.group();
            //
            //var i = 0;
            //var inactiveColors = this.getInactiveColors();
            //this.colorRules.forEach((values : Color[], key : Color) => {
            //	if(inactiveColors.indexOf(key) > -1) {	//aby se nevykreslovala pravidla pro neaktivní čtverce
            //	   return;
            //	}
            //
            //	var square = this.game.add.sprite(500, 80 + 60 * i, ColorHelper.toString(key));
            //	square.anchor.setTo(0.5, 0.5);  //posunu, aby souřadnice určovaly střed a ne okraj spritu
            //	square.scale.set(0.25);
            //	var text = this.game.add.bitmapText(530, 80 + 60 * i, 'arial', ">", 30);
            //	text.anchor.setTo(0.5, 0.5);
            //
            //	this.rules.add(square);
            //	this.rules.add(text);
            //
            //	var j = 0;
            //	for(var color2 of values) {
            //		var square = this.game.add.sprite(560 + 40 * j, 80 + 60 * i, ColorHelper.toString(color2));
            //		square.anchor.setTo(0.5, 0.5);
            //		square.scale.set(0.25);
            //		j++;
            //
            //		this.rules.add(square);
            //	}
            //	i++;
            //});
            //kopírování čverců
            this.initialSquares = this.squaresToData();
            this.bubbling = this.game.add.audio('bubbling');
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
                    this.bubbling.play();
                }
            }
            this.processOnClick(square);
        };
        Grid.prototype.flood = function (square) {
            for (var _i = 0, _a = this.getNeighbors(square); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                var colorsToBeCaptured = this.colorRules.get(square.getColor());
                if (colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
                    neighbor.setSquareType(square.getSquareType());
                    this.bubbling.play();
                    neighbor.flood();
                }
            }
            this.processOnClick(square);
        };
        Grid.prototype.processOnClick = function (square) {
            var newOnClick = [];
            for (var _i = 0, _a = this.onClick; _i < _a.length; _i++) {
                var callback = _a[_i];
                if (!callback(square)) {
                    newOnClick.push(callback);
                }
            }
            this.onClick = newOnClick;
        };
        Grid.prototype.getSquares = function () {
            return this.squares;
        };
        Grid.prototype.restartLevel = function () {
            this.squaresFromData(this.initialSquares);
            console.log("level restarted");
        };
        Grid.prototype.createSquareFromType = function (x, y, max, squareType, number) {
            var square = new FloodTactics.Square(this.game, 42 + 64 * x, 42 + 64 * y, this, new Phaser.Point(x, y), max, squareType, number);
            square.scale.setTo((1 / 0.28) * 0.25);
            //square.scale.set(100);
            return square;
        };
        Grid.prototype.serialize = function () {
            var data = {};
            data.rows = this.rows;
            data.columns = this.columns;
            data.colorRules = this.mapToObject(this.colorRules);
            data.squares = this.squaresToData();
            return data;
        };
        Grid.prototype.deserialize = function (data) {
            this.rows = data.rows;
            this.columns = data.columns;
            this.colorRules = this.objectToMap(data.colorRules);
            console.log(this.colorRules);
            this.squaresFromData(data.squares);
            //kopírování čverců
            this.initialSquares = this.squaresToData();
        };
        Grid.prototype.toJson = function () {
            return JSON.stringify(this.serialize(), null, 4);
        };
        Grid.prototype.mapToObject = function (map) {
            var obj = Object.create(null);
            this.colorRules.forEach(function (values, key) {
                obj[key] = values;
            });
            return obj;
        };
        Grid.prototype.objectToMap = function (obj) {
            console.log(obj);
            var map = new Map();
            for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
                var k = _a[_i];
                map.set(Number(k), obj[k]);
            }
            console.log(map);
            return map;
        };
        Grid.prototype.squaresToData = function () {
            var data = [];
            for (var i = 0; i < this.rows; i++) {
                data[i] = [];
                for (var j = 0; j < this.columns; j++) {
                    data[i][j] = this.squares[i][j].serialize();
                }
            }
            return data;
        };
        Grid.prototype.squaresFromData = function (data) {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.columns; j++) {
                    this.squares[i][j].deserialize(data[i][j]);
                }
            }
        };
        //reads rules and returns colors, which can not be recolored and do not recolor anything
        Grid.prototype.getInactiveColors = function () {
            var inactiveColors = [];
            //přidám všechny barvy, které nikoho nepřebarvují
            this.colorRules.forEach(function (values, key) {
                if (values.length == 0) {
                    inactiveColors.push(key);
                }
            });
            //kontrola, zda barva, která nikoho nepřebarvuje, není sama přebarvovaná někým jiným
            this.colorRules.forEach(function (values, key) {
                for (var _i = 0; _i < inactiveColors.length; _i++) {
                    var color = inactiveColors[_i];
                    if (values.indexOf(color) > -1) {
                        //odejme barvu z pole
                        inactiveColors = inactiveColors.filter(function (col) { return col != color; });
                    }
                }
            });
            return inactiveColors;
        };
        return Grid;
    })(Phaser.Sprite);
    FloodTactics.Grid = Grid;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Grid.js.map