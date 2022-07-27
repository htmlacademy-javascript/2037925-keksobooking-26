import {resetMap, renderCards, clearMarkers} from './map.js';
import {getData} from './server-calls.js';

const MAX_OFFER_COUNT = 10;
const DEFAULT_LAT = 35.6895;
const DEFAULT_LNG = 139.692;
const AVATAR_DEFAULT = 'img/muffin-grey.svg';

const typeOfHousingPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};

const addFormElement = document.querySelector('.ad-form');
const fullResetButton = document.querySelector('.ad-form__reset');
const mapFilterForm = document.querySelector('.map__filters');
const addressField = document.querySelector('#address');
const price = addFormElement.querySelector('#price');
const priceSlider = document.querySelector('.ad-form__slider');
const previewPhoto = document.querySelector('.ad-form__photo');
const previewAvatar = document.querySelector('.ad-form-header__avatar');
const typeOfHousing = document.querySelector('#type');

const resetForm = (evt) => {
  evt.preventDefault();

  addFormElement.reset();
  mapFilterForm.reset();
  resetMap();
  addressField.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;
  previewAvatar.src = AVATAR_DEFAULT;
  previewPhoto.innerHTML = '';
  price.placeholder = typeOfHousingPrice[typeOfHousing.value];
  priceSlider.noUiSlider.reset();
  clearMarkers();
  getData ((data)=> {
    renderCards(data.slice(0, MAX_OFFER_COUNT));
  });
};

fullResetButton.addEventListener('click', resetForm);

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {debounce, isEscapeKey};
