export const cardSetting = {
	  cardClass: '.places__item',
		likeClass: '.places__like',
		toggleLike: 'places__like_active',
		buttonDeleteClass: '.places__delete',
		imageClass: '.places__image',
		imageTitleClass: '.places__title'
};

export class Card{
	constructor(cardSetting, cardSelector, name, link){
		this._name = name;
		this._link = link;
		this._cardSelector = cardSelector;
		this._cardClass = cardSetting.cardClass;
		this._likeClass = cardSetting.likeClass;
		this._toggleLike = cardSetting.toggleLike;
		this._buttonDeleteClass = cardSetting.buttonDeleteClass;
		this._imageClass = cardSetting.imageClass;
		this._imageTitleClass = cardSetting.imageTitleClass;
	}

	_getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(this._cardClass).cloneNode(true);
    return cardElement;
  }
	_handleDeleteCard() {
		this._element.remove();
	}
	_handleToggleLike() {
		this._likeClass.classList.toggle(this._toggleLike);
	}

	_setEventListeners() {
		this._element.querySelector(this._buttonDeleteClass).addEventListener('click', () => {
			this._handleDeleteCard()
		});
		this._element.querySelector(this._likeClass).addEventListener('click', () => {
			this._handleToggleLike();
		});
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
