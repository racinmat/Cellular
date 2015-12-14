/// <reference path="../references.ts"/>
module FloodTactics {

    export class OneColorWinChecker implements IWinChecker {
        color : Color;

        constructor(color:Color) {
            this.color = color;
        }

        checkWin(squares : Square[][]) : boolean {
            for(var row of squares) {
                for(var square of row) {
                    if(square.getColor() != this.color) {
                        return false;
                    }
                }
            }
            return true;
        }

        getDescription() : string {
            return "All squares in grid must be in " + ColorHelper.toString(this.color) + " color.";
        }

    }

}
