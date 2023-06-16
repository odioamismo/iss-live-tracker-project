const mymap = L.map('mapid').setView([0, 0], 1);

const issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [70, 70],
    iconAnchor: [25, 16]
});

const marker =L.marker([0, 0], {icon: issIcon}).addTo(mymap);
const attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl ='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);
const api = 'https://api.wheretheiss.at/v1/satellites/25544';
let firstZoom = true;
async function getIss(){
    const response = await fetch(api);
    const data = await response.json();
    const { latitude, longitude, velocity, visibility, } = data;

    marker.setLatLng([latitude, longitude]);
    if(firstZoom){
        mymap.setView([latitude, longitude], 2);
        firstZoom=false;
    }




    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
    document.getElementById('vel').textContent = velocity.toFixed(2);
    document.getElementById('vis').textContent= visibility;
}
getIss();

setInterval(getIss,1000);