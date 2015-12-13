/// <reference path="references.ts"/>

module FloodTactics {

    export class LevelDone extends Phaser.State {

        tween : Phaser.Tween;

        create() {
            var popup : Phaser.Sprite = this.game.add.sprite(400, 400, 'levelCompleted');
            this.tween = this.game.add.tween(popup);
            this.tween.to( { x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
            this.tween.start();
        }

    }

}