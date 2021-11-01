const mestoSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error_active'
};

//находим span к каждому input и показываем error
const showInputError = (formElement, inputElement, errorMessage, mestoSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(mestoSettings.errorClassActive);
	inputElement.classList.add(mestoSettings.inputErrorClass);
};

//находим span к каждому инпуту и прячем error
const hideInputError = (formElement, inputElement, mestoSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(mestoSettings.errorClassActive);
  errorElement.textContent = '';
	inputElement.classList.remove(mestoSettings.inputErrorClass);
}; 

// валидация input
const isValid = (formElement, inputElement, mestoSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, mestoSettings);
  } else {
    hideInputError(formElement, inputElement, mestoSettings);
  }
}; 

//валидация кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  	return !inputElement.validity.valid;
	}); 
};

//ищем инпуты выбранной формы через массив инпутов для каждой формы для дальнейшей валидации
const setEventListeners = (formElement, mestoSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(mestoSettings.inputSelector));
	const buttonElement = formElement.querySelector(mestoSettings.submitButtonSelector);
	
  inputList.forEach((inputElement) => {
		//состояние кнопки сохранить/добавить для выбранной формы при загрузке
		toggleButtonState(inputList, buttonElement, mestoSettings);
    hideInputError(formElement, inputElement, mestoSettings);
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, mestoSettings);
			toggleButtonState(inputList, buttonElement, mestoSettings);
    });
  });
};

// меняем кнопку submit у форм
function toggleButtonState (inputList, buttonElement, mestoSettings){
	if (hasInvalidInput(inputList)) {
  	buttonElement.classList.add(mestoSettings.inactiveButtonClass);
		buttonElement.setAttribute('disabled', 'true');
	} else {
  	buttonElement.classList.remove(mestoSettings.inactiveButtonClass);
		buttonElement.removeAttribute('disabled');
	} 
}

//ищем выбранную форму для валидации через массив всех форм
function enableValidation (mestoSettings) {
  const formList = Array.from(document.querySelectorAll(mestoSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, mestoSettings);
  });
};

enableValidation(mestoSettings); 


