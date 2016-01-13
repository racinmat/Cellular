/// <reference path="references.ts"/>

module FloodTactics {

    export class AbstractLevel extends Phaser.State {

		protected grid : Grid;
        public winChecker : IWinChecker;
        protected winningTween : Phaser.Tween;

		private soundIcon : Phaser.Button;

		init(levelName : string) {
			this.winChecker = new OneColorWinChecker(Color.Violet);
			var playground = this.game.add.sprite(0, 0, 'playground');
			playground.scale.set(0.25);
			this.grid = new Grid(this.game, 204, 47, 'backgroundSquare', this);
			if(levelName != undefined) {
				this.grid.deserialize(games[levelName]);
			}
			this.grid.initialize();
		}

        create() {
			this.game.sound.mute = this.game.muted;
	        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }   //zablokování vyskočení menu u kliknutí pravým tlačítkem
	        //zde se nastavuje vítězná podmínka
            this.winningTween = null;

			var menuButton = this.game.add.button(82, 546, 'buttonMenu', () => {this.game.state.start('Menu', true, false);}, this);
			menuButton.scale.set(0.25);

			var resetButton = this.game.add.button(82, 612, 'buttonReset', () => {this.grid.restartLevel();}, this);
			resetButton.scale.set(0.25);

			var generateButton = this.game.add.button(82, 678, 'buttonGenerate', () => {this.game.state.start('Level');}, this);
			generateButton.scale.set(0.25);

			var backgroundSound : Phaser.Sound = this.game.add.audio('backgroundSound');
			backgroundSound.play();
			var changeIcon = () => {
				//console.log('sound clicked');
				if(this.game.muted) {
					this.soundIcon.key = 'soundLoud';
				} else {
					this.soundIcon.key = 'soundSilent';
				}
				this.game.muted = !this.game.muted;
				this.game.sound.mute = this.game.muted;
				this.soundIcon.loadTexture(this.soundIcon.key);
			};
			this.soundIcon = this.game.add.button(82, 744, this.game.muted ? 'soundSilent' : 'soundLoud', changeIcon, this);
			//this.soundIcon.anchor.set(0.5);
			this.soundIcon.scale.set(0.25);

			var notebook = this.game.add.sprite(582, 476, 'notebook');
			notebook.scale.set(0.25);
		}

        update() {
            if(this.winChecker.checkWin(this.grid)) {
                if(this.winningTween === null) {
					this.game.score++;

                    var popup : Phaser.Sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'levelCompleted');
                    popup.anchor.setTo(0.5);
                    popup.scale.set(0.05);

                    this.winningTween = this.game.add.tween(popup.scale);
                    this.winningTween.to( { x: 0.3, y: 0.3 }, 2000, Phaser.Easing.Elastic.Out, true);
                    this.winningTween.onComplete.add(() => {this.game.state.start('Level');});

                }
            }
        }

    }

}