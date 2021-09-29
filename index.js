let disabled = document.querySelector('.pop-up_disabled');
let buttonEdit = document.querySelector('.profile__button-edit');
let form = document.querySelector('.pop-up');
let buttonClose = document.querySelector('.pop-up__close');

buttonEdit.addEventListener('click', function(evt){
  evt.preventDefault()
  form.classList.remove('pop-up_disabled');
});

buttonClose.addEventListener('click', function(evt){
  evt.preventDefault()
  form.classList.add('pop-up_disabled');
});


let formName = document.querySelector('.pop-up__name');
let formAbout = document.querySelector('.pop-up__about-self');
let buttonSave = document.querySelector('.pop-up__save');
let Name = document.querySelector('.profile__name');
let About = document.querySelector('.profile__about-self');

form.addEventListener('submit' , function(evt){
  evt.preventDefault()
  Name.innerText = formName.value;
  About.innerText = formAbout.value;
  form.classList.add('pop-up_disabled');

});