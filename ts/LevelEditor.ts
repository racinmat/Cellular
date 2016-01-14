/// <reference path="references.ts"/>

class Square {
	public number : number;
	public squareType : FloodTactics.SquareType;
}

var select : JQuery = $('#level');
for (var level in games)  {
	var option : HTMLOptionElement = document.createElement('option');
	option.text = level;
	option.value = level;
	select.append(option);
}

var editedGrid : Square[][] = [];
var selectedLevel : string;

select.change(function() {
	selectedLevel = $(this).find(":selected").val();
	editedGrid = games[selectedLevel].squares;
	//var editedGridToRender = FloodTactics.Utils.transpose(editedGrid);

	var content = $('#content');
	content.children().remove();
	var i : number = 0;
	for (var row of editedGrid) {
		var div : HTMLDivElement = document.createElement("div");
		var j : number = 0;
		content.append(div); // put it into the DOM
		for (var element of row) {
			var input : HTMLInputElement = document.createElement("input");
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

$('#saveLevel').click(() => {
	//editedGrid = FloodTactics.Utils.transpose(editedGrid);
	var i : number = 0;
	for (var row of editedGrid) {
		var j : number = 0;
		var div : HTMLDivElement = document.createElement("div");
		$('#content').append(div); // put it into the DOM
		for (var element of row) {
			var input = $('#' + String(i) + '-' + String(j));
			element.squareType.color = parseInt(input.val());
			j++;
		}
		i++;
	}
	games[selectedLevel].squares = editedGrid;
	FloodTactics.Utils.download(JSON.stringify(games[selectedLevel], null, 4));
});


