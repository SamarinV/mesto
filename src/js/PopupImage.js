import Popup from './Popup';

class PopupImage extends Popup{
	constructor(popupSelector, cardName, cardLink){
		super(popupSelector)
		this._name = cardName
		this._link = cardLink
		this._popupImageLookPlace = document.querySelector('.popup__image');
    this._popupImageTitleLookPlace = document.querySelector('.popup__image-description');

	}

  openPopup(){
    this._popupImageLookPlace.setAttribute('src', `${this._link}`);
    this._popupImageLookPlace.setAttribute('alt', this._name);
    this._popupImageTitleLookPlace.textContent = this._name;
    super.openPopup();
  };
}

export default PopupImage