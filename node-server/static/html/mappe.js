var locations=[{lat:45.494873,lon:12.252794},{lat:45.470709,lon:12.226222}]
var provider = new com.modestmaps.TemplatedLayer('http://tile.openstreetmap.org/{Z}/{X}/{Y}.png');
var map = new com.modestmaps.Map('map', provider); 
var canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.left = '0';
canvas.style.top = '0';
canvas.width = map.dimensions.x;
canvas.height = map.dimensions.y;
map.parent.appendChild(canvas);

/*
var sf = new com.modestmaps.Location(45.494873, 12.252794);
var london = new com.modestmaps.Location(45.470709, 12.226222);
for (var i = 0; i <= 100; i++) {
  var f = i/100.0;
  locations.push(com.modestmaps.Location.interpolate(sf, london, f));
}*/
map.setExtent(locations);

function redraw() {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle = '#eea200';
  ctx.lineWidth = 6;
  ctx.beginPath();
  var p = map.locationPoint(locations[0]);
  ctx.moveTo(p.x,p.y);
  for (var i = 1; i < locations.length; i++) {
    p = map.locationPoint(locations[i]);
    ctx.lineTo(p.x,p.y);
  }
  ctx.stroke();
}

map.addCallback('drawn', redraw);
map.addCallback('resized', function() {
  canvas.width = map.dimensions.x;
  canvas.height = map.dimensions.y;
  redraw();
});

redraw();

function add(point){
  locations.push(point);
}
//sub with while
do{
  add({lat:45.470829,lon:12.226282});
  redraw();
}
while(false);