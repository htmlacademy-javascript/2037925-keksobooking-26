import {unlockForm} from './form-activation.js';
import {insertOffer} from './popup.js';

const address = document.querySelector('#address');
const defaultLat = 35.6895;
const defaultLng = 139.692;
const defaultScale = 12;

address.value = `${defaultLat}, ${defaultLng}`;

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
  address.value = `${lat}, ${lng}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const marker = L.marker({
    lat: offer.location.lat,
    lng: offer.location.lng
  },
  {
    icon: pinIcon,
  });

  marker.addTo(markerGroup).bindPopup(insertOffer(offer));
  return marker;
};

const renderCards = (elements) => {
  elements.forEach((element) => {
    createMarker(element);
  });
};

const clearMarkers = () => {
  markerGroup.clearLayers();
};

const resetMap = () => {
  address.value = `${defaultLat}, ${defaultLng}`;

  mainMarker.setLatLng({
    lat: defaultLat,
    lng: defaultLng,
  });
  map.setView({
    lat: defaultLat,
    lng: defaultLng,
  }, defaultScale);

  map.closePopup();
};

export {map, renderCards, resetMap, clearMarkers, defaultLat, defaultLng};
