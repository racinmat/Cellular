/// <reference path="../references.ts"/>
module FloodTactics {

    export class DiagonalProvider implements INeighborsProvider {

        max : Phaser.Point;

        constructor(max : Phaser.Point) {
            this.max = max;
        }

        getNeighbors(point : Phaser.Point) : Phaser.Point[] {
            var neighbors : Phaser.Point[];
            neighbors = [];
            if(point.x > 0 && point.y > 0) {
                neighbors.push(new Phaser.Point(point.x - 1, point.y - 1));
            }
            if(point.x > 0 && point.y < this.max.y) {
                neighbors.push(new Phaser.Point(point.x - 1, point.y + 1));
            }
            if(point.x < this.max.x && point.y > 0) {
                neighbors.push(new Phaser.Point(point.x + 1, point.y - 1));
            }
            if(point.x < this.max.x && point.y < this.max.y) {
                neighbors.push(new Phaser.Point(point.x + 1, point.y + 1));
            }

            return neighbors;
        }

    }

}
