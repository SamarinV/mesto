
import Popup from './Popup';

class PopupProfile extends Popup{
	constructor(popupSelector){
		super(popupSelector)
		this._form = this._popup.querySelector('.popup__form_edit')
		this._profileName = document.querySelector('.profile__name')
		this._profileAboutSelf = document.querySelector('.profile__about-self')
		this._inputNewName = this._form.querySelector('.popup__input_profile-name')
		this._inputAboutSelf = this._form.querySelector('.popup__input_about-self')
	}
	openPopup = () => {
		this._inputNewName.value = this._profileName.textContent
		this._inputAboutSelf.value = this._profileAboutSelf.textContent
		super.openPopup()
	}
		_setEventListener(){
			super._setEventListener()
			this._form.addEventListener('submit', (e) => {
			  e.preventDefault()
  			this._profileName.textContent = this._inputNewName.value
 				this._profileAboutSelf.textContent = this._inputAboutSelf.value
				this.closePopup()
			})
		}
}


export default PopupProfile;