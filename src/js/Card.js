class Card {
  constructor(cardSetting, cardSelector, name, link, popup, openPopup) {
    this._openPopup = openPopup;
    this._popup = popup;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._cardClass = cardSetting.cardClass;
    this._likeClass = cardSetting.likeClass;
    this._toggleLike = cardSetting.toggleLike;
    this._buttonDeleteClass = cardSetting.buttonDeleteClass;
    this._imageClass = cardSetting.imageClass;
    this._imageTitleClass = cardSetting.imageTitleClass;
    this._popupImageLookPlace = document.querySelector(cardSetting.popupImageLookPlace);
    this._popupImageTitleLookPlace = document.querySelector(cardSetting.popupImageTitleLookPlace);
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(this._cardClass).cloneNode(true);
    return cardElement;
  };

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _handleToggleLike = () => {
    this._element.querySelector(this._likeClass).classList.toggle(this._toggleLike);
  };

  _handleOpenPopup = () => {
    this._popupImageLookPlace.setAttribute('src', `${this._link}`);
    this._popupImageLookPlace.setAttribute('alt', this._name);
    this._popupImageTitleLookPlace.textContent = this._name;
    this._openPopup(this._popup);
  };

  _setEventListeners() {
    this._element.querySelector(this._buttonDeleteClass).addEventListener('click', this._handleDeleteCard);
    this._element.querySelector(this._likeClass).addEventListener('click', this._handleToggleLike);
    this._element.querySelector(this._imageClass).addEventListener('click', this._handleOpenPopup);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(this._imageClass).setAttribute('src', `${this._link}`);
    this._element.querySelector(this._imageClass).setAttribute('alt', this._name);
    this._element.querySelector(this._imageTitleClass).textContent = this._name;
    return this._element;
  }
}

export default Card;
