var docRef = app.activeDocument;
var swatchesFile = File (docRef.path + "/sample-color.json");

function ReplaceFromJSON () {
	if (swatchesFile.exists) {
		swatchesFile.open("r");
		var col = swatchesFile.read();
	    var data = eval("(" + col + ")");

	    // loop through all the spot "global" swatches in the document
		for (var i = 0; i < docRef.spots.length; i++) {
		    var currSwatch = docRef.spots[i];
			
			// loop through all the colors in the json file to see if there are matches
			for (var h = data.colors.length - 1; h >= 0; h--) {
			    if (currSwatch.name == data.colors[h].name) {
					var newColor = new RGBColor();
					newColor.red = data.colors[h].red;
					newColor.green = data.colors[h].green;
					newColor.blue = data.colors[h].blue;
			        currSwatch.color = newColor;
			    }
			};
		    
		}
	} else {
		alert("Couldn't find swatches json file");
	}
}