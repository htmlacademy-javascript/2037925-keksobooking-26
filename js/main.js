import './popup.js';
import './form-activation.js';
import {loadAvatar, loadPhoto} from './pictures.js';
import {mapFilters, getFilteredMap} from './map-filters.js';
import {getData} from './server-calls.js';
import {renderCards, clearMarkers} from './map.js';
import {showAlert} from './message.js';
import {setUserFormSubmit, runFormValidation} from './form-validation.js';
import {debounce} from './utils.js';

const MAX_OFFER_COUNT = 10;
const RERENDER_DELAY = 500;

getData((offers) => {
  renderCards(offers.slice(0, 10));

  mapFilters.addEventListener('change', debounce(() => {
    clearMarkers();
    renderCards(offers.slice().filter(getFilteredMap).slice(0, MAX_OFFER_COUNT));
  }, RERENDER_DELAY));
}, (error) => showAlert(`Ошибка загрузки данных, ${error}`));

setUserFormSubmit();
runFormValidation();
loadAvatar();
loadPhoto();
