var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var TutorialLevel = (function (_super) {
        __extends(TutorialLevel, _super);
        function TutorialLevel() {
            _super.apply(this, arguments);
        }
        //init se volá před createm
        TutorialLevel.prototype.init = function (levelName) {
            _super.prototype.init.call(this, levelName);
            this.grid = new FloodTactics.Grid(this.game, 38, 47, 'backgroundSquare');
            if (levelName != undefined) {
                this.grid.deserialize(games[levelName]);
            }
        };
        TutorialLevel.prototype.create = function () {
            _super.prototype.create.call(this);
            var notebook = this.game.add.sprite(582, 476, 'notebook');
            notebook.scale.set(0.25);
            this.popupOne();
        };
        TutorialLevel.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        TutorialLevel.prototype.popupOne = function () {
            var _this = this;
            var content = "Welcome to Cellular!\n" +
                "Your goal is to help a particular cell to dominate the field.\n" +
                "In every level, we will tell you which cell needs your help.\n" +
                "Now, the blue cell needs your help.";
            var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
            text.maxWidth = 204; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            var button = this.game.add.button(620, 770, 'nextButton', function () {
                text.destroy(true); //destroyChildren = true;
                button.destroy(true); //destroyChildren = true;
                _this.popupTwo();
            }, this);
            button.scale.set(0.25);
        };
        TutorialLevel.prototype.popupTwo = function () {
            var _this = this;
            var content = "Next to this text is rules table, where you can see the rules for each cell." +
                "Each cell can absorb some other cells, but not all of them! " +
                "In this level, blue spreads over black and red, etc.";
            var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
            text.maxWidth = 204; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            var button = this.game.add.button(620, 770, 'nextButton', function () {
                text.destroy(true); //destroyChildren = true;
                button.destroy(true); //destroyChildren = true;
                _this.popupThree();
            }, this);
            button.scale.set(0.25);
        };
        TutorialLevel.prototype.popupThree = function () {
            var _this = this;
            var content = "Lets see, how absorption works!\n" +
                "Here we have blue cell.\n" +
                "It will absorb all red and black cells next to it, but green and \n" +
                "violet cells will remain unabsorbed. Now, click on the blue cell.";
            var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
            text.maxWidth = 204; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            var button = this.game.add.button(620, 770, 'nextButton', function () {
                text.destroy(true); //destroyChildren = true;
                button.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.25);
            this.grid.onClick.push(function (square) {
                if (square.getColor() == FloodTactics.Color.Blue) {
                    _this.popupFour();
                    return true;
                }
                return false;
            });
        };
        TutorialLevel.prototype.popupFour = function () {
            var _this = this;
            var content = "Well done. Now you have 3 blue cells, " +
                "but green and violet cells are still there. " +
                "As seen from rules table, green cells can be absorbed by red and violet. " +
                "Click on any violet cell next to a green one.";
            var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
            text.maxWidth = 204; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            var button = this.game.add.button(620, 770, 'nextButton', function () {
                text.destroy(true); //destroyChildren = true;
                button.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.25);
            this.grid.onClick.push(function (square) {
                var pos = square.getGridPosition();
                var violetNeighborOfGreen = (pos.x == 3 && pos.y == 1) || (pos.x == 3 && pos.y == 3) || (pos.x == 4 && pos.y == 2); //nějaký žlutý soused zeléného čtverce
                violetNeighborOfGreen = violetNeighborOfGreen && square.getColor() == FloodTactics.Color.Yellow;
                if (violetNeighborOfGreen) {
                    _this.popupFive();
                    return true;
                }
                return false;
            });
        };
        TutorialLevel.prototype.popupFive = function () {
            var _this = this;
            var content = "Well done. Now you have only blue and violet cells, and black cell in the corner.\n" +
                "To get rid of all violet cells, you have to stimulate black or red cells. " +
                "Now, click on the black cell.";
            var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
            text.maxWidth = 204; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            var button = this.game.add.button(620, 770, 'nextButton', function () {
                text.destroy(true); //destroyChildren = true;
                button.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.25);
            this.grid.onClick.push(function (square) {
                if (square.getColor() == FloodTactics.Color.Brown) {
                    _this.popupSix();
                    return true;
                }
                return false;
            });
        };
        TutorialLevel.prototype.popupSix = function () {
            var content = "Well done. As you see, black cell absorbs violet and blue absorbs black. " +
                "With this in mind, completing the level should be piece of cake. " +
                "Remember, level is completed, when all cells are blue.";
            var text = this.game.add.bitmapText(622, 513, 'sego', content, 28);
            text.maxWidth = 204; //zalamování, aby byl text na více řádků, pokud je moc dlouhý
            var button = this.game.add.button(620, 770, 'nextButton', function () {
                text.destroy(true); //destroyChildren = true;
                button.destroy(true); //destroyChildren = true;
            }, this);
            button.scale.set(0.25);
        };
        return TutorialLevel;
    })(FloodTactics.AbstractLevel);
    FloodTactics.TutorialLevel = TutorialLevel;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=TutorialLevel.js.map