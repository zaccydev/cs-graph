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

function round2(n) {
    n = Math.round(n*100)/100;	    
    if (! n.toString().match(/\./)) {	
	n = n.toString() + '.00';
    }    
    return n;		
}

function clearCanvas(canvas, context) {   
    context.clearRect(0, 0, canvas.width, canvas.height);
}


Array.prototype.contains = function(val) {
    for (k in this) if (this[k] == val) return true;
    return false;
};

function round2Gr(n) {
    return Math.round(n*100)/100;  	
}
function round1Gr(n) {
    return Math.round(n*10)/10;  	
}
