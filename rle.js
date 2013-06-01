var rleDecompress = function(rle) {

 var piece = {0:{}};
 var num = '';
 var x = 0;
 var y = 0;
 
 for(var s in rle) {

  var s = rle[s];

  if(s === 'b') {

   x = num === '' ? x+1 : x + parseInt(num);
   num = '';
  
  }

  else if(s === 'o') {

   var i = num === '' ? 1 : parseInt(num);

   while(i--)
    piece[y][x+i] = 1;

   x = num === '' ? x+1 : x + parseInt(num);
   num = '';


  }

  else if(s === '$') {
   
   y += num === '' ? 1 : parseInt(num);
   x = 0;
   num = '';
   piece[y] = {};

  }

  else if(s === '!')
   break;

  else if(parseInt(s).toString() !== 'NaN'){

   num += s;

   }

 }
 
 return piece;

};
