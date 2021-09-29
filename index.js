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

//pop-up
let Name = document.querySelector('.profile__name');
let About = document.querySelector('.profile__about-self');
form.addEventListener('submit' , function(evt){
  evt.preventDefault()
  let formName = document.querySelector('.pop-up__name');
  let formAbout = document.querySelector('.pop-up__about-self');
  Name.innerText = formName.value;
  About.innerText = formAbout.value;
  form.classList.add('pop-up_disabled');
});

//
let like = document.querySelectorAll('.places__like');    //меняем лайк
Array.prototype.slice.call(like).forEach(el => {
  el.addEventListener('click', e => {
      el.classList.toggle('places__like_active');
  });
});