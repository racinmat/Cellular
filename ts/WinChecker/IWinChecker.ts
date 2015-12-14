/// <reference path="../references.ts"/>
module FloodTactics {

    export interface IWinChecker {
        checkWin(grid : Grid) : boolean;
        getDescription() : string;
    }

}
