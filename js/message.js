import {isEscapeKey} from './utils.js';
import {resetMap} from './map.js';

const ALERT_SHOW_TIME = 5000;
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

const offerForm = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');
const addressField = document.querySelector('#address');
const submitButton = offerForm.querySelector('.ad-form__submit');
const price = offerForm.querySelector('#price');
const typeOfHousing = document.querySelector('#type');
const priceSlider = document.querySelector('.ad-form__slider');
const previewPhoto = document.querySelector('.ad-form__photo');
const previewAvatar = document.querySelector('.ad-form-header__avatar');
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
  resetMap();
  offerForm.reset();
  mapFilterForm.reset();
  addressField.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;
  previewAvatar.src = AVATAR_DEFAULT;
  previewPhoto.innerHTML = '';
  price.placeholder = typeOfHousingPrice[typeOfHousing.value];
  priceSlider.noUiSlider.reset();
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
