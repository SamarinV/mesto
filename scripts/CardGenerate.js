

export class Card{
	constructor(element, cardSelector){
		this._name = element.name;
		this._link = element.link;
		this._cardSelector = cardSelector;
	}

	_getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__item').cloneNode(true);
    return cardElement;
  }

	_handleDeleteCard() {
		this._element.remove();
	}
	_handleToggleLike() {
		this._element.querySelector('.places__like').classList.toggle('places__like_active');
	}

	_setEventListeners() {

		this._element.querySelector('.places__delete').addEventListener('click', () => {
			this._handleDeleteCard()
		});
		this._element.querySelector('.places__like').addEventListener('click', () => {
			this._handleToggleLike();
		});

  }
	generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.places__image').setAttribute('src', `${this._link}`);
    this._element.querySelector('.places__image').setAttribute('alt', this._name);
    this._element.querySelector('.places__title').textContent = this._name;
    return this._element;
  }
}
