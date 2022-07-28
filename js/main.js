import './popup.js';
import './form-activation.js';
import {uploadAvatar, uploadPhoto} from './pictures.js';
import {mapFilters, getFilteredMap} from './map-filters.js';
import {getData} from './server-calls.js';
import {renderCards, clearMarkers, loadMap} from './map.js';
import {showAlert} from './message.js';
import {setUserFormSubmit, runFormValidation} from './form-validation.js';
import {debounce} from './utils.js';
import {unlockForm, blockForm} from './form-activation.js';

const MAX_OFFER_COUNT = 10;
const RERENDER_DELAY = 500;

blockForm();

getData((offers) => {
  renderCards(offers.slice(0, MAX_OFFER_COUNT));
  loadMap(unlockForm);
  mapFilters.addEventListener('change', debounce(() => {
    clearMarkers();
    renderCards(offers.slice().filter(getFilteredMap).slice(0, MAX_OFFER_COUNT));
  }, RERENDER_DELAY));
}, (error) => showAlert(`Ошибка загрузки данных, ${error}`));

setUserFormSubmit();
runFormValidation();
uploadAvatar();
uploadPhoto();
