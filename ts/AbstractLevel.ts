/// <reference path="references.ts"/>

module FloodTactics {

    export class AbstractLevel extends Phaser.State {

        protected grid : Grid;
        protected winChecker : IWinChecker;
        protected winningTween : Phaser.Tween;
		protected winningDescription : Phaser.BitmapText;

		private soundIcon : Phaser.Button;
		private muted : boolean;

		init(levelName : string) {
			var playground = this.game.add.sprite(0, 0, 'playground');
			playground.scale.set(0.25);
		}

        create() {
			this.muted = true;
			this.game.sound.mute = this.muted;
	        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }   //zablokování vyskočení menu u kliknutí pravým tlačítkem
	        //zde se nastavuje vítězná podmínka
	        this.winChecker = new OneColorWinChecker(Color.Blue);
	        //this.winChecker = new CountNeighborsWinChecker();
            this.winningTween = null;
            this.winningDescription = this.game.add.bitmapText(400, 880, 'arial', "Winning condition: " + this.winChecker.getDescription(), 32);
	        this.winningDescription.maxWidth = 700;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
	        this.winningDescription.anchor.set(0.5);

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
				if(this.muted) {
					this.soundIcon.key = 'soundLoud';
				} else {
					this.soundIcon.key = 'soundSilent';
				}
				this.muted = !this.muted;
				this.game.sound.mute = this.muted;
				this.soundIcon.loadTexture(this.soundIcon.key);
			};
			this.soundIcon = this.game.add.button(82, 744, this.muted ? 'soundSilent' : 'soundLoud', changeIcon, this);
			//this.soundIcon.anchor.set(0.5);
			this.soundIcon.scale.set(0.25);
		}

        update() {
            if(this.winChecker.checkWin(this.grid)) {
                if(this.winningTween === null) {
                    var popup : Phaser.Sprite = this.game.add.sprite(400, 400, 'levelCompleted');
                    popup.anchor.setTo(0.5, 0.5);
                    popup.scale.set(0.2);

                    this.winningTween = this.game.add.tween(popup.scale);
                    this.winningTween.to( { x: 1, y: 1 }, 2000, Phaser.Easing.Elastic.Out, true);
                    this.winningTween.onComplete.add(() => {this.game.state.start('Level');});
                }
            }
        }

    }

}