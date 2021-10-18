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
const newImageUrl = document.querySelector('.pop-up__input-text_url-image');
const placeTemplate = document.querySelector('.places__template').content;

const popupLookPlace = document.querySelector('.pop-up_position_look-place');
const buttonCloseLookPlace = document.querySelector('.pop-up__close_look-place');
const imageLookPlace = document.querySelector('.pop-up__image');
const imageTitleLookPlace = document.querySelector('.pop-up__image-description');


function openPopup(el){
	el.classList.add('pop-up_open');
};
function closePopup(el){
		el.classList.remove('pop-up_open');
};


buttonEdit.addEventListener('click', () => {
	newProfileName.value = profileName.textContent;
	newProfileAboutSelf.value = profileAboutSelf.textContent;
	openPopup(popupEdit);
});

buttonCloseEdit.addEventListener('click', () => {
	closePopup(popupEdit);
});

formEditProfile.addEventListener('submit', (event) => {
	event.preventDefault();
	profileName.textContent = newProfileName.value;
	profileAboutSelf.textContent = newProfileAboutSelf.value;
	closePopup(popupEdit);
});


function createNewPlace(item) {
	const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);
	const placeImage = placeElement.querySelector('.places__image');
	const placeLike = placeElement.querySelector('.places__like');
	placeImage.setAttribute('src', item.link);
	placeImage.setAttribute('alt', item.name);
	placeImage.addEventListener('click', () => {
		imageLookPlace.setAttribute('src', item.link);
		imageLookPlace.setAttribute('alt', item.name)
		imageTitleLookPlace.textContent = item.name;
		openPopup(popupLookPlace);
	});
	placeElement.querySelector('.places__title').textContent = item.name;
	placeLike.addEventListener('click', () => {
		placeLike.classList.toggle('places__like_active');
	}); 
	placeElement.querySelector('.places__delete').addEventListener('click', (event) => {
		event.target.closest('.places__item').remove();
	});
	return placeElement; 
}

function clearFormPlace(){
	newNamePlace.value = '';
	newImageUrl.value = '';
};

function appendPlace(item){
	boxForPlaces.prepend(createNewPlace(item));
}

arrayPlaces.forEach(appendPlace);

buttonAddPlace.addEventListener('click', () => {
	openPopup(popupAddPlace);
});

buttonCloseAddPlace.addEventListener('click', () => {
	closePopup(popupAddPlace);
	clearFormPlace();
});

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

buttonCloseLookPlace.addEventListener('click', () => {
	closePopup(popupLookPlace);
});
