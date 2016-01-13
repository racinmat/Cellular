/// <reference path="references.ts"/>
var Square = (function () {
    function Square() {
    }
    return Square;
})();
var select = $('#level');
for (var level in games) {
    var option = document.createElement('option');
    option.text = level;
    option.value = level;
    select.append(option);
}
var editedGrid = [];
var selectedLevel;
select.change(function () {
    selectedLevel = $(this).find(":selected").val();
    editedGrid = games[selectedLevel].squares;
    editedGrid = FloodTactics.Utils.transpose(editedGrid);
    var content = $('#content');
    content.children().remove();
    var i = 0;
    for (var _i = 0; _i < editedGrid.length; _i++) {
        var row = editedGrid[_i];
        var div = document.createElement("div");
        var j = 0;
        content.append(div); // put it into the DOM
        for (var _a = 0; _a < row.length; _a++) {
            var element = row[_a];
            var input = document.createElement("input");
            input.type = "text";
            input.style.width = String(50);
            input.style.height = String(50);
            input.value = element.squareType.color;
            input.id = String(i) + '-' + String(j);
            div.appendChild(input);
            j++;
        }
        i++;
    }
});
$('#saveLevel').click(function () {
    //editedGrid = FloodTactics.Utils.transpose(editedGrid);
    var i = 0;
    for (var _i = 0; _i < editedGrid.length; _i++) {
        var row = editedGrid[_i];
        var j = 0;
        var div = document.createElement("div");
        $('#content').append(div); // put it into the DOM
        for (var _a = 0; _a < row.length; _a++) {
            var element = row[_a];
            var input = $('#' + String(i) + '-' + String(j));
            element.squareType.color = parseInt(input.val());
            j++;
        }
        i++;
    }
    games[selectedLevel].squares = editedGrid;
    FloodTactics.Utils.download(JSON.stringify(games[selectedLevel], null, 4));
});
//# sourceMappingURL=LevelEditor.js.map