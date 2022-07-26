const GET_DATA_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://26.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => onFail(error));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_DATA_URL,
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
      onFail();
    })
    .catch(onFail);
};

export {getData, sendData};
