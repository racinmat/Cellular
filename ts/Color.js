/// <reference path="references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Brown"] = 1] = "Brown";
        Color[Color["Blue"] = 2] = "Blue";
        Color[Color["Yellow"] = 3] = "Yellow";
        Color[Color["Green"] = 4] = "Green";
    })(FloodTactics.Color || (FloodTactics.Color = {}));
    var Color = FloodTactics.Color;
    var ColorHelper = (function () {
        function ColorHelper() {
        }
        ColorHelper.toString = function (color) {
            switch (color) {
                case Color.Blue: return "blue";
                case Color.Yellow: return "yellow";
                case Color.Brown: return "brown";
                case Color.Red: return "red";
                case Color.Green: return "green";
            }
        };
        ColorHelper.getRandom = function () {
            var keys = Object.keys(Color), index = Math.floor(Math.random() * keys.length), k = keys[index];
            if (typeof Color[k] === 'number')
                return Color[k];
            return parseInt(k, 10);
        };
        return ColorHelper;
    })();
    FloodTactics.ColorHelper = ColorHelper;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Color.js.map