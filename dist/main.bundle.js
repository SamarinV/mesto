/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/FormValidator.js
class FormValidator {
  constructor(formElement, form) {
    this._formSelector = formElement.formSelector;
    this._inputSelector = formElement.inputSelector;
    this._submitButtonSelector = formElement.submitButtonSelector;
    this._inactiveButtonClass = formElement.inactiveButtonClass;
    this._inputErrorClass = formElement.inputErrorClass;
    this._errorClassActive = formElement.errorClassActive;
    this._form = form;
    this._inputList = formElement.inputList;
    this._submitButton = formElement.submitButton;
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClassActive);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(this._errorClassActive);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);

      this._submitButton.setAttribute('disabled', 'true');
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);

      this._submitButton.removeAttribute('disabled');
    }
  } // ищем инпуты выбранной формы через массив инпутов для каждой формы для дальнейшей валидации


  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);

      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);

        this._toggleButtonState();
      });
    });
  }

  _getForm() {
    const formElement = document.querySelector(this._form);
    return formElement;
  }

  enableValidation() {
    this._formElement = this._getForm();

    this._setEventListeners();

    return this._formElement;
  }

  clearError() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

}

/* harmony default export */ const js_FormValidator = (FormValidator);
;// CONCATENATED MODULE: ./src/js/formSetting.js
const formSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error_active'
};
/* harmony default export */ const js_formSetting = (formSetting);
;// CONCATENATED MODULE: ./src/js/arrayPlaces.js
const arrayPlaces = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];
/* harmony default export */ const js_arrayPlaces = (arrayPlaces);
;// CONCATENATED MODULE: ./src/js/Popup.js
class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._buttonClose = this._popup.querySelector('.popup__close');
  }

  openPopup() {
    this._popup.classList.add('popup_open');

    this._setEventListener();
  }

  closePopup() {
    this._popup.classList.remove('popup_open');
  }

  _closePopupKeyEsc = () => {
    closePopup();
    document.removeEventListener('keydown', this._closePopupKeyEsc);
  };

  _setEventListener() {
    this._popup.addEventListener('click', e => {
      if (!e.target.closest('.popup__container') || e.target === this._buttonClose) {
        this.closePopup();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.closePopup();
      }
    });
  }

}

/* harmony default export */ const js_Popup = (Popup); // открытие попапов

function openPopup(el) {
  el.classList.add('popup_open');
  document.addEventListener('keydown', keyEscape);
} // закрытие попапов


function closePopup(el) {
  el.classList.remove('popup_open');
  document.removeEventListener('keydown', keyEscape);
} // закрытие попапов на нажатие Escape


function keyEscape(e) {
  if (e.key === 'Escape') {
    const popupCloseEscape = document.querySelector('.popup_open');
    closePopup(popupCloseEscape);
  }
}
;// CONCATENATED MODULE: ./src/js/PopupImage.js


class PopupImage extends js_Popup {
  constructor(popupSelector, cardName, cardLink) {
    super(popupSelector);
    this._name = cardName;
    this._link = cardLink;
    this._image = document.querySelector('.popup__image');
    this._title = document.querySelector('.popup__image-description');
  }

  openPopup() {
    this._image.setAttribute('src', `${this._link}`);

    this._image.setAttribute('alt', this._name);

    this._title.textContent = this._name;
    super.openPopup();
  }

}

/* harmony default export */ const js_PopupImage = (PopupImage);
;// CONCATENATED MODULE: ./src/js/Card.js

const boxForCard = document.querySelector('.places');

class Card {
  constructor(cardSetting, template, name, link, popup) {
    this._popup = popup;
    this._name = name;
    this._link = link;
    this._template = template;
    this._cardClass = cardSetting.cardClass;
    this._likeClass = cardSetting.likeClass;
    this._toggleLike = cardSetting.toggleLike;
    this._buttonDeleteClass = cardSetting.buttonDeleteClass;
    this._imageClass = cardSetting.imageClass;
    this._imageTitleClass = cardSetting.imageTitleClass;
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._template).content.querySelector(this._cardClass).cloneNode(true);
    return cardElement;
  };
  _handleDeleteCard = () => {
    this._element.remove();

    this._element = null;
  };
  _handleToggleLike = () => {
    this._element.querySelector(this._likeClass).classList.toggle(this._toggleLike);
  };

  _setEventListeners() {
    this._element.querySelector(this._buttonDeleteClass).addEventListener('click', this._handleDeleteCard);

    this._element.querySelector(this._likeClass).addEventListener('click', this._handleToggleLike);

    this._element.querySelector(this._imageClass).addEventListener('click', () => {
      const popupForImage = new js_PopupImage(this._popup, this._name, this._link);
      popupForImage.openPopup();
    });
  }

  _generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners(); //удалени, смена лайка, открытие попапа с картинкой


    this._element.querySelector(this._imageClass).setAttribute('src', `${this._link}`);

    this._element.querySelector(this._imageClass).setAttribute('alt', this._name);

    this._element.querySelector(this._imageTitleClass).textContent = this._name;
    return this._element;
  } // функция добавления карточек


  rendererCard() {
    this._generateCard();

    boxForCard.prepend(this._element);
  }

}

