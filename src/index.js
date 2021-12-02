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
const popupForEdit = new PopupProfile(popupEdit);		//создание попапа Профиля
const popupForAddPlace = new PopupAddNewPlace(popupAddPlace, cardSetting, popupLookPlace);	//создание попапа Нового места
const formAddPlaceValid = new FormValidator(formSetting, '.popup_add-place');// валидность для попапа добавить место
	formAddPlaceValid.enableValidation();
const formElementProfileValid = new FormValidator(formSetting, '.popup_edit');	// валидность для попапа редактировать профиль
	formElementProfileValid.enableValidation();

// добавление начальных карточек
arrayPlaces.forEach((item) => {
  const card = new Card(cardSetting, '.places__template', item.name, item.link, popupLookPlace);
	card.rendererCard();
});

// открытие попапа профиля
buttonEdit.addEventListener('click', () => {
  formElementProfileValid.clearError();
	popupForEdit.openPopup();
});

// открыть попап addPlace
buttonAddPlace.addEventListener('click', () => {
  formAddPlaceValid.clearError();
	popupForAddPlace.openPopup();
});