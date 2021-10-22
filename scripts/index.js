const popupEdit = document.querySelector('.pop-up_edit');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseEdit = document.querySelector('.pop-up__close_edit');
const profileName = document.querySelector('.profile__name');
const profileAboutSelf = document.querySelector('.profile__about-self');
const newProfileName = document.querySelector('.pop-up__input-text_profile-name');
const newProfileAboutSelf = document.querySelector('.pop-up__input-text_about-self');
const formEditProfile = document.querySelector('.pop-up__form_edit');

const popupAddPlace = document.querySelector('.pop-up_add-place');
const buttonAddPlace = document.querySelector('.profile__button-add');
const buttonCloseAddPlace = document.querySelector('.pop-up__close_add-place');
const formAddPlace = document.querySelector('.pop-up__form_add-place');
const boxForPlaces = document.querySelector('.places');

const newNamePlace = document.querySelector('.pop-up__input-text_name-place');
const mainNamePlacePlaceholder = newNamePlace.placeholder; //placeholder имени нового места
const newImageUrl = document.querySelector('.pop-up__input-text_url-image');
const mainImageUrlPlaceholder = newImageUrl.placeholder; //placeholder адреса картинки нового места
const placeTemplate = document.querySelector('.places__template').content;

const popupLookPlace = document.querySelector('.pop-up_position_look-place');
const buttonCloseLookPlace = document.querySelector('.pop-up__close_look-place');
const imageLookPlace = document.querySelector('.pop-up__image');
const imageTitleLookPlace = document.querySelector('.pop-up__image-description');

//--------------------------------------------------------------------
//функционал placeholder у инпутов попап при фокусе

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

//---------------------------------------------------------------------
//функционал редактирования профиля

buttonEdit.addEventListener('click', () => {
	newProfileName.value = profileName.textContent;
	newProfileAboutSelf.value = profileAboutSelf.textContent;
	openPopup(popupEdit);
});
//закрыть редактирование профиля по нажатию на крестик или вне блока с формой
	popupEdit.addEventListener('click', (event) => {
    if ( !event.target.closest('.pop-up__container') || event.target === buttonCloseEdit) {
        closePopup(popupEdit);
    }
});
//сохранить профиль и закрыть попап редактирования
formEditProfile.addEventListener('submit', (event) => {
	event.preventDefault();
	profileName.textContent = newProfileName.value;
	profileAboutSelf.textContent = newProfileAboutSelf.value;
	closePopup(popupEdit);
});

//-----------------------------------------------------------------------
//функционал добавления новых мест

//создание нового места
function createNewPlace(item) {
	const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
	const placeImage = placeElement.querySelector('.places__image');
	const placeLike = placeElement.querySelector('.places__like');
	placeImage.setAttribute('src', item.link);
	placeImage.setAttribute('alt', item.name);
	//функционал открытия попапа просмотра места по событию клика на картинку
	placeImage.addEventListener('click', () => {
		imageLookPlace.setAttribute('src', item.link);
		imageLookPlace.setAttribute('alt', item.name)
		imageTitleLookPlace.textContent = item.name;
		openPopup(popupLookPlace);
	});
	placeElement.querySelector('.places__title').textContent = item.name;
	//функционал для лайков
	placeLike.addEventListener('click', () => {
		placeLike.classList.toggle('places__like_active');
	});
	//функционал для удаления места
	placeElement.querySelector('.places__delete').addEventListener('click', (event) => {
		event.target.closest('.places__item').remove();
	});
	return placeElement;
}
//очистка формы добавленя нового места
function clearFormPlace(){
	newNamePlace.value = '';
	newImageUrl.value = '';
}
//добавление новой карточки мест в начало
function appendPlace(item){
	boxForPlaces.prepend(createNewPlace(item));
}
//перебор массива мест из ./scripts/arrayPlaces.js и их добавление
arrayPlaces.forEach(appendPlace);

//кнопка открыть попап нового места
buttonAddPlace.addEventListener('click', () => {
	openPopup(popupAddPlace);
});

//закрыть попап нового места при клике на крестик или вне области формы
popupAddPlace.addEventListener('click', (event) => {
    if ( !event.target.closest('.pop-up__container') || event.target === buttonCloseAddPlace) {
        closePopup(popupAddPlace);
			 	clearFormPlace();
    }
});

//кнопка сохранить новое место
formAddPlace.addEventListener('submit', (event) => {
	event.preventDefault();
	const item = {
		name: newNamePlace.value,
		link: newImageUrl.value
	}
	appendPlace(item);
	closePopup(popupAddPlace);
	clearFormPlace();
});

//-----------------------------------------------------------
//функционал просмотра мест
//(открытие реализовано в createNewPlace)
//закрыть попап при клике на крестик или вне области формы
popupLookPlace.addEventListener('click', (event) => {
    if ( !event.target.closest('.pop-up__container') || event.target === buttonCloseLookPlace) {
        closePopup(popupLookPlace);
    }
});
