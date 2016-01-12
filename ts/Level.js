var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="references.ts"/>
var FloodTactics;
(function (FloodTactics) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.apply(this, arguments);
        }
        //init se volá před createm
        Level.prototype.init = function (levelName) {
            _super.prototype.init.call(this, levelName);
            this.grid = new FloodTactics.Grid(this.game, 38, 47, 'backgroundSquare');
            if (levelName != undefined) {
                this.grid.deserialize(games[levelName]);
            }
            this.grid.initialize();
        };
        Level.prototype.create = function () {
            _super.prototype.create.call(this);
            var notebook = this.game.add.sprite(582, 476, 'notebook');
            notebook.scale.set(0.25);
        };
        Level.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        Level.prototype.saveGame = function () {
            var json = this.grid.toJson();
            this.download(json);
        };
        //na download jsonu s daty
        Level.prototype.setFile = function (data, fileName, fileType) {
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
        Level.prototype.download = function (data) {
            // Get time stamp for fileName.
            var stamp = new Date().getTime();
            var fileType = "text/json;charset=UTF-8";
            this.setFile(data, "game_" + stamp + ".json", fileType);
        };
        return Level;
    })(FloodTactics.AbstractLevel);
    FloodTactics.Level = Level;
})(FloodTactics || (FloodTactics = {}));
//# sourceMappingURL=Level.js.map