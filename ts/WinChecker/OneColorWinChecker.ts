/// <reference path="../references.ts"/>
module FloodTactics {

    export class OneColorWinChecker implements IWinChecker {
        color : Color;

        constructor(color:Color) {
            this.color = color;
        }

        checkWin(grid : Grid) : boolean {
			if(!grid.initialized) {
				return false;
			}

            for(var row of grid.getSquares()) {
                for(var square of row) {
                    if(square.getColor() != this.color && grid.isColorActive(square.getColor())) {	//false, pokud se liší od zadané barvy a není v poli neaktivních barev
                        return false;
                    }
                }
            }
            return true;
        }

        getDescription() : string {
            return "All squares in grid must \nbe in " + ColorHelper.toString(this.color) + " color.";
        }

		setData(args : any) {
			this.color = args;
		}

	}

}
