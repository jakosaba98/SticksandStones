let locations=[];
const repeat=2000;
const start={
  1:[{lat:45.66322,lon:12.233668}],
  2:[{lat:45.40229,lon:11.872023}],
  3:[{lat:45.438712,lon:10.990199}],
  4:[{lat:45.5496477,lon:11.55359}],
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
          for(let i=obj.length-1;i>=0;i--)
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
  if(!repeatFunction)
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
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(p.x,p.y,10,0,360);// draw a circle in current location
  }
  ctx.stroke();
}

function addLocation(point){
  locations.push(point);
  document.getElementById('passengers').innerText=point.count;
  document.getElementById('doors').innerText=point.doors?'aperte':'chiuse';
  let zoom=map.getZoom();
  map.setExtent(locations);
  map.setZoom(zoom);
  redraw();
}