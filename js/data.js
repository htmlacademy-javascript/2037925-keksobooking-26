import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement} from '.util.js';

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKINS_CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const picturesNotUsed = [];

const SIMILAR_OBJECT_COUNT = 10;

const createObject = () => {
  const randomLat = getRandomPositiveFloat(35.65000, 35.70000);
  const randomLng = getRandomPositiveFloat(139.70000, 139.80000);

  return {
    author: {
      avatar: `img/avatars/user${getRandomPicture()}.png`
    },
    offer: {
      title: 'Объявление',
      address: `${randomLat}, ${randomLng}`,
      price: getRandomPositiveInteger(0, 10),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(0, 10),
      guests: getRandomPositiveInteger(0, 10),
      checkin: getRandomArrayElement(CHECKINS_CHECKOUTS),
      checkout: getRandomArrayElement(CHECKINS_CHECKOUTS),
      features: [
        FEATURES.slice(getRandomPositiveInteger(0, FEATURES.length))
      ],
      description: 'Описание помещения',
      photos: [
        PHOTOS.slice(getRandomPositiveInteger(0, PHOTOS.length))
      ],
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    }
  };
};

function getRandomPicture() {
  if (picturesNotUsed.length === 0) {
    for (let i = 0; i < SIMILAR_OBJECT_COUNT + 1; ++i) {
      if (i !== 0 && i < 10) {
        picturesNotUsed.push(`0${i}`);
      } else if (i !== 0) {
        picturesNotUsed.push(i);
      }
    }
  }

  const index = Math.floor(Math.random() * picturesNotUsed.length);
  const id =  picturesNotUsed[index];

  picturesNotUsed.splice(index, 1);

  return id;
}

const createObjects = () => Array.from({length: SIMILAR_OBJECT_COUNT}, createObject);

export {createObjects};
