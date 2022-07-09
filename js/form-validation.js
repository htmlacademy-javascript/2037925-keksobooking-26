const offerForm = document.querySelector('.ad-form');
const price = offerForm.querySelector('#price');
const typeOfHousing = document.querySelector('#type');

const minPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};

const maxPrice = {
  palace: 100000,
  flat: 100000,
  house: 100000,
  bungalow: 100000,
  hotel: 100000
};

const pristine = new Pristine(offerForm, {
  classTo:'ad-form__element',
  errorTextParent:'ad-form__element',
  errorTextClass:'ad-form__error-text',
});

function validateTitleNotice (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(offerForm.querySelector('#title'),validateTitleNotice);

typeOfHousing.addEventListener('change', () => {
  price.placeholder = minPrice[typeOfHousing.value];
  price.min = minPrice[typeOfHousing.value];
  price.value = '';
});

function validatePrice (value) {
  return value <= maxPrice[typeOfHousing.value] && value >= minPrice[typeOfHousing.value];
}

function getPriceErrorMessage (){
  return `не менее ${minPrice[typeOfHousing.value]} и не более ${maxPrice[typeOfHousing.value]}`;
}

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

offerForm.addEventListener('submit', (evt) => {
  if (!pristine.validate())
  {evt.preventDefault();}
});
