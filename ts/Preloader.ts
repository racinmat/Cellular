/// <reference path="references.ts"/>

module FloodTactics {

    export class Preloader extends Phaser.State {

        preload() {

            //  Load our actual games assets
            this.load.image('background', 'images/background.jpg');
            this.load.image('yellow', 'images/yellow.png');
            this.load.image('brown', 'images/brown.png');
            this.load.image('red', 'images/red.png');
            this.load.image('blue', 'images/blue.png');

        }

        create() {
            this.game.state.start('Level', true, false);
        }

    }

}
