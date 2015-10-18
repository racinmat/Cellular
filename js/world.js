/// <reference path="references.ts"/>
var World = (function () {
    function World() {
        this.buildings = [];
        for (var i = 0; i < 10; i++) {
            this.buildings[i] = [];
            for (var j = 0; j < 10; j++) {
                this.buildings[i][j] = 0;
            }
        }
        for (var i = 0; i < 5; i++) {
            this.buildings[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 10)] = 1; //číslo 1 je nějaký důl
        }
        this.squareSize = 60;
    }
    World.prototype.draw = function (context) {
        var dark = true;
        for (var i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].length % 2 == 0) {
                dark = !dark;
            }
            for (var j = 0; j < this.buildings[i].length; j++) {
                var oldStyle = context.fillStyle;
                if (dark) {
                    context.fillStyle = "#88888B";
                }
                else {
                    context.fillStyle = "#C4C4C5";
                }
                dark = !dark;
                if (this.buildings[i][j] == 1) {
                    context.fillStyle = "#4DB8FF";
                }
                new Rect(this.squareSize * i, 100 + this.squareSize * j, this.squareSize, this.squareSize).draw(context);
                context.fillStyle = oldStyle;
            }
        }
    };
    return World;
})();
//# sourceMappingURL=world.js.map