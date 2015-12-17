/// <reference path="references.ts"/>

module FloodTactics {

    export class AbstractLevel extends Phaser.State {

        protected grid : Grid;
        protected winChecker : IWinChecker;
        protected tween : Phaser.Tween;
		protected winningDescription : Phaser.BitmapText;

        create() {
	        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }   //zablokování vyskočení menu u kliknutí pravým tlačítkem
            this.grid = new Grid(this.game, 0, 0);
	        //zde se nastavuje vítězná podmínka
	        this.winChecker = new OneColorWinChecker(Color.Blue);
	        //this.winChecker = new CountNeighborsWinChecker();
            this.tween = null;
            this.winningDescription = this.game.add.bitmapText(400, 420, 'arial', "Winning condition: " + this.winChecker.getDescription(), 32);
	        this.winningDescription.maxWidth = 700;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý
	        this.winningDescription.anchor.set(0.5);

	        var button = this.game.add.button(180, 480, 'button', () => {this.grid.restartLevel();}, this);
	        button.scale.set(0.2);
	        button.anchor.set(0.5);
	        var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
	        var buttonText = this.game.add.text(180, 480, "reset level", style);
	        buttonText.anchor.set(0.5);
        }

        update() {
            if(this.winChecker.checkWin(this.grid)) {
                if(this.tween === null) {
                    var popup : Phaser.Sprite = this.game.add.sprite(400, 400, 'levelCompleted');
                    popup.anchor.setTo(0.5, 0.5);
                    popup.scale.set(0.2);

                    this.tween = this.game.add.tween(popup.scale);
                    this.tween.to( { x: 1, y: 1 }, 2000, Phaser.Easing.Elastic.Out, true);
                    this.tween.onComplete.add(() => {this.game.state.start('Level');});
                }
            }
        }

    }

}