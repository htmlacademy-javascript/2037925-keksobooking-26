import {resetMap} from './map.js';

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
const typeOfHousing = document.querySelector('#type');
const priceSlider = document.querySelector('.ad-form__slider');
const previewPhoto = document.querySelector('.ad-form__photo');
const previewAvatar = document.querySelector('.ad-form-header__avatar');

const resetForm = (evt) => {
  evt.preventDefault();
  addFormElement.reset();
  mapFilterForm.reset();
  resetMap();
  addressField.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;
  previewAvatar.src = AVATAR_DEFAULT;
  previewPhoto.innerHTML = '';
  priceSlider.noUiSlider.reset();
  price.placeholder = typeOfHousingPrice[typeOfHousing.value];
};

fullResetButton.addEventListener('click', resetForm);

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {debounce, isEscapeKey};
