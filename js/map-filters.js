const mapFilters = document.querySelector('.map__filters');
const mapFilterType = mapFilters.querySelector('#housing-type');
const mapFilterPrice = mapFilters.querySelector('#housing-price');
const mapFilterRooms = mapFilters.querySelector('#housing-rooms');
const mapFilterGuests = mapFilters.querySelector('#housing-guests');

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

const getFilteredMap = (data) => {
  const mapFilterFeatures = mapFilters.querySelector('#housing-features').querySelectorAll('input:checked');
  const getFilteredType = () => mapFilterType.value === ANY_VALUE || data.offer.type === mapFilterType.value;
  const getFilteredPrice = () => mapFilterPrice.value === ANY_VALUE || (data.offer.price >= priceValue[mapFilterPrice.value].min && data.offer.price <= priceValue[mapFilterPrice.value].max);
  const getFilteredRooms = () => mapFilterRooms.value === ANY_VALUE || data.offer.rooms === Number(mapFilterRooms.value);
  const getFilteredGuests = () => mapFilterGuests.value === ANY_VALUE || data.offer.guests === Number(mapFilterGuests.value);

  const getFilteredFeatures = () => {
    if (mapFilterFeatures.length) {
      if (data.offer.features) {
        return Array.from(mapFilterFeatures).every((checkbox) => data.offer.features.includes(checkbox.value));
      }
    } else {
      return mapFilterFeatures.length === 0;
    }
  };

  return getFilteredType(data, mapFilterType) && getFilteredPrice(data, mapFilterPrice) && getFilteredRooms(data, mapFilterRooms) && getFilteredGuests(data,mapFilterGuests) && getFilteredFeatures(data, mapFilterFeatures);
};

export {mapFilters, getFilteredMap};
