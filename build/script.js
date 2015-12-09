function round2(t){return t=Math.round(100*t)/100,t.toString().match(/\./)||(t=t.toString()+".00"),t}function clearCanvas(t,e){e.clearRect(0,0,t.width,t.height)}function round2Gr(t){return Math.round(100*t)/100}function round1Gr(t){return Math.round(10*t)/10}function grepDataForCanvas(t){canvas=t.getCanvas();var e=$(canvas).parents("div").find("table"),n=e.find("tr")[0];t.options.firstCellTh?t.nbCells=n.cells.length-1:t.nbCells=n.cells.length,t.nbRows=e.find("tr").size();var a=t.nbCells;for(i=0;i<a;i++)if(t.options.firstCellTh&&0==i){for(k=1;k<t.nbRows;k++)t.options.rows[k-1].name=e.find("tr")[k].cells[i].innerHTML;a++}else{var r=[];for(k=1;k<t.nbRows;k++)r.push(parseInt(e.find("tr")[k].cells[i].innerHTML));t.tData.add(n.cells[i].innerHTML,r)}}function grepDataFromCSVForCanvas(t){$.ajax({url:t.options.csvUrl,dataType:"text",complete:function(e,i){if(data=CSVToArray(e.responseText,","),0!=data.length&&0!=data[0].length){for(var n=0;n<data[0].length;n++){cells=[];for(var a=0;a<data.length;a++)cells.push(parseInt(data[a][n]));th=cells.shift(),t.tData.add(th,cells)}table=t.tData.buildHtmlTable('class="table table-hover table-striped table-condensed"'),canvas=t.getCanvas(),$(canvas).parents("div").prepend(table),t.nbRows=data.length,t.nbCells=data[0].length,t.buildGraph()}},error:function(t,e,i){}})}CsgDrawLine=function(t){function e(e,i){for(;t.rData.hasNext();){e.beginPath();var n=t.rData.currentKey();e.lineWidth=0,e.arc(t.getMX(n),t.getMY(t.rData.currentVal(i)),10,0,2*Math.PI),e.fill(),t.rData.next(),e.stroke()}}function n(e,i,n){var a=t.options.barWidth,r=1;t.rData.reset();var o=0;for(_row in t.options.rows)"bar"==t.options.rows[_row].type&&o++;for(;t.rData.hasNext();){e.beginPath();var s=t.rData.currentKey(),l=parseInt(s)+t.getMarginSize("l");o%2==1&&(l-=a/2),n%2==0?l+=a*i/2:(l-=a,1!=n&&(l-=a*((i-1)/2))),e.fillRect(l,-1*t.getMarginSize("b"),a-r,t.rData.currentVal(i)),t.rData.next(),e.stroke()}}this.drawLines=function(){canvas=t.getCanvas();var a=canvas.getContext("2d");for(i=0,j=0;i<t.nbRows-1;i++)"bar"==t.options.getRowOpt(i).type&&(a.strokeStyle=t.options.getRowOpt(i).color,a.fillStyle=t.options.getRowOpt(i).color,n(a,i,j),j++);for(t.rData.reset(),i=0;i<t.nbRows-1;i++)"point"==t.options.getRowOpt(i).type&&(a.strokeStyle=t.options.getRowOpt(i).color,a.fillStyle=t.options.getRowOpt(i).color,e(a,i));for(t.rData.reset(),i=0;i<t.nbRows-1;i++)if(a.lineWidth=t.options.getRowOpt(i).lineWidth,a.strokeStyle=t.options.getRowOpt(i).color,"dotted-line"==t.options.getRowOpt(i).type?a.setLineDash([5,7]):a.setLineDash([]),"line"==t.options.getRowOpt(i).type||"dotted-line"==t.options.getRowOpt(i).type){for(a.beginPath(),init=0;t.rData.hasNext();){var r=t.rData.currentKey();0==init&&i>0&&(a.moveTo(t.getMX(r),t.getMY(t.rData.currentVal(i))),init++),a.lineTo(t.getMX(r),t.getMY(t.rData.currentVal(i))),t.rData.next()}a.stroke()}}},Array.prototype.contains=function(t){for(k in this)if(this[k]==t)return!0;return!1};var CsgLayout=function(t){options={textFillStyle:"#333",rowStrokeStyle:"#aaa"},writeHorizontalNumbers=function(e,i,n){e=t.options.layoutYLineMatch?round2Gr(e):round1Gr(e),n.textAlign="right",writeNumber(round2Gr(e),35,i+5,n)},writeVerticalNumbers=function(e,i,n){n.textAlign="right",writeNumber(round2Gr(e),i+1,-1*t.getMarginSize("b")+26,n)},writeNumber=function(t,e,i,n){n.font=cFont,n.fillText(t,e,i)},writeVLines=function(e){t.NmWidth/(t.nbCells-1);for(init=!0;t.tData.hasNext();)e.beginPath(),nextRK=t.rData.next().key,nextTK=t.tData.next().key,vY1=-1*t.getMarginSize("b"),vY2=-1*(t.NmHeight+t.getMarginSize("b")),vX=parseInt(nextRK)+t.getMarginSize("l"),init?(e.strokeStyle="#000",e.lineWidth=1.5,vY2+=t.getMarginSize("t")*-.7,e.moveTo(vX,vY2),e.lineTo(vX+7,vY2+10),e.moveTo(vX,vY2),e.lineTo(vX-7,vY2+10),init=!1):(e.strokeStyle=options.rowStrokeStyle,e.lineWidth=cLayoutLineWidth),e.moveTo(vX,vY1),e.lineTo(vX,vY2),writeVerticalNumbers(nextTK,vX,e),e.stroke()},writeHLines=function(e){t.options.layoutYLineMatch&&(nbYLine=t.nbCells*(t.nbRows-1)),t.tData.reset(),t.rData.reset();for(var i=t.NmHeight/(nbYLine-1),n=(t.tData.getMaxY()-t.tData.getMinY())/(nbYLine-1),a=t.tData.getMinY(),r=0,o=t.rData.currentVal(),s=t.tData.currentVal(),l=[],h=t.rData.getMaxY(),u=0;nbYLine>u;u++){if(t.options.layoutYLineMatch){if(!l.contains(s[r])){l.push(s[r]);var g=o[r]-t.getMarginSize("b");writeLayoutHLine(g,e,h==o[r]),writeHorizontalNumbers(s[r],g,e)}}else{var g=-1*(i*u+t.getMarginSize("b"));writeLayoutHLine(g,e,0==u),writeHorizontalNumbers(a,g,e),a+=n}r++,r==t.nbRows-1&&(t.rData.next(),t.tData.next(),o=t.rData.currentVal(),s=t.tData.currentVal(),r=0)}},writeLayoutHLine=function(e,i,n){i.beginPath(),hX1=t.getMarginSize("l"),hX2=t.NmWidth+t.getMarginSize("l"),n?(i.strokeStyle="#000",i.lineWidth=1.5,hX2+=.7*t.getMarginSize("r"),i.moveTo(hX2,e),i.lineTo(hX2-10,e-7),i.moveTo(hX2,e),i.lineTo(hX2-10,e+7)):(i.strokeStyle=options.rowStrokeStyle,i.lineWidth=cLayoutLineWidth),i.moveTo(hX1,e),i.lineTo(hX2,e),i.stroke()},writeRowNames=function(e){var n=t.getMarginSize("l"),a=t.NmWidth/6;for(i=0;i<t.nbRows-1;i++)e.beginPath(),e.fillStyle=t.options.getRowOpt(i).color,e.fillRect(n,-10,15,-15),e.font=cFont,e.textAlign="left",e.fillStyle="#000",e.fillText(t.options.getRowOpt(i).name,n+20,-10),e.stroke(),n+=a},this.drawLayout=function(){var e=t.getCanvas().getContext("2d");e.setLineDash([]),e.lineWidth=cLayoutLineWidth,e.strokeStyle=options.rowStrokeStyle,e.font=cFont,e.shadowBlur=5,e.shadowOffsetX=2,e.shadowOffsetY=-2,e.shadowColor="#666",e.fillStyle="#eee",e.fillRect(t.l,-1*t.b,t.NmWidth,-1*t.NmHeight),e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0,e.shadowColor="#333",e.fillStyle=options.textFillStyle,writeVLines(e),writeHLines(e),t.options.displayRowNames&&t.options.firstCellTh&&writeRowNames(e)}},zoom=1,cLineWidth=1,cLayoutLineWidth=.25,cFont="15px Arial",nbYLine=10,debug=!0,Graph=function(canvas,options){this.options={xValueInterpretation:!0,layoutYLineMatch:!0,width:900,height:450,csvUrl:"",firstCellTh:!1,displayRowNames:!0,barWidth:20,graphMargin:[30,60,30,55],rows:{},getRowOpt:function(t){var e={type:"line",color:["blue","red","darkblue","pink","yellow"],lineWidth:1};if(e.color=e.color[t],"undefined"==typeof this.rows[t])return e;for(_opt in this.rows[t])e[_opt]=this.rows[t][_opt];return e}};for(opt in options)this.options[opt]=options[opt];this.options.displayRowNames&&this.options.firstCellTh&&(this.options.graphMargin[2]+=30),this.getCanvas=function(){return canvas},this.addMargin=function(t){this.NmWidth=canvas.width,this.NmHeight=canvas.height,canvas.width+=t[1]+t[3],canvas.height+=t[0]+t[2],this.t=t[0],this.r=t[1],this.b=t[2],this.l=t[3]},this.getMarginSize=function(m){return eval("this."+m)},this.getMX=function(t){return parseFloat(t)+this.l},this.getMY=function(t){return parseFloat(t)-this.b},this.scaleDataValuesToCanvas=function(){for(var t=this.tData.getMaxX()-this.tData.getMinX(),e=t/this.NmWidth,i=this.tData.getMaxX()/e-this.NmWidth,a=this.tData.getMaxY()-this.tData.getMinY(),r=a/this.NmHeight,o=this.tData.getMaxY()/r-this.NmHeight,s=t/(this.nbCells-1),l=0;this.tData.hasNext();){var h=[],u=0;for(n in this.tData.currentVal())h.push(-1*round2(this.tData.currentVal(n)/r-o)),u++;this.options.xValueInterpretation?this.rData.add(round2(parseInt(this.tData.currentKey())/e-i),h):this.rData.add(round2(l*s/e),h),this.tData.next(),l++}},this.buildGraph=function(){this.scaleDataValuesToCanvas();var t=new CsgLayout(this);t.drawLayout();var e=new CsgDrawLine(this);e.drawLines()},this.tData=new IterExtend,this.rData=new IterExtend,canvas.width=this.options.width,canvas.height=this.options.height,this.addMargin(this.options.graphMargin),canvas.style.width=(canvas.width*zoom).toString()+"px",canvas.style.height=(canvas.height*zoom).toString()+"px";var ctx=canvas.getContext("2d");ctx.translate(0,canvas.height),this.options.csvUrl.length>0?grepDataFromCSVForCanvas(this):(grepDataForCanvas(this),this.buildGraph())};$(function(){$(".cs-graph").each(function(a,e){var options={};"undefined"!=typeof $(e).attr("data-csg")&&(options=eval("("+$(e).attr("data-csg")+")")),new Graph($(e).find("canvas")[0],options)})});var MyIterable=function(){var t=[],e=[],n=0;this.add=function(i,n){e.push(i),t.push(n)},this.size=function(){return e.length},this.remove=function(n){i=e.indexOf(n),e.splice(i,1),t.splice(i,1)},this.reset=function(){n=0},this.hasNext=function(){return n!=e.length?!0:(n=0,!1)},this.next=function(){return _key=this.currentKey(),_val=this.currentVal(),n++,{key:_key,val:_val}},this.currentVal=function(e){return"undefined"==typeof e?t[n]:t[n][e]},this.currentKey=function(){return e[n]},this.getValues=function(){return t},this.getKeys=function(){return e}},IterExtend=function(){return this._e=new MyIterable,MyIterable.prototype.getMinX=function(){min=void 0,keys=this.getKeys();for(k in keys)("undefined"==typeof min||parseInt(keys[k])<min)&&(min=parseInt(keys[k]));return min},MyIterable.prototype.getMaxX=function(){max=void 0,keys=this.getKeys();for(k in keys)("undefined"==typeof max||parseInt(keys[k])>max)&&(max=parseInt(keys[k]));return max},MyIterable.prototype.getMinY=function(){min=void 0,values=this.getValues();for(k in values)for(j in values[k])("undefined"==typeof min||values[k][j]<min)&&(min=values[k][j]);return min},MyIterable.prototype.getMaxY=function(){max=void 0,values=this.getValues();for(k in values)for(j in values[k])("undefined"==typeof max||values[k][j]>max)&&(max=values[k][j]);return max},MyIterable.prototype.buildHtmlTable=function(t){var e=[],i="<table "+t+">";e[0]=this.getKeys();for(var n=this.getValues(),a=1;a<=n[0].length;a++){"undefined"==typeof e[a]&&(e[a]=[]);for(var r=0;r<n.length;r++)e[a][r]=n[r][a-1]}for(var a=0;a<e.length;a++){i+="<tr>";for(var r=0;r<e[a].length;r++)i+="<td>"+e[a][r]+"</td>";i+="</tr>"}return i+="</table>"},MyIterable.prototype.logMinMax=function(){log("minX",this.getMinX()),log("maxX",this.getMaxX()),log("maxY",this.getMaxY()),log("minY",this.getMinY())},MyIterable.prototype.toDebugString=function(){for(_debug="";this.hasNext();)_debug+="key: "+this.currentKey()+" val ["+this.currentVal()+"]\n",this.next();return _debug},this._e};