/// <reference path="references.ts"/>
declare var games: string[];	//proměnná je ze souboru game.php

module FloodTactics {

    export class Level extends AbstractLevel {

		//init se volá před createm
		init(levelName : string) {
			super.init(levelName);
			this.grid = new Grid(this.game, 204, 47, 'backgroundSquare', this, Color.Blue);
			if(levelName != undefined) {
				this.grid.deserialize(games[levelName]);
			}
			this.grid.initialize();
		}

        create() {
	        super.create();

			var winningDescription = this.game.add.bitmapText(622, 515, 'sego', "Winning condition: " + this.winChecker.getDescription(), 28);
			winningDescription.maxWidth = 204;    //zalamování, aby byl text na více řádků, pokud je moc dlouhý

			var score = this.game.add.sprite(620, 770, 'score');
			score.scale.set(0.25);
			var content : string = String(this.game.score);
			var text = this.game.add.bitmapText(740, 780, 'sego', content, 28);
        }

        update() {
	        super.update();
        }

	    saveGame() {
		    var json : string = this.grid.toJson();
		    this.download(json);
	    }

		//na download jsonu s daty
	    setFile( data, fileName, fileType ) {
	        // Set objects for file generation.
	        var blob, url, a;

	        // Set data on blob.
	        blob = new Blob( [ data ], { type: fileType } );

	        // Set view.
	        if ( blob ) {
			    // Read blob.
			    url = window.URL.createObjectURL( blob );

			    // Create link.
			    a = document.createElement( "a" );
			    // Set link on DOM.
			    document.body.appendChild( a );
			    // Set link's visibility.
			    a.style = "display: none";
			    // Set href on link.
			    a.href = url;
			    // Set file name on link.
			    a.download = fileName;

			    // Trigger click of link.
			    a.click();

			    // Clear.
			    window.URL.revokeObjectURL( url );
	        } else {
			    // Handle error.
	        }
        }

	    download(data : string ) {

		    // Get time stamp for fileName.
		    var stamp = new Date().getTime();

		    var fileType = "text/json;charset=UTF-8" ;
		    this.setFile(data, "game_" + stamp + ".json", fileType);
        }
    }

}