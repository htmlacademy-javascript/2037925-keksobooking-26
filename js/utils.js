import {resetMap, defaultLat, defaultLng} from './map.js';

const addFormElement = document.querySelector('.ad-form');
const fullResetButton = document.querySelector('.ad-form__reset');
const mapFilterForm = document.querySelector('.map__filters');
const addressField = document.querySelector('#address');

const resetForm = (evt) => {
  evt.preventDefault();
  addFormElement.reset();
  mapFilterForm.reset();
  resetMap();

  addressField.value = `${defaultLat}, ${defaultLng}`;
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
