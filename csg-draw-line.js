/*
*    Cs-Graph beta version, data-visualization with HTML5 Canvas API
*    Copyright (C) 2015 Pierre Bosquet
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.

*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*/


CsgDrawLine = function(graph) {
    this.drawLines = function() {	
	canvas = graph.getCanvas();
	var ctx = canvas.getContext("2d");

	//les points sont tracés après les barress (et seront donc au dessus des barres)
	for ( i = 0, j = 0 ; i < graph.nbRows - 1; i++) {
	    if (graph.options.getRowOpt(i).type == 'bar') {	
		ctx.strokeStyle = graph.options.getRowOpt(i).color;
		ctx.fillStyle = graph.options.getRowOpt(i).color;
		drawBar(ctx,i,j);	
		j++;
	    }
	}
	graph.rData.reset();
	for ( i = 0 ; i < graph.nbRows - 1; i++) {
	    if (graph.options.getRowOpt(i).type == 'point') {
		ctx.strokeStyle = graph.options.getRowOpt(i).color;
		ctx.fillStyle = graph.options.getRowOpt(i).color;
		drawPoint(ctx,i);
	    }
	}
	graph.rData.reset();
	for ( i = 0 ; i < graph.nbRows - 1; i++) {
	    ctx.lineWidth = graph.options.getRowOpt(i).lineWidth;	
	    ctx.strokeStyle = graph.options.getRowOpt(i).color;

	    if(graph.options.getRowOpt(i).type == 'dotted-line') {
		ctx.setLineDash([5,7]);	    
	    } else {
		ctx.setLineDash([]);
	    } 
	    
	    if (graph.options.getRowOpt(i).type == 'line' || graph.options.getRowOpt(i).type == 'dotted-line') {
		ctx.beginPath();
		init = 0;
		while (graph.rData.hasNext()) {
		    var nextK = graph.rData.currentKey();		
		    if (init === 0 && i > 0) {				
			ctx.moveTo(graph.getMX(nextK), graph.getMY(graph.rData.currentVal(i)));
			init++;
		    }
		    ctx.lineTo(graph.getMX(nextK), graph.getMY(graph.rData.currentVal(i)));								
		    console.info("x", graph.getMX(nextK),"y", graph.getMY(graph.rData.currentVal(i)));
		    
		    graph.rData.next();		
		}
		ctx.stroke();		
	    }	  	
	}
    };
    function drawPoint(ctx, rowNumber) {
	//graph.rData.reset();
	while (graph.rData.hasNext()) {
	    ctx.beginPath();
	    var nextK = graph.rData.currentKey();
	    ctx.lineWidth = 0;
	    ctx.arc( graph.getMX(nextK),
		     graph.getMY(graph.rData.currentVal(rowNumber)),
		     10,
		     0,
		     2*Math.PI
		   );
	    ctx.fill();
	    graph.rData.next();		
	    ctx.stroke();
	}	  

    }
    
    /**
       Par défaut on décalle la première barre vers la gauche et la dernière vers la droite
       On incrémente aussi la position x du coin supérieur gauche pour chaque barre
    */
    function drawBar(ctx, rowNumber, barNumber) {
	var barWidth = graph.options.barWidth;
	var rowPaddingR = 1;
	graph.rData.reset();
	var nbBar = 0;
	for (var _row in graph.options.rows) {
	    if (graph.options.rows[_row].type == 'bar')
		nbBar++;
	}
	while (graph.rData.hasNext()) {
	    ctx.beginPath();
	    var nextK = graph.rData.currentKey();
	    var xPos = parseInt(nextK)+graph.getMarginSize('l');
	    
	    if (nbBar % 2 == 1) {
		xPos -= barWidth/2;		
	    }
	    if (barNumber % 2 === 0) {
		xPos  += barWidth * rowNumber/2;
	    } else {
		xPos  -= barWidth;
		if (barNumber != 1)
		    xPos -= barWidth*((rowNumber-1)/2);
	    }

	    ctx.fillRect( xPos, 
			  graph.getMarginSize('b')*-1, 
			  barWidth-rowPaddingR, 
			  graph.rData.currentVal(rowNumber)
			);
	    graph.rData.next();		
	    ctx.stroke();
	}
    }
}

