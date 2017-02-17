﻿#target Illustrator#targetengine 'main'var docRef = app.activeDocument;function CreateSwatches() {	var swatchWidth = 150,		swatchHeight = 75,		swatchPadding = 10,		offsetX = 0,		offsetY = 0,		activeArtboard = docRef.artboards[docRef.artboards.getActiveArtboardIndex()];    // loop through all the spot "global" swatches in the document	for (var i = 0; i < docRef.spots.length; i++) {		if (docRef.spots[i].name !== "[Registration]") {		    var currSwatch = docRef.spots[i],		    	color = currSwatch.color,		    	currRGB = ("R: " + color.red + ", G: " + color.green + ", B: " + color.blue),		    	currHex = ("#" + toHex(color.red) + toHex(color.green) + toHex(color.blue)),		    	swatchPosY = ((swatchHeight + swatchPadding) * (i-1) + swatchPadding) - activeArtboard.artboardRect[1],	// -1 is to account for the [Registration] swatch 				swatchPosX = swatchPadding + activeArtboard.artboardRect[0],				swatch = docRef.pathItems.rectangle(-swatchPosY, swatchPosX, swatchWidth, swatchHeight),				swatchBounds = swatch.geometricBounds,				text = docRef.textFrames.pointText([0,0]);			// for some reason this allows us to assign the swatch to the newly created rectangle			var newSpotColor = new SpotColor(); 			newSpotColor.spot = currSwatch;			swatch.fillColor = newSpotColor;			swatch.stroked = false;			text.contents = currSwatch.name + "\n" + currRGB + "\n" + currHex;			var textOffY = (((swatchBounds[3]-swatchBounds[1])/2) + swatchBounds[1]) + (text.height/2);			var textOffX = (((swatchBounds[2]-swatchBounds[0])/2) + swatchBounds[0]) - (text.width/2);			text.position = new Array (textOffX, textOffY);			// group the new objects for easy organization			var swatchGroup = docRef.groupItems.add();			text.move(swatchGroup, ElementPlacement.PLACEATEND);			swatch.move(swatchGroup, ElementPlacement.PLACEATEND);			swatchGroup.name = "swatch_" + currSwatch.name;		}	}}// hex conversion from: http://www.javascripter.net/faq/rgbtohex.htmfunction toHex(n) {	 n = parseInt(n,10);	 if (isNaN(n)) return "00";	 n = Math.max(0,Math.min(n,255));	 return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);}CreateSwatches();/*				[0]xMin,	[1]yMin,	[2]xMax,	[3]yMaxswatch bounds: 	10,			-120,		210,		-220			// vertical center of rect 		text vertical centeroffsetY = 	(((yMax-yMin)/2) + yMin))	-	(text.height/2)offsetX =	(((xMax-Xmin)/2) + xMin)	-	(text.width/2)*/