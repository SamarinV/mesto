// import FormValidator from './js/FormValidator.js';
// import formSetting from './js/formSetting.js';
// import arrayPlaces from './js/arrayPlaces.js';
// import Card from './js/Card.js';
// import cardSetting from './js/cardSetting.js';

// editProfile
const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseEdit = document.querySelector('.popup__close_edit');
const profileName = document.querySelector('.profile__name');
const profileAboutSelf = document.querySelector('.profile__about-self');
const formEditProfile = document.querySelector('.popup__form_edit');
const inputEditProfileName = document.querySelector('.popup__input_profile-name');
const inputEditProfileAbout = document.querySelector('.popup__input_about-self');
// addPlace and lookPlace
const popupAddPlace = document.querySelector('.popup_add-place');
const buttonAddPlace = document.querySelector('.profile__button-add');
const buttonCloseAddPlace = document.querySelector('.popup__close_add-place');
const formAddPlace = document.querySelector('.popup__form_add-place');
const newNamePlace = document.querySelector('.popup__input_name-place');
const newImageUrl = document.querySelector('.popup__input_url-image');
const buttonCloseLookPlace = document.querySelector('.popup__close_look-place');
const boxForPlaces = document.querySelector('.places');
const popupLookPlace = document.querySelector('.popup_position_look-place');

//----------------------------------------------------------------------
// валидность у форм

// валидность для попапа добавить место
const formElementAddPlace = new FormValidator(formSetting, '.popup_add-place');
formElementAddPlace.enableValidation();
// валидность для попапа редактировать профиль
const formElementEditProfile = new FormValidator(formSetting, '.popup_edit');
formElementEditProfile.enableValidation();

//----------------------------------------------------------------------
// функция добавления карточек
function createCard(setting, templateSelector, name, link, popup, funcOpenPopup) {
  const card = new Card(setting, templateSelector, name, link, popup, funcOpenPopup);
  const cardElement = card.generateCard();
  boxForPlaces.prepend(cardElement);
}

// добавление начальных карточек
arrayPlaces.forEach((item) => {
  createCard(cardSetting, '.places__template', item.name, item.link, popupLookPlace, openPopup);
});

//---------------------------------------------------------------------
// общий функционал для попапов

// открытие попапов
function openPopup(el) {
  el.classList.add('popup_open');
  document.addEventListener('keydown', keyEscape);
}
// закрытие попапов
function closePopup(el) {
  el.classList.remove('popup_open');
  document.removeEventListener('keydown', keyEscape);
}

// закрытие попапов на нажатие Escape
function keyEscape(e) {
  if (e.key === 'Escape') {
    const popupCloseEscape = document.querySelector('.popup_open');
    closePopup(popupCloseEscape);
  }
}

//--------------------------------------------------------------------
// функционал для попапа lookPlace

// закрыть при клике на кнопку закрыть или на оверлей
popupLookPlace.addEventListener('click', (e) => {
  if (!e.target.closest('.popup__container') || e.target === buttonCloseLookPlace) {
    closePopup(popupLookPlace);
  }
});

//---------------------------------------------------------------------
// функционал редактирования профиля

// открыть
buttonEdit.addEventListener('click', () => {
  inputEditProfileName.value = profileName.textContent;
  inputEditProfileAbout.value = profileAboutSelf.textContent;
  // formElementEditProfile.clearError();;-------------------раскомментировать
  openPopup(popupEdit);
});

// закрыть редактирование профиля по нажатию на крестик или на оверлей
popupEdit.addEventListener('click', (e) => {
  if (!e.target.closest('.popup__container') || e.target === buttonCloseEdit) {
    closePopup(popupEdit);
  }
});

// кнопка сохранить изменения
formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = inputEditProfileName.value;
  profileAboutSelf.textContent = inputEditProfileAbout.value;
  closePopup(popupEdit);
});

//-----------------------------------------------------------------------
// функционал для попап addPlace

// открыть
buttonAddPlace.addEventListener('click', () => {
  newNamePlace.value = '';
  newImageUrl.value = '';
  formElementAddPlace.clearError();
  openPopup(popupAddPlace);
});
// закрыть попап addPlace при клике на кнопку закрыть или на оверлей
popupAddPlace.addEventListener('click', (e) => {
  if (!e.target.closest('.popup__container') || e.target === buttonCloseAddPlace) {
    closePopup(popupAddPlace);
  }
});
// кнопка добавить новое место
formAddPlace.addEventListener('submit', (e) => {
  e.preventDefault();
  createCard(cardSetting, '.places__template', newNamePlace.value, newImageUrl.value, popupLookPlace, openPopup);

  closePopup(popupAddPlace);
});