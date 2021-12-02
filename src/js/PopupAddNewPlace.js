import Popup from './Popup';
import Card from './Card'

class PopupAddNewPlace extends Popup{
	constructor(popupSelector, cardSetting, popupLookPlace){
		super(popupSelector)
		this._form = this._popup.querySelector('.popup__form_add-place')
		this._cardSetting = cardSetting
		this._popupLookPlace = popupLookPlace
		this._inputNamePlace = document.querySelector('.popup__input_name-place')
		this._inputImageUrl = document.querySelector('.popup__input_url-image')
	}

	closePopup(){
		super.closePopup()
		this._inputNamePlace.value = ''
		this._inputImageUrl.value = ''
	}
	_submitButton = (e) => {
		e.preventDefault()
		this._newCard = new Card(this._cardSetting, '.places__template', this._inputNamePlace.value, this._inputImageUrl.value, this._popupLookPlace)
		this._newCard.rendererCard()
		this.closePopup()
	}
	_setEventListener = () => {
		super._setEventListener()
		this._form.addEventListener('submit', this._submitButton)
		}
	}
export default PopupAddNewPlace