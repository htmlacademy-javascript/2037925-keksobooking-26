import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => showAlert(`Ошибка загрузки данных, ${error}`));
};

const sendData= (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте еще раз');
    });
};

export {getData, sendData};
