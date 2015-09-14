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

var MyIterable = function(){
    
    var data = [];  
    var key = [];
    var index = 0;

    this.add = function(k, value) {
	key.push(k);
	data.push(value);
    };
    
    this.size = function() {
	return key.length;
    }
    this.remove = function(k) {
	i = key.indexOf(k);
	key.splice(i, 1);
	data.splice(i, 1);	
    };
    this.reset = function() {
	index = 0;
    };
    this.hasNext = function() {  
	if ( index != key.length ) {
	    return true;
	} else {
	    index = 0;
	    return false;
	}
    };	
    this.next = function() {	
	_key = this.currentKey()
	_val = this.currentVal();
	index++;
	return {"key": _key , "val" : _val};
    };
    this.currentVal = function(lineIndex) {
	return typeof lineIndex == "undefined" ? 
	    data[index] : 
	    data[index][lineIndex];
    };
    this.currentKey = function() {
	return key[index];
    };    
    this.getValues = function() {
	return data;
    };
    this.getKeys = function() {
	return key;
    }; 
};

var IterExtend = function (){
    
    this._e = new MyIterable();
    
    
    MyIterable.prototype.getMinX = function() {		
	min = undefined;	
	keys =this.getKeys();
	
	for (k in keys) {
	    if (typeof(min) == 'undefined' || parseInt(keys[k]) < min) {
		min = parseInt(keys[k]);
	    }
	}
	
	return min;
    };
    
    MyIterable.prototype.getMaxX = function() {
	max = undefined;
	keys = this.getKeys();
	
	for (k in keys) {
	    if (typeof(max) == 'undefined' || parseInt(keys[k]) > max) {
		max = parseInt(keys[k]);
	    }
	}
	
	return max;
    };
    
    MyIterable.prototype.getMinY = function() {
	min = undefined;
	values = this.getValues();
	
	for (k in values) {
	    for (j in values[k]) {				
		if (typeof(min) == 'undefined' || values[k][j] < min) {
		    min = values[k][j];
		}				
	    }
	}
	
	return min;			
    };
    
    MyIterable.prototype.getMaxY = function() {
	max = undefined;
	values = this.getValues();
	
	for (k in values) {
	    for (j in values[k]) {				
		if (typeof(max) == 'undefined' || values[k][j] > max ) {
		    max = values[k][j];
		}				
	    }
	}
	
	return max;			
    };

    MyIterable.prototype.buildHtmlTable = function(htmlTagAttr) {
	var td = [];
	var html = "<table "+htmlTagAttr+">";
	td[0] = this.getKeys();
	var lines = this.getValues();
	for (var i = 1; i <= lines[0].length; i++) {
	    if (typeof td[i] == 'undefined') {
		td[i] = [];
	    }
	    for (var j =0; j < lines.length; j++) {
		td[i][j] = lines[j][i-1];
	    }
	}
	for (var i=0; i < td.length; i++) {
	    html += "<tr>";
	    for (var j = 0; j < td[i].length; j++) {
		html += "<td>" + td[i][j] + "</td>"
	    }
	    html += "</tr>";
	}
	html += "</table>";

	return html;
    };

    MyIterable.prototype.logMinMax = function() {    
	log("minX", this.getMinX());
	log("maxX", this.getMaxX());
	log("maxY", this.getMaxY());
	log("minY", this.getMinY());
    };

    MyIterable.prototype.toDebugString = function() {    
	_debug = "";
	while (this.hasNext()) {
	    _debug +=  "key: "+ this.currentKey() + " val [" + this.currentVal() + "]\n";
	    this.next();
	}
	return _debug;
    }
    
    return this._e;
}


