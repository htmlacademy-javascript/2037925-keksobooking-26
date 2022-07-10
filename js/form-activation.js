const mapFilterForm = document.querySelector('.map__filters');
const mapFilterFormElements = mapFilterForm.children;

function blockForm () {
  mapFilterForm.classList.add('map__filters--disabled');

  for (const element of mapFilterFormElements){
    element.disabled = true;
  }
}

blockForm();


function unlockForm () {
  mapFilterForm.classList.remove('map__filters--disabled');

  for (const element of mapFilterFormElements){
    element.disabled = false;
  }
}

unlockForm();
