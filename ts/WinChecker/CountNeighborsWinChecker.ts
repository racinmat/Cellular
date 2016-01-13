/// <reference path="../references.ts"/>
module FloodTactics {

    export class CountNeighborsWinChecker implements IWinChecker {

        checkWin(grid : Grid) : boolean {
			if(!grid.initialized) {
			    return false;
			}

            for(var row of grid.getSquares()) {
                for(var square of row) {
					var sameColorNeighborsCount : number = 0;
	                for(var neighbor of grid.getNeighbors(square)) {
						if(neighbor.getSquareType() == square.getSquareType()) {
						    sameColorNeighborsCount++;
						}
	                }
                    if(square.getNumber() != sameColorNeighborsCount) {
                        return false;
                    }
                }
            }
            return true;
        }

        getDescription() : string {
            return "Every square must same equal its number and amount of neighbors with same color as color of the square.";
        }

		setData(args : any) {

		}

    }

}
