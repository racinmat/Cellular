/// <reference path="references.ts"/>

module FloodTactics {

    export class Game extends Phaser.Game {

        constructor() {

            super(800, 800, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Level', Level, false);

            this.state.start('Boot');
        }

    }

}

window.onload = () => {

    var game = new FloodTactics.Game();

};