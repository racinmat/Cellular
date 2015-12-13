/// <reference path="references.ts"/>

module FloodTactics {

    export class Square extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'simon', 0);

            this.anchor.setTo(0.5, 0);

            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);

            game.add.existing(this);

        }

        update() {
            //todo: sem dát klikání
        }

    }

}