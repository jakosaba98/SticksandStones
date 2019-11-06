let locations = [];
const start = {
  1: [{ lat: 45.66322, lon: 12.233668 }],
  2: [{ lat: 45.40229, lon: 11.872023 }],
  3: [{ lat: 45.438712, lon: 10.990199 }],
  4: [{ lat: 45.5496477, lon: 11.55359 }],
};
let busSocket = null;
let token = null;
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
map.addCallback('resized', function () {
  canvas.width = map.dimensions.x;
  canvas.height = map.dimensions.y;
  redraw();
});

$('#autobus').on('change', (el) => init(el.target.value));

async function init(id) {
  locations = [];
  map.setExtent(start[id]);
  map.setZoom(16);
  redraw();

  //get data from a websocket
  // BUT FIRST ASK FOR A TOKEN!!
  if (!token)
    token = await getToken();
  if (busSocket && busSocket.readyState == WebSocket.OPEN) {
    busSocket.send(id);
  }
  else {
    busSocket = new WebSocket("ws://localhost/bus?token=" + token);
    busSocket.addEventListener('open', function (event) {
      busSocket.send(id);
    });
    busSocket.addEventListener('close', function (event) {
    });
    //close connection when finished
    $(window).on('beforeunload', function(){
      busSocket.close();
    });
  }
}
getToken = async () => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/bus/gettoken', false);
    xhr.send();
    if (xhr.readyState === 4)
      try {
        resolve(JSON.parse(xhr.response).token)
      }
      catch (e) {
        reject()
      }
  })
}

function redraw() {
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#eea200';
  ctx.lineWidth = 6;
  ctx.beginPath();
  let p;
  for (let i = 0; i < locations.length; i++) {
    if (i == 0) {
      p = map.locationPoint(locations[0]);
      ctx.moveTo(p.x, p.y);
    }
    else {
      p = map.locationPoint(locations[i]);
      ctx.lineTo(p.x, p.y);
    }
  }
  if (p) {
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, 360);// draw a circle in current location
  }
  ctx.stroke();
}

function addLocation(point) {
  locations.push(point);
  document.getElementById('passengers').innerText = point.count;
  document.getElementById('doors').innerText = point.doors ? 'aperte' : 'chiuse';
  let zoom = map.getZoom();
  map.setExtent(locations);
  map.setZoom(zoom);
  redraw();
}