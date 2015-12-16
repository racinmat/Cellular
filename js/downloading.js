
/* WIP */
$( "#blob" ).click(function() {
    var data = [ { foo: "bar", goo: "gaa" }, { yep: "yeah", nope: "nah" } ];
    download( data );
});

function setFile( data, fileName, fileType ) {
    console.log(data);
    console.log(fileName);
    console.log(fileType);
    // Set objects for file generation.
    var blob, url, a, extension;

    // Get time stamp for fileName.
    var stamp = new Date().getTime();

    // Set MIME type and encoding.
    fileType = ( fileType || "text/json;charset=UTF-8" );
    extension = fileType.split( "/" )[1].split( ";" )[0];
    // Set file name.
    fileName = ( fileName || "ActiveVoice_" + stamp + "." + extension );

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

function download( data ) {
    var result = "";


    result = JSON.stringify(data);
    console.log(result);

    setFile( result );
}