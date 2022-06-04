function getNumber (min, max) {
  if (max <= min) {
    return console.log('Error');
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

let randomNumber = getNumber();

function getFractionalNumber (min, max) {
  if (max <= min) {
    return console.log('Error');
  }

  return Math.random() * (max - min) + min;
}

let randomFractionalNumber = getFractionalNumber();
