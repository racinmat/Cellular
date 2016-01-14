/// <reference path="references.ts"/>
declare var games: string[];	//proměnná je ze souboru game.php

module FloodTactics {

    export class Level extends AbstractLevel {

		timeText : Phaser.BitmapText;
		timer : Phaser.Timer;
		timeToLose : Phaser.TimerEvent;
		treshold : number;

		//init se volá před createm
		init(levelName : string) {
			super.init(levelName);
		}

        create() {
	        super.create();

			var winningDescription = this.game.add.bitmapText(622, 515, 'sego', "Winning condition: " + this.winChecker.getDescription(), 28);
			winningDescription.maxWidth = 204;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý

			var score = this.game.add.sprite(620, 770, 'score');
			score.scale.set(0.25);
			var content : string = String(this.game.score);
			this.game.add.bitmapText(740, 780, 'sego', content, 28);


			//var button = this.game.add.button(180, 640, 'button', () => {this.saveGame();}, this);
			//button.scale.set(0.2);
			//button.anchor.set(0.5);
			//var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
			//var buttonText = this.game.add.text(0, 0, "save level", style);
			//button.addChild(buttonText);
			//buttonText.scale.set(5);
			//buttonText.anchor.set(0.5);

			this.treshold = 2;
			if(this.game.score > this.treshold) {
				var maxSeconds = 240;

				this.timer = this.game.time.create();
				this.timeToLose = this.timer.add((maxSeconds / (this.game.score - this.treshold)) * Phaser.Timer.SECOND, () => {
					this.game.score = 0;

					var popup : Phaser.Sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gameOver');
					popup.anchor.setTo(0.5);
					popup.scale.set(0.05);

					this.winningTween = this.game.add.tween(popup.scale);
					this.winningTween.to( { x: 0.3, y: 0.3 }, 2000, Phaser.Easing.Elastic.Out, true);

				}, this);
				this.timer.start();

				var timerBackground = this.game.add.sprite(620, 720, 'timer');
				this.timeText = this.game.add.bitmapText(300, 20, 'sego', content, 28);
				timerBackground.addChild(this.timeText);
				this.timeText.scale.set(5, 5);
				timerBackground.scale.set(0.25);
			}
        }

        update() {
	        super.update();
			if(this.game.score > this.treshold && typeof this.timeToLose != 'undefined') {
				var content : string = this.formatTime(Math.round((this.timeToLose.delay - this.timer.ms) / Phaser.Timer.SECOND));
				this.timeText.setText(content);
				this.timeText.update();
			}
        }

		formatTime(s) : string {
			// Convert seconds (s) to a nicely formatted and padded time string
			var minutes = "0" + Math.floor(s / 60);
			var seconds = "0" + (s - minutes * 60);
			return minutes.substr(-2) + ":" + seconds.substr(-2);
		}

	    saveGame() {
		    var json : string = this.grid.toJson();
		    Utils.download(json);
	    }

    }

}