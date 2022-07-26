import {map, defaultLat, defaultLng} from './map.js';

const ALERT_SHOW_TIME = 5000;

const offerForm = document.querySelector('.ad-form');
const addressField = document.querySelector('#address');
const body = document.querySelector('body');
const submitButton = offerForm.querySelector('.ad-form__submit');
const success = document.querySelector('#success')
  .content.querySelector('.success');
const error = document.querySelector('#error')
  .content.querySelector('.error');
const buttonError = error.querySelector('.error__button');
const alertContainer = document.querySelector('#alert').
  content.querySelector('.alert');

const showAlert = (message) => {
  const alertElement = alertContainer.cloneNode(true);

  alertElement.textContent = message;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const getSuccessMessage = () => {
  const successMessage = success.cloneNode(true);
  body.appendChild(successMessage);
  successMessage.addEventListener('click', () => {
    successMessage.remove();
  });
  success.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
    }
  });
  offerForm.reset();
  addressField.value = `${defaultLat}, ${defaultLng}`;
  map.closePopup();
  submitButton.disabled = false;
};

const getErrorMessage = () => {
  const errorMessage = error.cloneNode(true);

  body.appendChild(errorMessage);

  errorMessage.addEventListener('click', () => {
    errorMessage.remove();
  });
  errorMessage.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
    }
  });
  buttonError.querySelector('click', () => {
    errorMessage.remove();
  });
  submitButton.disabled = false;
};

export {getErrorMessage, getSuccessMessage, showAlert};
