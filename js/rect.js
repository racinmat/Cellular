var Rect = (function () {
    function Rect() {
        this.x = Math.floor(Math.random() * (640 - 30));
        this.y = Math.floor(Math.random() * (480 - 30));
        this.velocity = Math.random() > 0.5 ? -1 : 1;
    }
    Rect.prototype.draw = function (context) {
        context.fillRect(this.x, this.y, 30, 30);
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