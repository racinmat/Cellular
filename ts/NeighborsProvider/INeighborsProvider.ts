/// <reference path="../references.ts"/>

module FloodTactics {

    export interface INeighborsProvider {
        max : Phaser.Point;
        getNeighbors(point : Phaser.Point) : Phaser.Point[];
    }

}