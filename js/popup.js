import {offers} from './data.js';

const cardList = document.querySelector('#map-canvas');
const template = document.querySelector('#card').content.querySelector('.popup');

function getTemplateContent () {
  offers.forEach((declaration) => {
    const declarationElement = template.cloneNode(true);

    const availableFeatures = declaration.offer.features;
    const featureContainer = declarationElement.querySelector('.popup__features');
    const featureList = featureContainer.querySelectorAll('.popup__feature');

    const availablePhotos = declaration.offer.photos;
    const photoContainer = declarationElement.querySelector('.popup__photos');
    const photolist = photoContainer.querySelector('.popup__photo');

    availablePhotos.forEach((picture) => {
      const photoClone = photolist.cloneNode(true);
      photoClone.src = picture;
      photoContainer.appendChild(photoClone);
    });

    photolist.remove('popup_photo');


    featureList.forEach((featureListItem) => {
      const isNecessary = availableFeatures.some(
        (availableFeature) => featureListItem.classList.contains(`popup__feature--${availableFeature}`)
      );

      if (!isNecessary) {
        featureListItem.remove();
      }
    });

    declarationElement.querySelector('.popup__title').textContent = declaration.offer.title;
    declarationElement.querySelector('.popup__text--address').textContent = declaration.offer.address;
    declarationElement.querySelector('.popup__text--price').textContent = `${declaration.offer.price} ₽/ночь`;
    declarationElement.querySelector('.popup__type').textContent = declaration.offer.type;
    declarationElement.querySelector('.popup__text--capacity').textContent = `${declaration.offer.rooms} комнаты для ${declaration.offer.guests} гостей`;
    declarationElement.querySelector('.popup__text--time').textContent = `Заезд после ${declaration.offer.checkin}, выезд до ${declaration.offer.checkout}`;
    declarationElement.querySelector('.popup__description').textContent = declaration.offer.description;
    declarationElement.querySelector('.popup__avatar').src = declaration.author.avatar;

    cardList.appendChild(declarationElement);
  });
}

getTemplateContent();
