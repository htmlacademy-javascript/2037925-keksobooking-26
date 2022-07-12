const offerForm = document.querySelector('.ad-form');
const price = offerForm.querySelector('#price');
const typeOfHousing = document.querySelector('#type');
const roomNumber = offerForm.querySelector('#room_number');
const capacityGuests = offerForm.querySelector('#capacity');
const timeIn = offerForm.querySelector('#timein');
const timeOut = offerForm.querySelector('#timeout');

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error'
}, false);

function validateTitleNotice (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator (
  offerForm.querySelector('#title'),
  validateTitleNotice,
  'От 30 до 100 символов'
);

const minPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};

const maxPrice = 100000;

typeOfHousing.addEventListener('change', () => {
  price.placeholder = minPrice[typeOfHousing.value];
  price.min = minPrice[typeOfHousing.value];
  price.value = '';
});

function validatePrice (value) {
  return value <= maxPrice && value >= minPrice[typeOfHousing.value];
}

function getPriceErrorMessage (){
  return `Не менее ${minPrice[typeOfHousing.value]} и не более ${maxPrice}`;
}

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

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

function validateCapacity () {
  return possibleCapacity[roomNumber.value].includes(capacityGuests.value);
}

function getCapacityErrorMessage () {
  return `${roomNumber.value} ${words[roomNumber.value].room} ${words[roomNumber.value].guest}`;
}

pristine.addValidator(roomNumber, validateCapacity);
pristine.addValidator(capacityGuests, validateCapacity, getCapacityErrorMessage);

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
  pristine.validate();
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
  pristine.validate();
});

function validateTime () {
  return  timeIn.value === timeOut.value;
}

pristine.addValidator(timeOut, validateTime);

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
