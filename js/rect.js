/// <reference path="references.ts"/>
var Rect = (function () {
    function Rect(x, y, size) {
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
        this.size = size;
        this.velocity = Math.random() > 0.5 ? -1 : 1;
    }
    Rect.prototype.draw = function (context) {
        context.fillRect(this.x, this.y, this.size, this.size);
    };
    Rect.prototype.update = function () {
        if (this.y < 0) {
            this.velocity = 10;
        }
        else if (this.y > 450) {
            this.velocity = -5;
        }
        this.y += this.velocity;
    };
    return Rect;
})();
//# sourceMappingURL=rect.js.map