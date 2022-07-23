import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => showAlert(`Ошибка отправки данных, ${error}`));
};

const sendData = (onSuccess, body) => {
  fetch('https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .catch((error) => showAlert(`Ошибка загрузки данных, ${error}`));
};

export {getData, sendData};
