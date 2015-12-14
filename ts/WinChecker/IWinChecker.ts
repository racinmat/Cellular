/// <reference path="../references.ts"/>
module FloodTactics {

    export interface IWinChecker {
        checkWin(squares : Square[][]) : boolean;
        getDescription() : string;
    }

}
