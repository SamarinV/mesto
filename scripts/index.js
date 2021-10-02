const popup = document.querySelector('.pop-up');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseEdit = document.querySelector('.pop-up__close');
const Name = document.querySelector('.profile__name');
const AboutSelf = document.querySelector('.profile__about-self');
const newName = document.querySelector('.pop-up__input-text_content_name');
const newAboutSelf = document.querySelector('.pop-up__input-text_content_about-self');
const form = document.querySelector('.pop-up__form');

function openPopup(){
  newName.value = Name.textContent;
  newAboutSelf.value = AboutSelf.textContent;
  popup.classList.add('pop-up_open');
};

function closePopup(){
  popup.classList.remove('pop-up_open');
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
