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
	}
	else {						//если оставшийся попап Редактирования профиля
		elementButtonError.classList.remove('popup__save_disabled');
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
//добавление новых карточек, попап addPlace,  попап lookPlace

//создание новой карточки
function createNewPlace(item) {
	const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
	const placeImage = placeElement.querySelector('.places__image');
	placeImage.setAttribute('src', item.link);
	placeImage.setAttribute('alt', item.name);
	placeElement.querySelector('.places__title').textContent = item.name;
	return placeElement;
}

//добавление новой карточки в начало
function appendPlace(item){
	boxForPlaces.prepend(createNewPlace(item));
}

//перебор массива мест из ./scripts/arrayPlaces.js и их добавление
arrayPlaces.reverse().forEach(appendPlace);

//слушаем в карточках лайки, удаление и открытие попапа lookPlace
boxForPlaces.addEventListener('click', (e) => {
	//изменение лайков
	if (e.target.classList.contains('places__like')){
		e.target.classList.toggle('places__like_active');
	};
	//удаление карточки
	if (e.target.classList.contains('places__delete')){
		e.target.closest('.places__item').remove();
	};
	//открытие попапа lookPlace
	if (e.target.classList.contains('places__image')){
		imageLookPlace.setAttribute('src', e.target.getAttribute('src'));
		imageLookPlace.setAttribute('alt', e.target.alt);
		imageTitleLookPlace.textContent = e.target.alt;
		openPopup(popupLookPlace);
	};
});

//закрыть попап lookPlace при клике на кнопку закрыть или на оверлей
popupLookPlace.addEventListener('click', (e) => {
	if ( !e.target.closest('.popup__container') || e.target === buttonCloseLookPlace) {
		closePopup(popupLookPlace);
	}
});

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

//кнопка сохранить новое место в попапе addPlace
formAddPlace.addEventListener('submit', (e) => {
	e.preventDefault();
	const item = {
		name: newNamePlace.value,
		link: newImageUrl.value
	}
	appendPlace(item);
	closePopup(popupAddPlace);
	clearFormPlace();
});

