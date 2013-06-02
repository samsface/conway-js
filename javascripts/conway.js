// Grid of cells
var cells = {};
// Potential Cells
var egg = {};
// Dead cells
var deadcells = {};
var graveyard = {};
var map = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
var reset = 0;

var getCellCoords = function(cellId) {

  var xy = cellId.split('|');
  return [parseInt(xy[0]), parseInt(xy[1])];

};

var neighbourCount	= function(x, y, b) {

 var c = 0;
 var y = parseInt(y);
 var x = parseInt(x);

 for(var i in map) {
    
  var k = map[i][0] + x;
  var j = map[i][1] + y;

  if(cells[j] && cells[j][k])
   c++;
  else
   if(!b) {

    if(!deadcells[j])
     deadcells[j] = {};

    deadcells[j][k] = 1;

   }
 }

 return c;

};

var run = function() {

 for(var y in cells) {

  if(!graveyard[y])
   graveyard[y] = {};

  for(var x in cells[y]) {
  
   var n = neighbourCount(x, y, false);
   if(n < 2 || n > 3) 
    graveyard[y][x] = 1;
  
  }

 }

 for(var y in deadcells) {

  if(!egg[y])
   egg[y] = {};

  for(var x in deadcells[y]) {
  
   var n = neighbourCount(x, y, true);
   if(n === 3)
    egg[y][x] = 1;

  }

 }
  
 for(var y in graveyard) {

  for(var x in graveyard[y])
   delete cells[y][x];  
 
 }

 for(var y in egg) {

  if(!cells[y])
   cells[y] = {};

  for(var x in egg[y])
   cells[y][x] = 1;
  
 }

 if(reset) {

  cells = {};
  drawnCells = {}; 
  reset = 0;

 }

 graveyard = {};
 deadcells = {};
 egg = {};

};
