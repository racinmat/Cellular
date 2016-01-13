/// <reference path="references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var Utils = (function () {
        function Utils() {
        }
        //na download jsonu s daty
        Utils.setFile = function (data, fileName, fileType) {
            // Set objects for file generation.
            var blob, url, a;
            // Set data on blob.
            blob = new Blob([data], { type: fileType });
            // Set view.
            if (blob) {
                // Read blob.
                url = window.URL.createObjectURL(blob);
                // Create link.
                a = document.createElement("a");
                // Set link on DOM.
                document.body.appendChild(a);
                // Set link's visibility.
                a.style = "display: none";
                // Set href on link.
                a.href = url;
                // Set file name on link.
                a.download = fileName;
                // Trigger click of link.
                a.click();
                // Clear.
                window.URL.revokeObjectURL(url);
            }
            else {
            }
        };
        Utils.download = function (data) {
            // Get time stamp for fileName.
            var stamp = new Date().getTime();
            var fileType = "text/json;charset=UTF-8";
            this.setFile(data, "game_" + stamp + ".json", fileType);
        };
        Utils.transpose = function (a) {
            // Calculate the width and height of the Array
            var w = a.length ? a.length : 0, h = a[0] instanceof Array ? a[0].length : 0;
            // In case it is a zero matrix, no transpose routine needed.
            if (h === 0 || w === 0) {
                return [];
            }
            /**
             * @var {Number} i Counter
             * @var {Number} j Counter
             * @var {Array} t Transposed data is stored in this array.
             */
            var i, j, t = [];
            // Loop through every item in the outer array (height)
            for (i = 0; i < h; i++) {
                // Insert a new row (array)
                t[i] = [];
                // Loop through every item per item in outer array (width)
                for (j = 0; j < w; j++) {
                    // Save transposed data.
                    t[i][j] = a[j][i];
                }
            }
            return t;
        };
        return Utils;
    })();
    FloodTactics.Utils = Utils;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Utils.js.map