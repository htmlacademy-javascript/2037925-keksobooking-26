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

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

getRandomPositiveInteger();

function getRandomPositiveFloat (a, b, digits = 5) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

getRandomPositiveFloat();

const getRandomArrayElement = (elements) =>
  elements [getRandomPositiveInteger(0, elements.length - 1)];

const createObj = () => {
  const randomInteger = getRandomPositiveInteger(1, 10);
  const randomLat = getRandomPositiveFloat(35.65000, 35.70000);
  const randomLng = getRandomPositiveFloat(139.70000, 139.80000);

  return {
    author: {
      avatar: `img/avatars/user${randomInteger >= 10 ? '0' : ''}${randomInteger}.png`
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
        getArray(FEATURES)
      ],
      description: 'Описание помещения',
      photos: [
        getArray(PHOTOS)
      ],
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    }
  };
};


function getArray (arr) {
  const maxLength = arr.length;
  const lengthOfArray = getRandomPositiveInteger(1, maxLength);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomPositiveInteger(0, maxLength - 1);
    const el = arr[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
}

const SIMILAR_OBJECT_COUNT = 10;

const similarObjects = Array.from({length: SIMILAR_OBJECT_COUNT}, createObj);

similarObjects();
