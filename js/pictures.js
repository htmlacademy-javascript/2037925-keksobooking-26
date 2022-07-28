const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__avatar');
const fileChooserPhoto = document.querySelector('.ad-form__input');
const previewPhoto = document.querySelector('.ad-form__photo');

const avatarAdd = () => {
  const file = fileChooserAvatar.files[0];
  if (!file) {
    return;
  }
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
};

const photoAdd = () => {
  const file = fileChooserPhoto.files[0];
  if (!file) {
    return;
  }
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches && previewPhoto.children.length < 3) {
    const imgPhoto = document.createElement('img');
    imgPhoto.style.width = '70px';
    imgPhoto.style.height = '70px';
    imgPhoto.style.alt = 'Фотография жилья';
    imgPhoto.src = URL.createObjectURL(file);
    previewPhoto.appendChild(imgPhoto);
  }
};


const uploadAvatar = () => {
  fileChooserAvatar.addEventListener('change', avatarAdd);
};

const uploadPhoto = () => {
  fileChooserPhoto.addEventListener('change', photoAdd);
};


export {uploadAvatar, uploadPhoto};
