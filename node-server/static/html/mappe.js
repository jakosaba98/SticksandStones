let locations=[];
let start=[{lat:45,lon:12}];//defines map start
let provider = new com.modestmaps.TemplatedLayer('http://tile.openstreetmap.org/{Z}/{X}/{Y}.png');
const id=3;
let map = new com.modestmaps.Map('map', provider); 
let canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.left = '0';
canvas.style.top = '0';
canvas.width = map.dimensions.x;
canvas.height = map.dimensions.y;
map.parent.appendChild(canvas);

let xhr=new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4)
      try {
          let obj = JSON.parse(xhr.response);
          for(let i=0;i<obj.length;i++)
          {
            addLocation(obj[i]);
          }
      }
      catch (e) {
          return;
      }
}

map.setExtent(start);
map.setZoom(14);

function redraw() {
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle = '#eea200';
  ctx.lineWidth = 6;
  ctx.beginPath();
  let p;
  for (let i = 0; i < locations.length; i++) {
    if(i==0)
    {
      p = map.locationPoint(locations[0]);
      ctx.moveTo(p.x,p.y);
    }
    else
    {
      p = map.locationPoint(locations[i]);
      ctx.lineTo(p.x,p.y);
    }
  }
  if(p)
  {
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.x,p.y,10,0,360);// draw a circle in current location
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

function addLocation(point){
  locations.push(point);
  map.setExtent(locations);
  if(map.getZoom()>14)
    map.setZoom(14);
  redraw();
}

//send a request and add new points
let repeat=5000;
setInterval(() => {
  let timestamp=new Date().getTime()-repeat;
  xhr.open('GET','http://localhost/api/'+id+'/'+timestamp);
  xhr.send();
}, repeat);