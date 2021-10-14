const popup = document.querySelector('.pop-up');
const popupEdit = document.querySelector('#popupEdit');
const popupAddPlace = document.querySelector('#popupAddPlace');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseEdit = document.querySelector('#closeEdit');
const buttonCloseAddPlace = document.querySelector('#closeAddPlace');
const buttonAddPlace = document.querySelector('.profile__button-add');
const Name = document.querySelector('.profile__name');
const AboutSelf = document.querySelector('.profile__about-self');
const newName = document.querySelector('.pop-up__input-text_content_name');
const newAboutSelf = document.querySelector('.pop-up__input-text_content_about-self');
const form = document.querySelector('.pop-up__form');


function openPopup(el){
  if (el.target === buttonEdit){
  newName.value = Name.textContent;
  newAboutSelf.value = AboutSelf.textContent;
  popupEdit.classList.add('pop-up_open');
  }
  if (el.target === buttonAddPlace) {
    popupAddPlace.classList.add('pop-up_open');

  }
};

function closePopup(el){
  if (el.target === buttonCloseEdit || el.target === form){
    popupEdit.classList.remove('pop-up_open');
    }
  if (el.target === buttonCloseAddPlace) {
    popupAddPlace.classList.remove('pop-up_open');
  }
};
function closePopupAndSave() {
  Name.textContent = newName.value;
  AboutSelf.textContent = newAboutSelf.value;
  closePopup();
}
function submitForm(event) {
  event.preventDefault();
  closePopupAndSave();
}
buttonEdit.addEventListener('click', openPopup);
buttonCloseEdit.addEventListener('click', closePopup);
form.addEventListener('submit', submitForm);



//add places
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
const placesBox = document.querySelector('.places');
function loadPlaces() {
  const placeTemplate = document.querySelector('#places__template').content;
  for (let i = 0; i < initialCards.length; i++){
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


//popup add place
buttonAddPlace.addEventListener('click', openPopup);
buttonCloseAddPlace.addEventListener('click', closePopup);