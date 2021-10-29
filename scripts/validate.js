const mestoSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  // inputErrorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error_active'
};
//находим span к каждому input и показываем error
const showInputError = (formElement, inputElement, errorMessage, errorClassActive) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClassActive);
};

//находим span к каждому инпуту и прячем error
const hideInputError = (formElement, inputElement, errorClassActive) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClassActive);
  errorElement.textContent = '';
}; 

// валидация input
const isValid = (formElement, inputElement, errorClassActive) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClassActive);
  } else {
    hideInputError(formElement, inputElement, errorClassActive);
  }
}; 

//валидация кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  	return !inputElement.validity.valid;
	}); 
};

//ищем инпуты выбранной формы через массив инпутов для каждой формы для дальнейшей валидации
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, errorClassActive}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	
  inputList.forEach((inputElement) => {
		//состояние кнопки сохранить/добавить для выбранной формы
		// toggleButtonState(inputList, buttonElement, inactiveButtonClass);
		//убираем надпись error(нужно при открытии попапа)
    hideInputError(formElement, inputElement);
    inputElement.addEventListener('input', () => {
			
      isValid(formElement, inputElement, errorClassActive)
			toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};
// меняем кнопку submit у форм
function toggleButtonState (inputList, buttonElement, inactiveButtonClass){
	
		console.log(buttonElement);
 if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(inactiveButtonClass);
} else {
  buttonElement.classList.remove(inactiveButtonClass);
} 
}

//ищем выбранную форму для валидации через массив всех форм
function enableValidation ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, errorClassActive}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, errorClassActive});
  });
};

enableValidation(mestoSettings); 



