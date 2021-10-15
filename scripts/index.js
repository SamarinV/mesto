const popupEdit = document.querySelector('.pop-up_edit');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseEdit = document.querySelector('.pop-up__close_edit');
const Name = document.querySelector('.profile__name');
const AboutSelf = document.querySelector('.profile__about-self');
const newName = document.querySelector('.pop-up__input-text_profile-name');
const newAboutSelf = document.querySelector('.pop-up__input-text_about-self');
const formEditProfile = document.querySelector('.pop-up__form_edit');

const initialCards = [
  { name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  { name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  { name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  { name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  { name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  { name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const popupAddPlace = document.querySelector('.pop-up_add-place');
const buttonAddPlace = document.querySelector('.profile__button-add');
const buttonCloseAddPlace = document.querySelector('.pop-up__close_add-place');
const formAddPlace = document.querySelector('.pop-up__form_add-place');
const placesBox = document.querySelector('.places');

const newNamePlace = document.querySelector('.pop-up__input-text_name-place');
const newImageUrl = document.querySelector('.pop-up__input-text_url-image');
const placeTemplate = document.querySelector('.places__template').content;


function openPopup(el){
  el.classList.add('pop-up_open');
};
function closePopup(el){
    el.classList.remove('pop-up_open');
};
function saveAndClose(el) {
  closePopup(el);
}
buttonEdit.addEventListener('click', (event) => {
  newName.value = Name.textContent;
  newAboutSelf.value = AboutSelf.textContent;
  openPopup(popupEdit);
});
buttonCloseEdit.addEventListener('click', (event) => {
  closePopup(popupEdit);
});
formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  Name.textContent = newName.value;
  AboutSelf.textContent = newAboutSelf.value;
  saveAndClose(popupEdit);
});

function loadPlaces() {
  for (let i in initialCards){
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true);

    placeElement.querySelector('.places__image').setAttribute('src', initialCards[i]['link']);
    placeElement.querySelector('.places__image').setAttribute('alt', initialCards[i]['name']);
    placeElement.querySelector('.places__title').textContent = initialCards[i]['name'];
    placeElement.querySelector('.places__like').addEventListener('click', function (evt) {
    placeElement.querySelector('.places__like').classList.toggle('places__like_active');
    }); 
    placesBox.prepend(placeElement);
  }
}
loadPlaces();
function addPlace() {

}

function addPlace() {
  placeTemplate.querySelector('.places__title').textContent = newNamePlace.value;
  placeTemplate.querySelector('.places__image').setAttribute('src', newImageUrl.value);
  initialCards.unshift(placeTemplate);
  loadPlaces();
  closePopup(popupAddPlace);
};

buttonAddPlace.addEventListener('click', (event) => {
  openPopup(popupAddPlace);
});
buttonCloseAddPlace.addEventListener('click', (event) => {
  closePopup(popupAddPlace);
});
formAddPlace.addEventListener('submit', (event) => {
  event.preventDefault();
  addPlace();
});