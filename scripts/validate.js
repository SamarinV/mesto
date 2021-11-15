export const formSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error_active'
};

export class FormValidator{
	constructor(formElement, form){
		this._formSelector = formElement.formSelector;
		this._inputSelector = formElement.inputSelector;
		this._submitButtonSelector = formElement.submitButtonSelector;
		this._inactiveButtonClass = formElement.inactiveButtonClass;
		this._inputErrorClass = formElement.inputErrorClass;
		this._errorClassActive = formElement.errorClassActive;
		this._form = form;
	}
	
	_isValid = (inputElement) => {
  	if (!inputElement.validity.valid) {
    	this._showInputError(inputElement);
  	} else {
    	this._hideInputError(inputElement);
  	}
	};

	_showInputError = (inputElement) => {
  	const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		errorElement.textContent = inputElement.validationMessage;
  	errorElement.classList.add(this._errorClassActive);
		inputElement.classList.add(this._inputErrorClass);
	};

	_hideInputError = (inputElement) => {
  	const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  	errorElement.classList.remove(this._errorClassActive);
  	errorElement.textContent = '';
		inputElement.classList.remove(this._inputErrorClass);
	}; 

	_hasInvalidInput = (inputList) => {
  	return inputList.some((inputElement) => { return !inputElement.validity.valid;});
	};
	_toggleButtonState = (inputList, buttonElement) => {
		if (this._hasInvalidInput(inputList)) {
  		buttonElement.classList.add(this._inactiveButtonClass);
			buttonElement.setAttribute('disabled', 'true');
		} else {
  		buttonElement.classList.remove(this._inactiveButtonClass);
			buttonElement.removeAttribute('disabled');
		} 
	}

	//ищем инпуты выбранной формы через массив инпутов для каждой формы для дальнейшей валидации
	_setEventListeners = () => {
		const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
		const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
		this._toggleButtonState(inputList, buttonElement);
  	inputList.forEach((inputElement) => {
    	this._hideInputError(inputElement);
    	inputElement.addEventListener('input', () => {
      	this._isValid(inputElement);
				this._toggleButtonState(inputList, buttonElement);
    	});
  	});
	};

	_getForm() {
    const formElement = document.querySelector(this._form);
    return formElement;
	}

	enableValidation () {
		this._formElement = this._getForm();
		this._setEventListeners();
		return this._formElement;
	};

}



