const popup = document.querySelector('.pop-up');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseEdit = document.querySelector('.pop-up__close');
const Name = document.querySelector('.profile__name');
const AboutSelf = document.querySelector('.profile__about-self');
const newName = document.querySelector('.pop-up__name');
const newAboutSelf = document.querySelector('.pop-up__about-self');
const form = document.querySelector('.pop-up__form');

function openPopup(){
  popup.classList.add('pop-up_open');
};

function closePopup(){
  popup.classList.remove('pop-up_open');
};

function closePopupWithoutSave() {
  newName.value = Name.textContent;
  newAboutSelf.value = AboutSelf.textContent;
  closePopup();
}

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
buttonCloseEdit.addEventListener('click', closePopupWithoutSave);
form.addEventListener('submit', submitForm);
