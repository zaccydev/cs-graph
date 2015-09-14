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


var zoom = 1;
var cLineWidth = 1;
var cLayoutLineWidth = 0.25;
var cFont = "15px Arial";
var nbYLine = 10;
var debug = true;

var Graph = function(canvas, options) {

    this.options = {
	"xValueInterpretation":true,
	"layoutYLineMatch":true,
	"width":900,
	"height":450,
	"csvUrl":"",
	"firstCellTh": false, 
	"displayRowNames": true,
	"barWidth":20,
	"graphMargin": [30, 60, 30, 55],
	"rows": {},
	getRowOpt: function(i) {
	    var def = {
		type:"line", 
		color:["blue", "red", "darkblue", "pink", "yellow"],
		lineWidth: 1,
	    };
	    def.color = def.color[i];    
	    if (typeof this.rows[i] == 'undefined') {      
		return def;
	    }        
	    for (_opt in this.rows[i]) {
		def[_opt] = this.rows[i][_opt];
	    }
	    return def;
	}, 	
    };
    
    for (opt in options) {
	this.options[opt] = options[opt];
    }
   
    if (this.options["displayRowNames"] && this.options["firstCellTh"] ) {
	this.options["graphMargin"][2] += 30;
    }

    this.getCanvas = function() {
	return canvas;
    };    

    this.addMargin = function(M) 
    {		
	this.NmWidth = canvas.width;
	this.NmHeight = canvas.height;
	
	canvas.width += M[1] + M[3];
	canvas.height += M[0] + M[2];
	
	this.t = M[0];
	this.r = M[1];
	this.b = M[2];
	this.l = M[3];		
    };		
    this.getMarginSize = function(m) { 
	return eval('this.'+m);
    };	
    this.getMX = function (x) {		
	return parseFloat(x) + this.l;
    };
    this.getMY = function(y) {
	return parseFloat(y) - this.b;
    };
   
    this.scaleDataValuesToCanvas = function() {
	var xDiff = this.tData.getMaxX() - this.tData.getMinX();	
	var xRatio = xDiff / this.NmWidth;
	var xCorrect = this.tData.getMaxX() / xRatio - this.NmWidth;	
	console.info("xCor", xCorrect);		
	console.info("xDiff", xDiff);		

	var yDiff = this.tData.getMaxY() - this.tData.getMinY();
	var yRatio = yDiff / this.NmHeight;
	var yCorrect = this.tData.getMaxY() / yRatio - this.NmHeight;
	console.info("yCor", yCorrect);
	console.info("nbCells", this.nbCells);
	var xSeq = xDiff / (this.nbCells-1);
	var i = 0;
	while (this.tData.hasNext()) {		
	    var kI = [];		
	    var j = 0;
	    for (n in this.tData.currentVal()) {			
		kI.push(round2(this.tData.currentVal(n) / yRatio - yCorrect)*(-1));   
		j++;
	    }
	    if (!this.options["xValueInterpretation"]) {
		this.rData.add(
		    round2((i* xSeq) / xRatio ),
		    kI	
		);
	    } else {
		this.rData.add(
		    round2(parseInt(this.tData.currentKey()) / xRatio - xCorrect),
		    kI
		);
	    }
	    this.tData.next();
	    i++;
	}	
    };

    this.buildGraph = function() {

	this.scaleDataValuesToCanvas();

	var csgl = new CsgLayout(this);
	csgl.drawLayout();	

	var csgDLine = new CsgDrawLine(this);
	csgDLine.drawLines();


    };

    this.tData = new IterExtend();
    this.rData = new IterExtend();
    canvas.width  = this.options.width;
    canvas.height = this.options.height; 	
    this.addMargin(this.options["graphMargin"]);	    

    canvas.style.width  = (canvas.width * zoom).toString() + 'px';
    canvas.style.height = (canvas.height * zoom).toString() + 'px';	

    var ctx = canvas.getContext("2d");    
    ctx.translate(0,canvas.height);
    
    if ( this.options["csvUrl"].length > 0) {
	console.log("url  (csv)", options["csvUrl"]);
	grepDataFromCSVForCanvas(this);	
    } else {
	grepDataForCanvas(this);
	this.buildGraph();
    }

};

$(function() {	    
    $('.cs-graph').each(function(a, e) {
	var options = {};
	if (typeof $(e).attr('data-csg') != "undefined") {
	    options = eval( '(' + $(e).attr('data-csg') + ')');	  
	}
	new Graph($(e).find('canvas')[0], options);
    }); 
});
