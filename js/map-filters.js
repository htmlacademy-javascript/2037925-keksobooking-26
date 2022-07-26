const ANY_VALUE = 'any';

const priceValue = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 49999,
  },
  high: {
    min: 50000,
    max: 100000,
  }
};

const mapFilters = document.querySelector('.map__filters');
const mapFilterType = mapFilters.querySelector('#housing-type');
const mapFilterPrice = mapFilters.querySelector('#housing-price');
const mapFilterRooms = mapFilters.querySelector('#housing-rooms');
const mapFilterGuests = mapFilters.querySelector('#housing-guests');
const mapFilterFeatures = mapFilters.querySelector('#housing-features');

const getFilteredMap = (data) => {
  const availableFeatures = mapFilterFeatures.querySelectorAll('input:checked');

  const getFilteredType = () => mapFilterType.value === ANY_VALUE ||
    data.offer.type === mapFilterType.value;
  const getFilteredPrice = () => mapFilterPrice.value === ANY_VALUE ||
    (data.offer.price >= priceValue[mapFilterPrice.value].min && data.offer.price <= priceValue[mapFilterPrice.value].max);
  const getFilteredRooms = () => mapFilterRooms.value === ANY_VALUE ||
    data.offer.rooms === Number(mapFilterRooms.value);
  const getFilteredGuests = () => mapFilterGuests.value === ANY_VALUE ||
    data.offer.guests === Number(mapFilterGuests.value);

  const getFilteredFeatures = () => {
    if (availableFeatures.length) {
      if (data.offer.features) {
        return Array.from(availableFeatures).every((checkbox) => data.offer.features.includes(checkbox.value));
      }
    }
    return !availableFeatures.length;
  };

  return getFilteredType(data, mapFilterType) &&
  getFilteredPrice(data, mapFilterPrice) &&
  getFilteredRooms(data, mapFilterRooms) && getFilteredGuests(data,mapFilterGuests) &&
  getFilteredFeatures(data, availableFeatures);
};

export {mapFilters, getFilteredMap};
