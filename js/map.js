import {displayOffer} from './popup.js';
import {getData} from './server-calls.js';

const DEFAULT_LAT = 35.6895;
const DEFAULT_LNG = 139.692;
const DEFAULT_SCALE = 12;
const MAX_OFFER_COUNT = 10;

const address = document.querySelector('#address');

address.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;

const map = L.map('map-canvas');

const loadMap = (form) => {
  map
    .on('load', () => {//обработчик активации формы
      form(true);
    })
    .setView({
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    }, DEFAULT_SCALE);
};

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
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
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

  marker.addTo(markerGroup).bindPopup(displayOffer(offer));
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
  address.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;
  mainMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_SCALE);
  clearMarkers();
  getData ((data)=> {
    renderCards(data.slice(0, MAX_OFFER_COUNT));
  });
  map.closePopup();
};

export {map, loadMap, renderCards, resetMap, clearMarkers, DEFAULT_LAT, DEFAULT_LNG};
