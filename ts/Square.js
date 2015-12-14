/// <reference path="references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FloodTactics;
(function (FloodTactics) {
    var Square = (function (_super) {
        __extends(Square, _super);
        function Square(game, x, y, grid, position, max, squareType, number) {
            _super.call(this, game, x, y, FloodTactics.ColorHelper.toString(squareType.color), 0);
            this.grid = grid;
            this.gridPosition = position;
            this.squareType = squareType;
            this.max = max;
            this.number = number;
            this.initialize();
        }
        Square.prototype.initialize = function () {
            var _this = this;
            this.showNumber = false; //určuje, zda se vypíše číslo či ne
            this.inputEnabled = true;
            this.game.add.existing(this);
            var clicked = function (square) {
                //menší hack?, abych rozlišil, jakým tlačítkem se kliknulo
                var leftButton = _this.game.input.activePointer.leftButton; //nechápu proč, ale i když je v typescriptu napsáno, že to vrací boolean, tak to ve skutečnosti vrací objekt Phaser.DeviceButton
                var rightButton = _this.game.input.activePointer.rightButton;
                if (leftButton.isDown) {
                    square.expand();
                }
                else if (rightButton.isDown) {
                    square.flood();
                }
            };
            this.events.onInputDown.add(clicked, this);
            this.anchor.setTo(0.5, 0.5);
            if (this.showNumber) {
                this.text = this.game.add.bitmapText(this.x, this.y, 'arial', String(this.number), 40);
                this.text.anchor.setTo(0.5, 0.5);
            }
        };
        Square.prototype.flood = function () {
            this.decrementNumber();
            this.grid.flood(this);
        };
        Square.prototype.expand = function () {
            this.decrementNumber();
            this.grid.expand(this);
        };
        Square.prototype.getNeighborPoints = function () {
            console.log("neighbors:");
            var neighbors = [];
            for (var _i = 0, _a = this.squareType.directions; _i < _a.length; _i++) {
                var direction = _a[_i];
                for (var i = 1; i <= this.squareType.power; i++) {
                    var x = this.gridPosition.x + i * direction.x;
                    var y = this.gridPosition.y + i * direction.y;
                    if (x >= 0 && y >= 0 && x <= this.max.x && y <= this.max.y) {
                        neighbors.push(new Phaser.Point(x, y));
                    }
                }
            }
            return neighbors;
        };
        Square.prototype.setSquareType = function (squareType) {
            this.squareType = squareType;
            this.key = FloodTactics.ColorHelper.toString(squareType.color);
            this.loadTexture(this.key);
        };
        Square.prototype.getSquareType = function () {
            return this.squareType;
        };
        Square.prototype.getNumber = function () {
            return this.number;
        };
        Square.prototype.decrementNumber = function () {
            if (this.number > 0) {
                this.number--;
                if (this.showNumber) {
                    this.text.setText(String(this.number));
                }
            }
        };
        //v budoucnu na natahování z jsonu
        Square.prototype.deserialize = function (data) {
            this.number = data.number;
            this.setSquareType(data.squareType);
        };
        //v budoucnu na ukládání do jsonu
        Square.prototype.serialize = function () {
            var data = {};
            data.number = this.number;
            data.squareType = this.squareType;
            return data;
        };
        Square.prototype.getColor = function () {
            return this.squareType.color;
        };
        return Square;
    })(Phaser.Sprite);
    FloodTactics.Square = Square;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Square.js.map