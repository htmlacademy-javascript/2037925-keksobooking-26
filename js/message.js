import {map, defaultLat, defaultLng} from './map.js';
import {isEscapeKey} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const offerForm = document.querySelector('.ad-form');
const addressField = document.querySelector('#address');
const submitButton = offerForm.querySelector('.ad-form__submit');
const successMessage = document.querySelector('#success')
  .content.querySelector('.success').cloneNode(true);
const successFragmentElement = document.createDocumentFragment();
const errorMessage = document.querySelector('#error')
  .content.querySelector('.error').cloneNode(true);
const errorFragmentElement = document.createDocumentFragment();
const alertContainer = document.querySelector('#alert').
  content.querySelector('.alert');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeTemplate();
  }
};

const onClickPopUpClose = () => {
  closeTemplate();
};

function closeTemplate() {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onClickPopUpClose);
}

const getSuccessMessage = () => {
  successFragmentElement.append(successMessage);
  document.body.append(successFragmentElement);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onClickPopUpClose);
  map.closePopup();
  offerForm.reset();
  addressField.value = `${defaultLat}, ${defaultLng}`;
  submitButton.disabled = false;
};

const getErrorMessage = () => {
  errorFragmentElement.append(errorMessage);
  document.body.append(errorFragmentElement);
  document.addEventListener('click', onClickPopUpClose);
  document.addEventListener('keydown', onPopupEscKeydown);
  submitButton.disabled = false;
};

const showAlert = (message) => {
  const alertElement = alertContainer.cloneNode(true);

  alertElement.textContent = message;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

export {getErrorMessage, getSuccessMessage, showAlert};
