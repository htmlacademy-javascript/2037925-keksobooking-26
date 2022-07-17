// eslint-disable-next-line no-unused-vars
import {offers} from './data.js';

const cardList = document.querySelector('#map-canvas');
const template = document.querySelector('#card').content.querySelector('.popup');

function insertOffer (offer) {
  const offerElement = template.cloneNode(true);

  const availableFeatures = offer.offer.features;
  const featureContainer = offerElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');

  const availablePhotos = offer.offer.photos;
  const photoContainer = offerElement.querySelector('.popup__photos');
  const photolist = photoContainer.querySelector('.popup__photo');

  featureList.forEach((featureListItem) => {
    const isNecessary = availableFeatures.some(
      (availableFeature) => featureListItem.classList.contains(`popup__feature--${availableFeature}`)
    );

    if (!isNecessary) {
      featureListItem.remove();
    }
  });

  availablePhotos.forEach((picture) => {
    const photoClone = photolist.cloneNode(true);
    photoClone.src = picture;
    photoContainer.appendChild(photoClone);
  });

  photolist.remove('popup_photo');

  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = offer.offer.type;
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  offerElement.querySelector('.popup__description').textContent = offer.offer.description;
  offerElement.querySelector('.popup__avatar').src = offer.author.avatar;

  cardList.appendChild(offerElement);

  return offerElement;
}

export {insertOffer};
