const cardList = document.querySelector('#map-canvas');
const template = document.querySelector('#card').content.querySelector('.popup');

const typeOfHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

function insertOffer (offer) {
  const offerElement = template.cloneNode(true);

  const availableFeatures = offer.offer.features;
  const featureContainer = offerElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');

  const availablePhotos = offer.offer.photos;
  const photoContainer = offerElement.querySelector('.popup__photos');
  const photolist = photoContainer.querySelector('.popup__photo');

  if (!availablePhotos) {
    photolist.remove();
  } else {
    photolist.remove();
    availablePhotos.forEach((picture) => {
      const photoClone = photolist.cloneNode();
      photoClone.src = picture;
      photoClone.width = 45;
      photoClone.height = 40;
      photoClone.alt = 'Фотография жилья';
      photoContainer.appendChild(photoClone);
    });
  }

  if (!availableFeatures) {
    featureContainer.remove();
  } else {
    featureList.forEach((popupFeatureItem)=>{
      const isReal = availableFeatures.some((feature)=> popupFeatureItem.classList.contains(`popup__feature--${feature}`));
      if (!isReal){
        popupFeatureItem.remove();
      }
      if(!availableFeatures.length){
        featureContainer.classList.add('hidden');
      }
    });
  }

  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = typeOfHousing[offer.offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  offerElement.querySelector('.popup__description').textContent = offer.offer.description;
  offerElement.querySelector('.popup__avatar').src = offer.author.avatar;

  cardList.appendChild(offerElement);

  return offerElement;
}

export {insertOffer};
