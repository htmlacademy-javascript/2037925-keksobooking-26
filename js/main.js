import './popup.js';
import './form-activation.js';
import './form-validation.js';
import './map.js';
import './server-calls.js';
import './utils.js';
import './map-filters.js';
import {mapFilters, getFilteredMap} from './map-filters.js';
import {getData} from './server-calls.js';
import {renderCards, clearMarkers} from './map.js';
import {runFormValidation, setUserFormSubmit, getSuccessMessage, getErrorMessage} from './form-validation.js';
import {debounce} from './utils.js';

const OFFER_COUNT = 10;
const RERENDER_DELAY = 500;

getData((offers) => {
  renderCards(offers.slice(0, OFFER_COUNT));

  mapFilters.addEventListener('change', debounce(() => {
    clearMarkers();
    renderCards(offers.slice().filter(getFilteredMap).slice(0, OFFER_COUNT));
  }, RERENDER_DELAY));
});


setUserFormSubmit(getSuccessMessage, getErrorMessage);

runFormValidation();
