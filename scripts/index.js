

const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseEdit = document.querySelector('.popup__close_edit');
const profileName = document.querySelector('.profile__name');
const profileAboutSelf = document.querySelector('.profile__about-self');
const formEditProfile = document.querySelector('.popup__form_edit');
const inputEditProfileName = document.querySelector('.popup__input_profile-name');
const inputEditProfileAbout = document.querySelector('.popup__input_about-self');

const popupAddPlace = document.querySelector('.popup_add-place');
const buttonAddPlace = document.querySelector('.profile__button-add');
const buttonCloseAddPlace = document.querySelector('.popup__close_add-place');
const formAddPlace = document.querySelector('.popup__form_add-place');
const boxForPlaces = document.querySelector('.places');

const newNamePlace = document.querySelector('.popup__input_name-place');
const newImageUrl = document.querySelector('.popup__input_url-image');
const placeTemplate = document.querySelector('.places__template').content;
const popupLookPlace = document.querySelector('.popup_position_look-place');
const buttonCloseLookPlace = document.querySelector('.popup__close_look-place');
const imageLookPlace = document.querySelector('.popup__image');
const imageTitleLookPlace = document.querySelector('.popup__image-description');






//---------------------------------------------------------------------
//общий функционал для попапов

//открытие попапа
function openPopup(el){
	el.classList.add('popup_open');
}
//закрытие попапа
function closePopup(el){
		el.classList.remove('popup_open');
		if(el !== popupLookPlace){
			clearError(el);
		}
}

//закрытие попапов на нажатие Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
		const popupCloseEscape = document.querySelector('.popup_open');
		if(popupCloseEscape.classList.contains('popup_add-place')){
			closePopup(popupAddPlace);
		}
		else if(popupCloseEscape.classList.contains('popup_edit')){
			closePopup(popupEdit);
		}
		else {
			closePopup(popupLookPlace);
		}
	}
});

// очистка error в попапах
const clearError = (el) => {
	//убирает error у span закрываемого попапа
	const elementsSpanError = el.querySelectorAll('span');
	elementsSpanError.forEach(err => err.classList.remove('popup__input-error_active'));

	//убирает error у input закрываемого попапа
	const elementsInputError = el.querySelectorAll('input');
	elementsInputError.forEach(err => err.classList.remove('popup__input_type_error')) 
	
	// ставит дефолтную кнопку submit у закрываемого попапа
	const elementButtonError = el.querySelector('.popup__save');
	if (el === popupAddPlace){	//если попап Добавления места
		elementButtonError.classList.add('popup__save_disabled');
		elementButtonError.setAttribute('disabled', 'true');
	}
	else {						//если оставшийся попап Редактирования профиля
		elementButtonError.classList.remove('popup__save_disabled');
		elementButtonError.removeAttribute('disabled', 'true');
 }
}

//---------------------------------------------------------------------
//функционал редактирования профиля

//открытие по клику
buttonEdit.addEventListener('click', () => {
	inputEditProfileName.value = profileName.textContent;
	inputEditProfileAbout.value = profileAboutSelf.textContent;
	openPopup(popupEdit);
});

//закрыть редактирование профиля по нажатию на крестик или на оверлей
	popupEdit.addEventListener('click', (e) => {
		if ( !e.target.closest('.popup__container') || e.target === buttonCloseEdit) {
			closePopup(popupEdit);
		}
});

//сохранить профиль и закрыть попап редактирования
formEditProfile.addEventListener('submit', (e) => {
	e.preventDefault();
	profileName.textContent = inputEditProfileName.value;
	profileAboutSelf.textContent = inputEditProfileAbout.value;
	closePopup(popupEdit);
});

//-----------------------------------------------------------------------
//открыть попап addPlace по кнопке
buttonAddPlace.addEventListener('click', () => {
	newNamePlace.value = '';
	newImageUrl.value = '';
	openPopup(popupAddPlace);
});

//закрыть попап addPlace при клике на кнопку закрыть или на оверлей
popupAddPlace.addEventListener('click', (e) => {
		if ( !e.target.closest('.popup__container') || e.target === buttonCloseAddPlace) {
			closePopup(popupAddPlace);
		}
});



class Card{
	constructor(element, cardSelector){
		this._name = element.name;
		this._link = element.link;
		this._cardSelector = cardSelector;
	}

	_getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__item').cloneNode(true);
    return cardElement;
  }

	_handleOpenPopup() {
		imageLookPlace.setAttribute('src', `${this._link}`);
		imageLookPlace.setAttribute('alt', this._name);
		imageTitleLookPlace.textContent = this._name;
		openPopup(popupLookPlace);

  }
  _handleClosePopup() {
		closePopup(popupLookPlace);
		imageLookPlace.removeAttribute('src');
		imageLookPlace.removeAttribute('alt');
		imageTitleLookPlace.textContent = '';
  }
	_handleDeleteCard() {
		this._element.remove();
	}
	_handleToggleLike() {
		this._element.querySelector('.places__like').classList.toggle('places__like_active');
	}

	_setEventListeners() {
    this._element.querySelector('.places__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
		this._element.querySelector('.places__delete').addEventListener('click', () => {
			this._handleDeleteCard()
		});
		this._element.querySelector('.places__like').addEventListener('click', () => {
			this._handleToggleLike();
		});
		popupLookPlace.addEventListener('click', (e) => {
			if ( !e.target.closest('.popup__container') || e.target === buttonCloseLookPlace) {
				this._handleClosePopup()
			}
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



arrayPlaces.forEach((item) => {
	const card = new Card(item, '.places__template')
	const cardElement = card.generateCard();
  boxForPlaces.append(cardElement);
})

//кнопка сохранить новое место в попапе addPlace
formAddPlace.addEventListener('submit', (e) => {
	e.preventDefault();
	const item = {
		name: newNamePlace.value,
		link: newImageUrl.value
	}
	const card = new Card(item, '.places__template');
	const cardElement = card.generateCard();
  boxForPlaces.prepend(cardElement);
	closePopup(popupAddPlace);
});



