let locations=[];
const repeat=2000;
const start={
  3:[{lat:45.438712,lon:10.990199}],
  4:[{lat:45.40229,lon:11.872023}]
};
let repeatFunction=()=>{};
let provider = new com.modestmaps.TemplatedLayer('http://tile.openstreetmap.org/{Z}/{X}/{Y}.png');
let map = new com.modestmaps.Map('map', provider); 
let canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.left = '0';
canvas.style.top = '0';
canvas.width = map.dimensions.x;
canvas.height = map.dimensions.y;
map.parent.appendChild(canvas);
map.addCallback('drawn', redraw);
map.addCallback('resized', function() {
  canvas.width = map.dimensions.x;
  canvas.height = map.dimensions.y;
  redraw();
});

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

$('#autobus').on('change',(el)=>
init(el.target.value)
);

function init(id){
  console.log(id);
  locations=[];
  map.setExtent(start[id]);
  map.setZoom(16);
  redraw();

  //send a request and add new points
  //clearInterval(repeatFunction);
  repeatFunction=setInterval(() => {
    let timestamp=new Date().getTime()-repeat;
    xhr.open('GET','http://localhost/api/'+id+'/'+timestamp);
    xhr.send();
  }, repeat);
}

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

function addLocation(point){
  locations.push(point);
  let zoom=map.getZoom();
  map.setExtent(locations);
  map.setZoom(zoom);
  redraw();
}