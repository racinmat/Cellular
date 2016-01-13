/// <reference path="references.ts"/>
module FloodTactics {

	export class Utils {

		//na download jsonu s daty
		private static setFile( data, fileName, fileType ) {
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

		public static download(data : string ) {

			// Get time stamp for fileName.
			var stamp = new Date().getTime();

			var fileType = "text/json;charset=UTF-8" ;
			this.setFile(data, "game_" + stamp + ".json", fileType);
		}
	}

}
