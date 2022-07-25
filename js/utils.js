import {resetMap} from './map.js';

const addFormElement = document.querySelector('.ad-form');
const fullResetButton = document.querySelector('.ad-form__reset');
const mapFilterForm = document.querySelector('.map__filters');
const alertContainer = document.querySelector('#alert').
  content.querySelector('.alert');

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertElement = alertContainer.cloneNode(true);

  alertElement.textContent = message;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const resetForm = (evt) => {
  evt.preventDefault();
  addFormElement.reset();
  mapFilterForm.reset();
  resetMap();
};

fullResetButton.addEventListener('click', resetForm);

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 5) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) =>
  elements [getRandomPositiveInteger(0, elements.length - 1)];

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, showAlert, debounce};
