/// <reference path="references.ts"/>
var Rect = (function () {
    function Rect(x, y, height, width) {
        if (x == null) {
            this.x = Math.floor(Math.random() * (640 - 30));
        }
        else {
            this.x = x;
        }
        if (y == null) {
            this.y = Math.floor(Math.random() * (480 - 30));
        }
        else {
            this.y = y;
        }
        this.height = height;
        this.width = width;
    }
    Rect.prototype.draw = function (context) {
        context.fillRect(this.x, this.y, this.height, this.width);
    };
    Rect.prototype.update = function () {
    };
    return Rect;
})();
//# sourceMappingURL=rect.js.map