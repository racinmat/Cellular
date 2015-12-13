/// <reference path="references.ts"/>

module FloodTactics {

    export class Square extends Phaser.Sprite {

        grid : Grid;
        gridPosition : Phaser.Point;
        private color : Color;
        private power : number;
        private directions : Phaser.Point[];
        max : Phaser.Point;

        constructor(game: Phaser.Game, x: number, y: number, grid : Grid, position : Phaser.Point, power : number, directions : Phaser.Point[], max : Phaser.Point, color : Color) {
            super(game, x, y, ColorHelper.getImage(color), 0);
            this.game.add.existing(this);
            this.grid = grid;
            this.gridPosition = position;
            this.color = color;
            this.power = power;
            this.directions = directions;
            this.max = max;

            this.inputEnabled = true;

            var expand = (square : Square) => {
                return this.grid.expand(square);
            };
            this.events.onInputDown.add(expand, this);
        }

        getNeighborPoints() : Phaser.Point[] {
            var neighbors : Phaser.Point[] = [];
            for(var direction of this.directions) {
                for (var i = 1; i <= this.power; i++) {
                    var x = this.gridPosition.x + i * direction.x;
                    var y = this.gridPosition.y + i * direction.y;
                    if(x >= 0 && y >= 0 && x <= this.max.x && y <= this.max.y) {
                        neighbors.push(new Phaser.Point(x, y));
                    }
                }
            }
            return neighbors;
        }

        public setColor(color: Color) {
            this.color = color;
            this.key = ColorHelper.getImage(color);
            this.loadTexture(this.key);
        }

        public getColor() : Color {
            return this.color;
        }
    }

}
