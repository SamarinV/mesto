import Popup from './Popup';

class PopupImage extends Popup{
	constructor(popupSelector, cardName, cardLink){
		super(popupSelector)
		this._name = cardName
		this._link = cardLink
		this._image = document.querySelector('.popup__image');
    this._title = document.querySelector('.popup__image-description');
	}

  openPopup(){
    this._image.setAttribute('src', `${this._link}`);
    this._image.setAttribute('alt', this._name);
    this._title.textContent = this._name;
    super.openPopup();
  };
}

export default PopupImage