import './popup.js';
import './form-activation.js';
import './form-validation.js';
import './map.js';
import './server-calls.js';
import {getData} from './server-calls.js';
import {renderCards} from './map.js';
import {setUserFormSubmit, getSuccessMessage, getErrorMessage} from './form-validation.js';

const OFFER_COUNT = 10;

getData((offers) => {
  renderCards(offers.slice(0, OFFER_COUNT));
});

setUserFormSubmit(getSuccessMessage, getErrorMessage);
