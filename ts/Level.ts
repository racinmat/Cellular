/// <reference path="references.ts"/>

module FloodTactics {

    export class Level extends AbstractLevel {

        create() {
	        super.create();
	        var button = this.game.add.button(180, 560, 'button', () => {this.saveGame();}, this);
	        button.scale.set(0.2);
	        button.anchor.set(0.5);
	        var style = { font: "25px Arial", fill: "#ffffff", align: "center" };
	        var buttonText = this.game.add.text(180, 560, "save level", style);
	        buttonText.anchor.set(0.5);
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