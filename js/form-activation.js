const offerForm = document.querySelector('.ad-form');
const offerFormElements = offerForm.children;
const mapFilterForm = document.querySelector('.map__filters');
const mapFilterFormElements = mapFilterForm.children;

const blockForm = () => {
  offerForm.classList.add('ad-form--disabled');

  for (const element of offerFormElements) {
    element.disabled = true;
  }

  mapFilterForm.classList.add('map__filters--disabled');

  for (const element of mapFilterFormElements){
    element.disabled = true;
  }
};


const unlockForm = () => {
  offerForm.classList.remove('ad-form--disabled');

  for (const element of offerFormElements) {
    element.disabled = false;
  }

  mapFilterForm.classList.remove('map__filters--disabled');

  for (const element of mapFilterFormElements){
    element.disabled = false;
  }
};

export {unlockForm, blockForm};
