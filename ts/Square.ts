/// <reference path="references.ts"/>

module FloodTactics {

    export class Square extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'yellow', 0);
            this.game.add.existing(this);
        }

        update() {
            //todo: sem dát klikání
        }

    }

}