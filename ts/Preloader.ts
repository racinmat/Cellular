/// <reference path="references.ts"/>

module FloodTactics {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.image('background', 'images/background.jpg');
            this.load.image('yellow', 'images/yellow.png');
            this.load.image('brown', 'images/brown.png');
            this.load.image('red', 'images/red.png');
            this.load.image('blue', 'images/blue.png');

        }

        create() {

            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

    }

}
