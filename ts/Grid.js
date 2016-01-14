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
        function Grid(game, x, y, background, level) {
            _super.call(this, game, x, y, background, 0);
            this.initialized = false;
            this.level = level;
            this.game.add.existing(this);
            this.scale.set(0.25);
            this.squares = [];
            this.onClick = [];
            this.colorRules = new Map();
            //6 barev, z toho je jedna "neaktivní", na nic nereaguje, jako zeď
            this.colorRules.set(FloodTactics.Color.Blue, [FloodTactics.Color.Black, FloodTactics.Color.Red]);
            this.colorRules.set(FloodTactics.Color.Black, [FloodTactics.Color.Red, FloodTactics.Color.Violet]);
            this.colorRules.set(FloodTactics.Color.Red, [FloodTactics.Color.Violet, FloodTactics.Color.Green]);
            this.colorRules.set(FloodTactics.Color.Violet, [FloodTactics.Color.Green, FloodTactics.Color.Blue]);
            this.colorRules.set(FloodTactics.Color.Green, [FloodTactics.Color.Blue, FloodTactics.Color.Black]);
            this.colorRules.set(FloodTactics.Color.Transparent, []);
            //konec načítání typů čtverců
            this.bubbling = this.game.add.audio('bubbling');
            this.absorbtionQueue = [];
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
            if (!this.isColorActive(square.getColor())) {
                return;
            }
            var colorsToBeCaptured = this.colorRules.get(square.getColor());
            for (var _i = 0, _a = this.getNeighbors(square); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                if (colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
                    this.absorbtionQueue.push([square, neighbor]);
                    console.log('adding to queue');
                }
            }
            this.processOnClick(square);
        };
        Grid.prototype.processAbsorptionQueue = function (flooding) {
            this.processNextAbsorption(flooding);
        };
        Grid.prototype.processNextAbsorption = function (flooding) {
            var _this = this;
            if (this.absorbtionQueue.length == 0) {
                return;
            }
            var pair = this.absorbtionQueue.shift();
            var square = pair[0];
            var neighbor = pair[1];
            console.log('removing from queue, square: ' + FloodTactics.ColorHelper.toString(square.getColor()) + ', ' + square.getGridPosition().toString() + ', neighbor: ' + FloodTactics.ColorHelper.toString(neighbor.getColor()) + ', ' + neighbor.getGridPosition().toString());
            if (square.getColor() == neighbor.getColor()) {
                return;
            }
            this.expandWithAnimation(square, neighbor, function () {
                if (flooding) {
                    console.log('flooding');
                    neighbor.flood();
                }
                _this.processNextAbsorption(flooding);
            });
        };
        Grid.prototype.expandWithAnimation = function (square, neighbor, onComplete) {
            var _this = this;
            var animationSpeed = 10;
            var x = square.getGridPosition().x;
            var y = square.getGridPosition().y;
            var x2 = neighbor.getGridPosition().x;
            var y2 = neighbor.getGridPosition().y;
            var direction;
            if (x === x2) {
                if (y < y2)
                    direction = 'down';
                else
                    direction = 'up';
            }
            else {
                if (x < x2)
                    direction = 'right';
                else
                    direction = 'left';
            }
            var animationName = FloodTactics.ColorHelper.toString(square.getColor()) + '-' + direction;
            var animation1Name = FloodTactics.ColorHelper.toString(square.getColor()) + '-' + direction + '-' + 'part1';
            var animation2Name = FloodTactics.ColorHelper.toString(square.getColor()) + '-' + direction + '-' + 'part2';
            var centerCell = this.game.add.sprite(square.x, square.y, animationName);
            centerCell.anchor.set(0.5);
            _super.prototype.addChild.call(this, centerCell);
            centerCell.animations.add('expand');
            centerCell.animations.play('expand', animationSpeed, false, true);
            var targetCellPart1 = this.game.add.sprite(neighbor.x, neighbor.y, animation1Name + '-t');
            targetCellPart1.anchor.set(0.5);
            _super.prototype.addChild.call(this, targetCellPart1);
            var animation = targetCellPart1.animations.add('expand');
            animation.onComplete.add(function (sprite, animation, neighbor, targetCellPart1, animation2Name) {
                var targetCellPart2 = _this.game.add.sprite(neighbor.x, neighbor.y, animation2Name + '-t');
                targetCellPart2.anchor.set(0.5);
                _super.prototype.addChild.call(_this, targetCellPart2);
                var animation2 = targetCellPart2.animations.add('expand');
                targetCellPart2.animations.play('expand', animationSpeed, false, true);
                neighbor.setSquareType(square.getSquareType());
                animation2.onComplete.add(onComplete);
            }, this, null, neighbor, targetCellPart1, animation2Name);
            targetCellPart1.animations.play('expand', animationSpeed, false, true);
            this.bubbling.play();
        };
        Grid.prototype.flood = function (square) {
            var colorsToBeCaptured = this.colorRules.get(square.getColor());
            for (var _i = 0, _a = this.getNeighbors(square); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                if (colorsToBeCaptured.indexOf(neighbor.getColor()) > -1) {
                    this.absorbtionQueue.push([square, neighbor]);
                    console.log('adding to queue, square: ' + FloodTactics.ColorHelper.toString(square.getColor()) + ', ' + square.getGridPosition().toString() + ', neighbor: ' + FloodTactics.ColorHelper.toString(neighbor.getColor()) + ', ' + neighbor.getGridPosition().toString());
                    console.log('flooding');
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
        };
        Grid.prototype.createSquareFromType = function (x, y, max, squareType, number) {
            var square = new FloodTactics.Square(this.game, 180 + 65 * 4 * x, 190 + 65 * 4 * y, this, new Phaser.Point(x, y), max, squareType, number);
            square.scale.setTo(1);
            return square;
        };
        Grid.prototype.serialize = function () {
            var data = {};
            data.rows = this.rows;
            data.columns = this.columns;
            data.winningColor = this.winningColor;
            data.colorRules = this.mapToObject(this.colorRules);
            data.squares = this.squaresToData();
            return data;
        };
        Grid.prototype.deserialize = function (data) {
            this.columns = data.columns;
            this.rows = data.rows;
            this.colorRules = this.objectToMap(data.colorRules);
            this.setWinningColor(data.winningColor);
            console.log('winning color');
            console.log(FloodTactics.ColorHelper.toString(data.winningColor));
            this.initialize();
            this.squaresFromData(data.squares);
            this.chooseBackgroundFromSize();
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
            var map = new Map();
            for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
                var k = _a[_i];
                map.set(Number(k), obj[k]);
            }
            return map;
        };
        Grid.prototype.squaresToData = function () {
            var data = [];
            for (var i = 0; i < this.columns; i++) {
                data[i] = [];
                for (var j = 0; j < this.rows; j++) {
                    data[i][j] = this.squares[i][j].serialize();
                }
            }
            return data;
        };
        Grid.prototype.squaresFromData = function (data) {
            for (var i = 0; i < this.columns; i++) {
                for (var j = 0; j < this.rows; j++) {
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
        Grid.prototype.chooseBackgroundFromSize = function () {
            if (this.columns == 6 && this.rows == 6) {
                if (this.key == 'background') {
                    this.x += 166;
                }
                this.key = 'backgroundSquare';
            }
            else if (this.columns == 12 && this.rows == 6) {
                if (this.key == 'backgroundSquare') {
                    this.x -= 166;
                }
                this.key = 'background';
            }
            this.loadTexture(this.key);
        };
        Grid.prototype.initialize = function () {
            if (typeof this.columns == 'undefined' && typeof this.rows == 'undefined') {
                this.columns = 12;
                this.rows = 6;
            }
            if (typeof this.winningColor == 'undefined') {
                this.setWinningColor(this.getRandomActiveColor());
            }
            if (this.squares.length == 0) {
                var power = 1;
                var directDirections = [];
                directDirections[0] = new Phaser.Point(-1, 0);
                directDirections[1] = new Phaser.Point(1, 0);
                directDirections[2] = new Phaser.Point(0, -1);
                directDirections[3] = new Phaser.Point(0, 1);
                var redType = new FloodTactics.SquareType(FloodTactics.Color.Red, power, directDirections);
                var blueType = new FloodTactics.SquareType(FloodTactics.Color.Blue, power, directDirections);
                var blackType = new FloodTactics.SquareType(FloodTactics.Color.Black, power, directDirections);
                var violetType = new FloodTactics.SquareType(FloodTactics.Color.Violet, power, directDirections);
                var greenType = new FloodTactics.SquareType(FloodTactics.Color.Green, power, directDirections);
                var transparentType = new FloodTactics.SquareType(FloodTactics.Color.Transparent, power, directDirections);
                var types = [];
                types.push(redType);
                types.push(blackType);
                types.push(blueType);
                types.push(violetType);
                types.push(greenType);
                types.push(transparentType);
                var number = 3;
                //konec dat pro čtverce
                var max = new Phaser.Point(this.columns - 1, this.rows - 1);
                for (var i = 0; i < this.columns; i++) {
                    this.squares[i] = [];
                    for (var j = 0; j < this.rows; j++) {
                        this.squares[i][j] = this.createSquareFromType(i, j, max, Phaser.ArrayUtils.getRandomItem(types), number);
                        _super.prototype.addChild.call(this, this.squares[i][j]);
                    }
                }
                this.chooseBackgroundFromSize();
                //kopírování čverců
                this.initialSquares = this.squaresToData();
            }
            this.initialized = true;
        };
        Grid.prototype.getRandomActiveColor = function () {
            var pickedColor;
            var colors = [];
            this.colorRules.forEach(function (values, key) {
                colors.push(key);
            });
            do {
                pickedColor = Phaser.ArrayUtils.getRandomItem(colors);
            } while (!this.isColorActive(pickedColor));
            return pickedColor;
        };
        Grid.prototype.isColorActive = function (color) {
            return this.getInactiveColors().indexOf(color) == -1;
        };
        Grid.prototype.setWinningColor = function (color) {
            this.winningColor = color;
            if (typeof this.level.winChecker != 'undefined') {
                this.level.winChecker.setData(color);
            }
        };
        return Grid;
    })(Phaser.Sprite);
    FloodTactics.Grid = Grid;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Grid.js.map