/* harmony default export */ const js_Card = (Card);
;// CONCATENATED MODULE: ./src/js/cardSetting.js
const cardSetting = {
  cardClass: '.places__item',
  likeClass: '.places__like',
  toggleLike: 'places__like_active',
  buttonDeleteClass: '.places__delete',
  imageClass: '.places__image',
  imageTitleClass: '.places__title',
  popupImageLookPlace: '.popup__image',
  popupImageTitleLookPlace: '.popup__image-description'
};
/* harmony default export */ const js_cardSetting = (cardSetting);
;// CONCATENATED MODULE: ./src/js/PopupProfile.js


class PopupProfile extends js_Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form_edit');
    this._profileName = document.querySelector('.profile__name');
    this._profileAboutSelf = document.querySelector('.profile__about-self');
    this._inputNewName = this._form.querySelector('.popup__input_profile-name');
    this._inputAboutSelf = this._form.querySelector('.popup__input_about-self');
  }

  closePopup() {
    super.closePopup();
    this._inputNewName.value = this._profileName.textContent;
    this._inputAboutSelf.value = this._profileAboutSelf.textContent;
  }

  _setEventListener() {
    super._setEventListener();

    this._form.addEventListener('submit', e => {
      e.preventDefault();
      this._profileName.textContent = this._inputNewName.value;
      this._profileAboutSelf.textContent = this._inputAboutSelf.value;
      this.closePopup();
    });
  }

}

/* harmony default export */ const js_PopupProfile = (PopupProfile);
;// CONCATENATED MODULE: ./src/js/PopupAddNewPlace.js



class PopupAddNewPlace extends js_Popup {
  constructor(popupSelector, cardSetting, popupLookPlace) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form_add-place');
    this._cardSetting = cardSetting;
    this._popupLookPlace = popupLookPlace;
    this._inputNamePlace = document.querySelector('.popup__input_name-place');
    this._inputImageUrl = document.querySelector('.popup__input_url-image');
  }

  closePopup() {
    super.closePopup();
    this._inputNamePlace.value = '';
    this._inputImageUrl.value = '';
  }

  _submitButton = e => {
    e.preventDefault();
    this._newCard = new js_Card(this._cardSetting, '.places__template', this._inputNamePlace.value, this._inputImageUrl.value, this._popupLookPlace);

    this._newCard.rendererCard();

    this.closePopup();
  };
  _setEventListener = () => {
    super._setEventListener();

    this._form.addEventListener('submit', this._submitButton);
  };
}

/* harmony default export */ const js_PopupAddNewPlace = (PopupAddNewPlace);
;// CONCATENATED MODULE: ./src/index.js








const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__button-edit');
const popupAddPlace = document.querySelector('.popup_add-place');
const buttonAddPlace = document.querySelector('.profile__button-add');
const popupLookPlace = document.querySelector('.popup_position_look-place');
const popupForEdit = new js_PopupProfile(popupEdit); //создание попапа Профиля

const popupForAddPlace = new js_PopupAddNewPlace(popupAddPlace, js_cardSetting, popupLookPlace); //создание попапа Нового места

const formAddPlaceValid = new js_FormValidator(js_formSetting, '.popup_add-place'); // валидность для попапа добавить место

formAddPlaceValid.enableValidation();
const formElementProfileValid = new js_FormValidator(js_formSetting, '.popup_edit'); // валидность для попапа редактировать профиль

formElementProfileValid.enableValidation(); // добавление начальных карточек

js_arrayPlaces.forEach(item => {
  const card = new js_Card(js_cardSetting, '.places__template', item.name, item.link, popupLookPlace);
  card.rendererCard();
}); // открытие попапа профиля

buttonEdit.addEventListener('click', () => {
  formElementProfileValid.clearError();
  popupForEdit.openPopup();
}); // открыть попап addPlace

buttonAddPlace.addEventListener('click', () => {
  formAddPlaceValid.clearError();
  popupForAddPlace.openPopup();
});
/******/ })()
;