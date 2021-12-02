import FormValidator from './js/FormValidator';
import formSetting from './js/formSetting';
import arrayPlaces from './js/arrayPlaces';
import Card from './js/Card';
import cardSetting from './js/cardSetting';
import PopupProfile from './js/PopupProfile'
import PopupAddNewPlace from './js/PopupAddNewPlace'

import './styles/pages/index.css';

const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__button-edit');
const popupAddPlace = document.querySelector('.popup_add-place');
const buttonAddPlace = document.querySelector('.profile__button-add');
const popupLookPlace = document.querySelector('.popup_position_look-place');

// валидность для попапа добавить место
const formElementAddPlace = new FormValidator(formSetting, '.popup_add-place');
formElementAddPlace.enableValidation();
// валидность для попапа редактировать профиль
const formElementEditProfile = new FormValidator(formSetting, '.popup_edit');
formElementEditProfile.enableValidation();

// добавление начальных карточек
arrayPlaces.forEach((item) => {
  const card = new Card(cardSetting, '.places__template', item.name, item.link, popupLookPlace);
	card.rendererCard();
});

// открыть редактирования профиля
buttonEdit.addEventListener('click', () => {
	const popup = new PopupProfile(popupEdit);
	popup.openPopup();
});
// открыть попап addPlace
buttonAddPlace.addEventListener('click', () => {
  formElementAddPlace.clearError();
  const popup = new PopupAddNewPlace(popupAddPlace, cardSetting, popupLookPlace);
	popup.openPopup();
});










// кнопка сохранить изменения профиля
// formEditProfile.addEventListener('submit', (e) => {
//   e.preventDefault();
//   profileName.textContent = inputEditProfileName.value;
//   profileAboutSelf.textContent = inputEditProfileAbout.value;

//   // closePopup(popupEdit);
// });

//---------------------------------------------------------------------
// общий функционал для попапов

// // открытие попапов
// function openPopup(el) {
//   el.classList.add('popup_open');
//   document.addEventListener('keydown', keyEscape);
// }
// // закрытие попапов
// function closePopup(el) {
//   el.classList.remove('popup_open');
//   document.removeEventListener('keydown', keyEscape);
// }

// // закрытие попапов на нажатие Escape
// function keyEscape(e) {
//   if (e.key === 'Escape') {
//     const popupCloseEscape = document.querySelector('.popup_open');
//     closePopup(popupCloseEscape);
//   }
// }

//--------------------------------------------------------------------
// функционал для попапа lookPlace

// закрыть при клике на кнопку закрыть или на оверлей
// popupLookPlace.addEventListener('click', (e) => {
//   if (!e.target.closest('.popup__container') || e.target === buttonCloseLookPlace) {
//     closePopup(popupLookPlace);
//   }
// });

// закрыть редактирование профиля по нажатию на крестик или на оверлей
// popupEdit.addEventListener('click', (e) => {
//   if (!e.target.closest('.popup__container') || e.target === buttonCloseEdit) {
//     closePopup(popupEdit);
//   }
// });

// закрыть попап addPlace при клике на кнопку закрыть или на оверлей
// popupAddPlace.addEventListener('click', (e) => {
//   if (!e.target.closest('.popup__container') || e.target === buttonCloseAddPlace) {
//     closePopup(popupAddPlace);
//   }
// });
// кнопка добавить новое место
// formAddPlace.addEventListener('submit', (e) => {
//   e.preventDefault();
//   createCard(cardSetting, '.places__template', newNamePlace.value, newImageUrl.value, popupLookPlace, openPopup);

//   closePopup(popupAddPlace);
// });