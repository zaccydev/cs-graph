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

var CsgLayout = function(graph) {

    options = {
	"textFillStyle" : "#333",
	"rowStrokeStyle" : "#aaa",
    };

    writeHorizontalNumbers = function(number, Y, ctx) {
	number = graph.options['layoutYLineMatch'] ? round2Gr(number) : round1Gr(number);
	ctx.textAlign = "right";
	writeNumber(round2Gr(number), 35 ,Y+5, ctx);
    };
    writeVerticalNumbers = function(number, X, ctx) {			
	ctx.textAlign = "right";
	writeNumber(round2Gr(number), X+1, -1* graph.getMarginSize("b")+26, ctx);		
    };		
    writeNumber = function(number, X, Y, ctx) {
	ctx.font = cFont;		
	ctx.fillText(number, X ,Y);
    };

    writeVLines = function (ctx) {
	// pour les lignes x (verticale) on utilise le nombre de cellules pour déterminer le nombre de ligne

	var cellsWidth = graph.NmWidth / (graph.nbCells -1 );				
	init = true;
	while(graph.tData.hasNext() ) {

	    ctx.beginPath();

	    nextRK = graph.rData.next().key;
	    nextTK = graph.tData.next().key;

	    vY1 = graph.getMarginSize("b")*-1;
	    vY2 = (graph.NmHeight + graph.getMarginSize("b"))*-1;	  
	    vX = parseInt(nextRK) + graph.getMarginSize("l");
	    
	    if (init) {
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 1.5;
		vY2 += graph.getMarginSize("t") * -0.7;
		//build an arrow at the end of the line
		ctx.moveTo(vX, vY2);
		ctx.lineTo(vX + 7, vY2 +10);
		ctx.moveTo(vX, vY2);
		ctx.lineTo(vX-7, vY2 +10);

		init = false;
	    } else {
		ctx.strokeStyle = options['rowStrokeStyle'];
		ctx.lineWidth = cLayoutLineWidth;
	    }

	    console.log("vline: " + i + " -- cX= " + vX + " - cY1 = " + vY1 + " - cY2 = " + vY2 );		
	    
	    ctx.moveTo(vX, vY1) ;
	    ctx.lineTo(vX, vY2);  
	 
	    writeVerticalNumbers(nextTK, vX, ctx);
	    ctx.stroke();	
	}

    };

    writeHLines = function(ctx) {
	// pour les lignes y (horizontale) on utilise un nombre fixé par avance	(nbYLine) ou nbCells*nbRows pour le mode layoutYLineMatch
	if (graph.options["layoutYLineMatch"]) {
	    nbYLine = graph.nbCells * (graph.nbRows-1);
	}
	graph.tData.reset();
	graph.rData.reset();
	var cellsHeight = graph.NmHeight / (nbYLine-1);			
	var f1 = (graph.tData.getMaxY() - graph.tData.getMinY()) / (nbYLine -1);	
	var p1 = graph.tData.getMinY();
	var rd_vi=0;
	var rd = graph.rData.currentVal();
	var td = graph.tData.currentVal();
	var writtedLines = [];

	var minY = graph.rData.getMaxY();

	for (var i =0; i < nbYLine; i++) {		    
	    if (! graph.options["layoutYLineMatch"]) {
		var hY = (cellsHeight*i + graph.getMarginSize("b")  ) *-1;		
		writeLayoutHLine( hY, ctx, i == 0);		
		writeHorizontalNumbers(p1, hY, ctx);
		p1 += f1; //for yMatch = false mode
	    }
	    else if (! writtedLines.contains(td[rd_vi])) {
		writtedLines.push(td[rd_vi]);		
		var hY =  rd[rd_vi] - graph.getMarginSize("b"); 
		writeLayoutHLine( hY,ctx, minY == rd[rd_vi]);
		writeHorizontalNumbers(td[rd_vi], hY, ctx);
	    }	    
	    rd_vi++;
	    if (rd_vi == graph.nbRows-1) {
		graph.rData.next();
		graph.tData.next();
		rd = graph.rData.currentVal();
		td = graph.tData.currentVal();
		rd_vi = 0;
	    }	    
	    //ctx.stroke();
	}

    }

    writeLayoutHLine = function(hY, ctx,minY) {	
	ctx.beginPath();
	
	hX1 = graph.getMarginSize("l");
	hX2 = graph.NmWidth + graph.getMarginSize("l");
	if (minY) {
	    ctx.strokeStyle = "#000";
	    ctx.lineWidth = 1.5;
	    hX2 += graph.getMarginSize("r") * 0.7;
	    //build an arrow at the end of the line
	    ctx.moveTo(hX2, hY);
	    ctx.lineTo(hX2-10, hY-7);
	    ctx.moveTo(hX2, hY);
	    ctx.lineTo(hX2-10, hY+7);

	} else {
	    ctx.strokeStyle = options["rowStrokeStyle"];
	    ctx.lineWidth = cLayoutLineWidth;
	}
	
	console.log("hline: "+ i +" -- cY= " + hY + " - cX1 = " + hX1 + " - cX2 = " + hX2 );		
	
	ctx.moveTo(hX1, hY);
	ctx.lineTo(hX2, hY);
	ctx.stroke();			
    };

    writeRowNames = function (ctx) {
	var X = graph.getMarginSize('l');
	var Xinc = graph.NmWidth / 6; 
	
	for ( i = 0 ; i < graph.nbRows - 1; i++) {
		ctx.beginPath();
	    //ctx.strokeStyle = graph.options.rows[rk].color;
	    ctx.fillStyle = graph.options.getRowOpt(i).color;
	    ctx.fillRect(X,-10,15,-15);

	    ctx.font = cFont;		
	    ctx.textAlign = "left";
	    ctx.fillStyle = "#000";
		//ctx.fillStyle = graph.rowOptions
	    ctx.fillText(graph.options.getRowOpt(i).name, X + 20,-10);
	    ctx.stroke();
	    X += Xinc;
	}
    };

    this.drawLayout = function() {

	var ctx = graph.getCanvas().getContext("2d");

	ctx.setLineDash([]);	
	ctx.lineWidth = cLayoutLineWidth;	
	ctx.strokeStyle = options.rowStrokeStyle;
	ctx.font = cFont;

	//white background
	ctx.shadowBlur=5;
	ctx.shadowOffsetX=2;
	ctx.shadowOffsetY=-2;
	ctx.shadowColor="#666";
	ctx.fillStyle = "#eee";
	ctx.fillRect(graph.l, graph.b*-1, graph.NmWidth,graph.NmHeight*-1);

	ctx.shadowBlur=0;
	ctx.shadowOffsetX=0;
	ctx.shadowOffsetY=0;
	ctx.shadowColor="#333";
	ctx.fillStyle = options.textFillStyle;

	writeVLines(ctx);	
	writeHLines(ctx);

	if (graph.options["displayRowNames"] && graph.options["firstCellTh"] ) {
	    writeRowNames(ctx);
	}
    };    
}
