function getNumber (min, max) {
  if (max <= min) {
    return null;
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

getNumber();

function getFractionalNumber (min, max) {
  if (max <= min) {
    return null;
  }

  return Math.random() * (max - min) + min;
}

getFractionalNumber();
