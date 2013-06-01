var ctx = can.getContext('2d');
var drawnCells = {};
var selectedPiece;
var attack = .2;
var decay = 1;
var fr = 40;
var pageX = 0;
var pageY = 0;
var stop = false;
var scl = 10;

var par = [0, 0, 0, 0];

var colors = {};
colors[0] = '#ccc';
colors[1] = '#4380d3';
colors[2] = '#6996d3';
colors[3] = '#05316d';

can.onmousedown = function(evt) {

 placePiece();

};

can.onmousemove = function(evt) {

 if(Math.floor(evt.pageX/scl)*scl !== pageX)
  pageX = Math.floor(evt.pageX/scl)*scl;

 if(Math.floor(evt.pageY/scl)*scl !== pageY)
  pageY = Math.floor(evt.pageY/scl)*scl;

};

var printFaded = function() {

 ctx.fillStyle = '#ddd';
 ctx.globalAlpha = 0.5;
 
 for(var y in selectedPiece) {

  for(var x in selectedPiece[y]) {

   ctx.fillRect((x*scl)+pageX+1, (y*scl)+pageY+1, scl, scl);

  }

 } 

 ctx.globalAlpha = 1.0;

};

var placePiece = function() {

 var offsetY = pageY/scl;
 var offsetX = pageX/scl;

 for(var y in selectedPiece) {
  
  var yy = parseInt(y)+offsetY;
  if(!cells[yy])
   cells[yy] = {};

  for(var x in selectedPiece[y]) {

   if(cells[yy][parseInt(x)+offsetX])
    delete cells[yy][parseInt(x)+offsetX] 
   else
    cells[yy][parseInt(x)+offsetX] = 1;
  
  }

 }
 
};

var printCell = function(x, y) {

 var c = drawnCells[y][x]*scl;
 var offset = c === scl ? 1 : ((scl/2)+1)-(c/2);
 var k = 256-parseInt(256 * drawnCells[y][x]);

 ctx.fillStyle = 'rgb('+[k,k,k].join(',')+')';
 ctx.fillRect((x*scl)+offset, (y*scl)+offset, c, c);

};

var gridFunction = function(i, j) {

 return 0;

};

var printCells = function() {
 
 ctx.clearRect(0, 0, 500, 500);
	
 for(var y in drawnCells)
  for(var x in drawnCells[y])
   printCell(x, y);

};

var draw = function() {

 for(var y in cells) {

  if(!drawnCells[y])
   drawnCells[y] = {};

  for(var x in cells[y]) {
  
   drawnCells[y][x] = drawnCells[y][x] ? drawnCells[y][x] + attack : attack;

   if(drawnCells[y][x] > 1)
    drawnCells[y][x] = 1;

  }

 }

 for(var y in drawnCells) {

  for(var x in drawnCells[y]) {

   if(!cells[y][x])
    drawnCells[y][x] -= decay;

   if(drawnCells[y][x] <= 0)
    delete drawnCells[y][x];

  }

 }

 printCells();
 printFaded();

};

var selectPattern = function(id) {

 if(pattern[id])
  selectedPiece = rleDecompress(pattern[id]);
 else
  getPattern(id);

};


$('#scale').keyup(function() { scl = parseInt($(this).val()); });
$('#tempo').keyup(function() { fr = parseInt($(this).val()); clearInterval(tim); start(); });
$('#pause').click(function() { stop = !stop; });
