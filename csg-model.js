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


function grepDataForCanvas(graph) {
    //récupérer les données depuis un tableau html
    // x : données entête
    // y : données des lignes		
    canvas = graph.getCanvas();
    var table = $(canvas).parents('div').find('table');	
    var th = table.find('tr')[0];
    if (graph.options["firstCellTh"]) {	
	graph.nbCells = th.cells.length - 1; 
    } else {
	graph.nbCells = th.cells.length; 
    }

    graph.nbRows = table.find('tr').size();
    var max = graph.nbCells;
    for (i=0; i<max; i++) {
	if (graph.options["firstCellTh"] && i == 0 ) {
	    for (k=1;k<graph.nbRows;k++) {
		graph.options["rows"][k-1]["name"] = table.find('tr')[k].cells[i].innerHTML;
	    }
	    max++;
	    continue;
	}
	var cellsData = [];
	
	for (k=1;k<graph.nbRows;k++) {
	    cellsData.push(parseInt(
		table.find('tr')[k].cells[i].innerHTML));
	}			
	graph.tData.add(
	    th.cells[i].innerHTML,
	    cellsData
	); 
    }
    console.debug(graph.tData.toDebugString());	
}

function grepDataFromCSVForCanvas(graph) {
    //récupérer les données depuis un fichier CSV
    // x : données entête
    // y : données des lignes		
    $.ajax({
	url: graph.options["csvUrl"], 
	dataType:'text',
	complete : function(x, s) {   			
	    data = CSVToArray(x.responseText, ",");			
	    //récupération des données vers tData
	    if (data.length == 0) {
		return;
	    }
	    if (data[0].length == 0) {
		return;
	    }	

	    for (var i = 0; i < data[0].length; i++) {
		cells = [];
		for (var j = 0; j < data.length; j++) {
		    cells.push(parseInt(data[j][i]));
		}		
		th = cells.shift()		
		graph.tData.add(th, cells);
	    } 
	    table = graph.tData.buildHtmlTable('class="table table-hover table-striped table-condensed"');		                 

	    canvas = graph.getCanvas();
	    $(canvas).parents('div').prepend(table);
	    //set canvas var
	    graph.nbRows = data.length;
	    graph.nbCells = data[0].length;
	    graph.buildGraph();

	},
	error : function(x, s, e) {
	    console.warn("ajax error while retrieving csv (url: "+options["csvUrl"]+")", e);
	}
    });	       
}
