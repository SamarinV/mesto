
//ищем выбранную форму для валидации через массив всех форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement);
  });
};

//ищем инпуты выбранной формы через массив инпутов для каждой формы для дальнейшей валидации
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__save');
  inputList.forEach((inputElement) => {
		//состояние кнопки сохранить/добавить для выбранной формы
		toggleButtonState(inputList, buttonElement);
		//убираем надпись error(нужно при открытии попапа)
    hideInputError(formElement, inputElement);
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
			toggleButtonState(inputList, buttonElement);
    });
  });
};

// валидация input
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

//находим span к каждому input и показываем error
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

//находим span к каждому инпуту и прячем error
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}; 

// меняем кнопку submit у форм
function toggleButtonState (inputList, buttonElement){
 if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('popup__save_disabled');
} else {
  buttonElement.classList.remove('popup__save_disabled');
} 
}

//валидация кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  	return !inputElement.validity.valid;
	}); 
};