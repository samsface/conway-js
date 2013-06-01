var getPattern = function(id) {
  console.log(id);
 $.getJSON('get.cgi', {'id': id}, function(data) { var rle = data.rle; rle = rle.substr(rle.indexOf('\n', rle.indexOf('rule')+1)).replace('\n', ''); pattern[data.id] = rle.replace('\r', ''); selectPattern(data.id); });

};
var lol;
$('#patterns li').click(function() { selectPattern($(this).text()); });

var pattern = {}

pattern.Cell = 'o!';
