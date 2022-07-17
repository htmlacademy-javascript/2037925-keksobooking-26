import {unlockForm} from './form-activation.js';
import {insertOffer} from './popup.js';
import {offers} from './data.js';

const resetButton = document.querySelector('.ad-form__reset');
const addressValue = document.querySelector('#address');
const defaultLat = 35.6895;
const defaultLng = 139.692;
const defaultScale= 12;

addressValue.value = `${defaultLat}, ${defaultLng}`;

const map = L.map('map-canvas')
  .on('load', () => {
    unlockForm();
  })
  .setView({
    lat: defaultLat,
    lng: defaultLng,
  }, defaultScale);

const tiles = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

  {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: defaultLat,
    lng: defaultLng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

tiles.addTo(map);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const afterPoint = 4;
  const lat = evt.target.getLatLng().lat.toFixed(afterPoint);
  const lng = evt.target.getLatLng().lng.toFixed(afterPoint);
  addressValue.value = `${lat}, ${lng}`;
});

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: defaultLat,
    lng: defaultLng,
  });
  map.setView({
    lat: defaultLat,
    lng: defaultLng,
  }, defaultScale);
});

offers.forEach((offer)=>{
  const marker = L.marker({
    lat: offer.location.lat,
    lng: offer.location.lng
  },
  {
    icon: pinIcon,
  });

  marker.addTo(map).bindPopup(insertOffer(offer));
});
