/// <reference path="references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Black"] = 1] = "Black";
        Color[Color["Blue"] = 2] = "Blue";
        Color[Color["Violet"] = 3] = "Violet";
        Color[Color["Green"] = 4] = "Green";
        Color[Color["Transparent"] = 5] = "Transparent";
    })(FloodTactics.Color || (FloodTactics.Color = {}));
    var Color = FloodTactics.Color;
    var ColorHelper = (function () {
        function ColorHelper() {
        }
        ColorHelper.toString = function (color) {
            switch (color) {
                case Color.Blue: return "blue";
                case Color.Violet: return "violet";
                case Color.Black: return "black";
                case Color.Red: return "red";
                case Color.Green: return "green";
                case Color.Transparent: return "empty";
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