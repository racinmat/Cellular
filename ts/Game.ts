/// <reference path="references.ts"/>

module FloodTactics {

    export class Game extends Phaser.Game {

		muted : boolean = false;
		score : number = 0;

        constructor() {

            super(898, 908, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
	        this.state.add('Menu', Menu, false);
            this.state.add('Level', Level, false);
	        this.state.add('TutorialLevel', TutorialLevel, false);
			this.state.add('Credits', Credits, false);

            this.state.start('Boot');
        }

    }

}

window.onload = () => {

    game = new FloodTactics.Game();

};