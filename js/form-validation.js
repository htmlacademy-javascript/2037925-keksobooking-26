import {sendData} from './server-calls.js';

const offerForm = document.querySelector('.ad-form');
const typeOfHousing = document.querySelector('#type');
const roomNumber = offerForm.querySelector('#room_number');
const capacityGuests = offerForm.querySelector('#capacity');
const timeIn = offerForm.querySelector('#timein');
const timeOut = offerForm.querySelector('#timeout');
const priceSlider = document.querySelector('.ad-form__slider');
const price = offerForm.querySelector('#price');
const body = document.querySelector('body');
const submitButton = offerForm.querySelector('.ad-form__submit');
const success = document.querySelector('#success')
  .content.querySelector('.success');
const error = document.querySelector('#error')
  .content.querySelector('.error');
const buttonError = error.querySelector('.error__button');

const minPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};

const maxPrice = 100000;

const possibleCapacity = {
  1:['1'],
  2:['1', '2'],
  3:['1', '2', '3'],
  100:['0']
};

const words = {
  1: {
    room: 'комната доступна',
    guest: 'для 1 гостя'
  },

  2: {
    room: 'комнаты доступны',
    guest: 'не более, чем для 2 гостей'
  },

  3: {
    room: 'комнаты доступны',
    guest: 'не более, чем для 3 гостей'
  },

  100: {
    room: 'комнат',
    guest: 'не для гостей'
  }
};

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error'
}, false);

const validateTitleNotice = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator (
  offerForm.querySelector('#title'),
  validateTitleNotice,
  'От 30 до 100 символов'
);

typeOfHousing.addEventListener('change', () => {
  price.placeholder = minPrice[typeOfHousing.value];
  price.min = minPrice[typeOfHousing.value];
  price.value = '';
});

const validatePrice = (value) => value <= maxPrice && value >= minPrice[typeOfHousing.value];

const getPriceErrorMessage = () => `Не менее ${minPrice[typeOfHousing.value]} и не более ${maxPrice}`;

const validateCapacity = () => possibleCapacity[roomNumber.value].includes(capacityGuests.value);

const getCapacityErrorMessage = () => `${roomNumber.value} ${words[roomNumber.value].room} ${words[roomNumber.value].guest}`;

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
  pristine.validate();
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
  pristine.validate();
});

const validateTime = () => timeIn.value === timeOut.value;

const runFormValidation = () => {
  pristine.addValidator(price, validatePrice, getPriceErrorMessage);
  pristine.addValidator(roomNumber, validateCapacity);
  pristine.addValidator(capacityGuests, validateCapacity, getCapacityErrorMessage);
  pristine.addValidator(timeOut, validateTime);
};


const activatePriceSlider = () => {
  noUiSlider.create(priceSlider, {
    range: {
      min: Number(price.min),
      max: Number(price.max),
    },
    start: Number(minPrice[typeOfHousing.value]),
    step: 1,
    connect:'lower',
  });

  priceSlider.noUiSlider.on('update', () => {
    price.value = priceSlider.noUiSlider.get();
  });
};

activatePriceSlider();

const getSuccessMessage = () => {
  const successMessage = success.cloneNode(true);
  body.appendChild(successMessage);
  document.addEventListener('click', () => {
    successMessage.remove();
  });
  document.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
    }
  });
  offerForm.reset();
  submitButton.disabled = false;
};

const getErrorMessage = () => {
  const errorMessage = error.cloneNode(true);

  body.appendChild(errorMessage);

  document.addEventListener('click', () => {
    errorMessage.remove();
  });
  document.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
    }
  });
  buttonError.querySelector('click', () => {
    errorMessage.remove();
  });
  submitButton.disabled = false;
};

const setUserFormSubmit = (onSuccess, onError) => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      sendData(
        onSuccess(),
        new FormData(evt.target),
      );
      return;
    }
    onError();
  });
};


export {runFormValidation, setUserFormSubmit, getSuccessMessage, getErrorMessage};
