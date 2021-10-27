const popupEdit = document.querySelector('.pop-up_edit');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseEdit = document.querySelector('.pop-up__close_edit');
const profileName = document.querySelector('.profile__name');
const profileAboutSelf = document.querySelector('.profile__about-self');
const formEditProfile = document.querySelector('.pop-up__form_edit');
const inputEditProfileName = document.querySelector('.pop-up__input-text_profile-name');
const inputEditProfileAbout = document.querySelector('.pop-up__input-text_about-self');

const popupAddPlace = document.querySelector('.pop-up_add-place');
const buttonAddPlace = document.querySelector('.profile__button-add');
const buttonCloseAddPlace = document.querySelector('.pop-up__close_add-place');
const formAddPlace = document.querySelector('.pop-up__form_add-place');
const boxForPlaces = document.querySelector('.places');

const newNamePlace = document.querySelector('.pop-up__input-text_name-place');
const mainNamePlacePlaceholder = newNamePlace.placeholder;
const newImageUrl = document.querySelector('.pop-up__input-text_url-image');
const mainImageUrlPlaceholder = newImageUrl.placeholder;
const placeTemplate = document.querySelector('.places__template').content;

const popupLookPlace = document.querySelector('.pop-up_position_look-place');
const buttonCloseLookPlace = document.querySelector('.pop-up__close_look-place');
const imageLookPlace = document.querySelector('.pop-up__image');
const imageTitleLookPlace = document.querySelector('.pop-up__image-description');

//--------------------------------------------------------------------


//---------------------------------------------------------------------
//общий функционал для попапов

//открытие попапа
function openPopup(el){
	el.classList.add('pop-up_open');
}
//закрытие попапа
function closePopup(el){
		el.classList.remove('pop-up_open');
}
//закрытие по escape
const keyHandler = (el) => {
	document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
		if(el === popupAddPlace){
			closePopup(el);
			clearFormPlace();
		}
		else closePopup(el);
	}
});
}
//---------------------------------------------------------------------
//функционал редактирования профиля
//открытие по клику
buttonEdit.addEventListener('click', () => {
	inputEditProfileName.value = profileName.textContent;
	inputEditProfileAbout.value = profileAboutSelf.textContent;
	openPopup(popupEdit);
	//закрытие по escape
	keyHandler(popupEdit);
});
//закрыть редактирование профиля по нажатию на крестик или на оверлей
	popupEdit.addEventListener('click', (e) => {
		if ( !e.target.closest('.pop-up__container') || e.target === buttonCloseEdit) {
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

//очистка формы попапа addPlace
function clearFormPlace(){
	newNamePlace.value = '';
	newImageUrl.value = '';
}

//слушаем в карточках лайки, удаление и открытие попапа lookPlace
boxForPlaces.addEventListener('click', (e) => {
	//лайки
	if (e.target.classList.contains('places__like')){
		e.target.classList.toggle('places__like_active');
	};
	//удаление
	if (e.target.classList.contains('places__delete')){
		e.target.closest('.places__item').remove();
	};
	//открытие попапа lookPlace
	if (e.target.classList.contains('places__image')){
		imageLookPlace.setAttribute('src', e.target.attributes[1].nodeValue);
		imageLookPlace.setAttribute('alt', e.target.alt);
		imageTitleLookPlace.textContent = e.target.alt;
		openPopup(popupLookPlace);
		//слушаем его закрытие по Escape
		keyHandler(popupLookPlace);
	};
});

//закрыть попап lookPlace при клике на кнопку закрыть или на оверлей
popupLookPlace.addEventListener('click', (e) => {
	if ( !e.target.closest('.pop-up__container') || e.target === buttonCloseLookPlace) {
		closePopup(popupLookPlace);
	}
});

//открыть попап addPlace по кнопке
buttonAddPlace.addEventListener('click', () => {
	openPopup(popupAddPlace);
	//слушаем закрытие по Escape
	keyHandler(popupAddPlace);
});

//placeholder у инпутов addPlace при фокусе
//инпут с именем для нового места
newNamePlace.addEventListener('focus', () => {
	newNamePlace.placeholder = '';
});
newNamePlace.addEventListener('blur', () => {
	newNamePlace.placeholder = mainNamePlacePlaceholder;
});
//инпут с адресом картинки для нового места
newImageUrl.addEventListener('focus', () => {
	newImageUrl.placeholder = '';
});
newImageUrl.addEventListener('blur', () => {
	newImageUrl.placeholder = mainImageUrlPlaceholder;
});

//закрыть попап addPlace при клике на кнопку закрыть или на оверлей
popupAddPlace.addEventListener('click', (e) => {
		if ( !e.target.closest('.pop-up__container') || e.target === buttonCloseAddPlace) {
			closePopup(popupAddPlace);
			 	clearFormPlace();
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






formEditProfile.addEventListener('submit', function (e) {
  // Отменим стандартное поведение
  e.preventDefault();
});

// Слушатель события input
inputEditProfileName.addEventListener('input', function (evt) {
  // Выведем в консоль значение свойства validity.valid поля ввода, 
  // на котором слушаем событие input
  console.log(evt.target.validity.valid);
}); 