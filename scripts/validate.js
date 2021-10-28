//--------------------------------------------------------------------------
// инпуты

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}; 
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__save');
  inputList.forEach((inputElement) => {
		//состояние кнопки сохранить/добавить для выбранной формы
		toggleButtonState(inputList, buttonElement);
		//убираем надпись error
    hideInputError(formElement, inputElement);
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
			toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement);
  });
};


// меняем кнопку submit у форм
function toggleButtonState (inputList, buttonElement){
 if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('popup__save_disabled');
} else {
  buttonElement.classList.remove('popup__save_disabled');
} 
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  	return !inputElement.validity.valid;
	}); 
};