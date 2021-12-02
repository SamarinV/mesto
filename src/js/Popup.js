class Popup {
	constructor(popupSelector){
		this._popup = popupSelector
		this._buttonClose = this._popup.querySelector('.popup__close')
	}
	openPopup(){
		this._popup.classList.add('popup_open')
		this._setEventListener()
	}
	closePopup(){
		this._popup.classList.remove('popup_open')
	}
	_closePopupKeyEsc = () => {
		closePopup()
  	document.removeEventListener('keydown', this._closePopupKeyEsc)
	}
	_setEventListener(){
		this._popup.addEventListener('click', (e) => {
  		if (!e.target.closest('.popup__container') || e.target === this._buttonClose) {
    	this.closePopup();
  		}
		})
		document.addEventListener('keydown', (e) => {
  		if (e.key === 'Escape') {
    		this.closePopup();
  		}
		})
	}
}

export default Popup






// открытие попапов
function openPopup(el) {
  el.classList.add('popup_open');
  document.addEventListener('keydown', keyEscape);
}
// закрытие попапов
function closePopup(el) {
  el.classList.remove('popup_open');
  document.removeEventListener('keydown', keyEscape);
}

// закрытие попапов на нажатие Escape
function keyEscape(e) {
  if (e.key === 'Escape') {
    const popupCloseEscape = document.querySelector('.popup_open');
    closePopup(popupCloseEscape);
  }
}