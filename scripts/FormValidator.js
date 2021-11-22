// ----- ------ ------ ------ ----- ----
// ------------------------------------

class FormValidator{
	constructor(formElement, form){
		this._formSelector = formElement.formSelector;
		this._inputSelector = formElement.inputSelector;
		this._submitButtonSelector = formElement.submitButtonSelector;
		this._inactiveButtonClass = formElement.inactiveButtonClass;
		this._inputErrorClass = formElement.inputErrorClass;
		this._errorClassActive = formElement.errorClassActive;
		this._form = form;
		this._inputList = formElement.inputList;
		this._submitButton = formElement.submitButton;
	}
	
	_isValid(inputElement) {
  	if (!inputElement.validity.valid) {
    	this._showInputError(inputElement);
  	} else {
    	this._hideInputError(inputElement);
  	}
	}

	_showInputError(inputElement) {
  	const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		errorElement.textContent = inputElement.validationMessage;
  	errorElement.classList.add(this._errorClassActive);
		inputElement.classList.add(this._inputErrorClass);
	}

	_hideInputError(inputElement) {
  	const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  	errorElement.classList.remove(this._errorClassActive);
  	errorElement.textContent = '';
		inputElement.classList.remove(this._inputErrorClass);
	}

	_hasInvalidInput() {
  	return this._inputList.some((inputElement) => { return !inputElement.validity.valid;});
	}
	_toggleButtonState() {
		if (this._hasInvalidInput(this._inputList)) {
  		this._submitButton.classList.add(this._inactiveButtonClass);
			this._submitButton.setAttribute('disabled', 'true');
		} else {
  		this._submitButton.classList.remove(this._inactiveButtonClass);
			this._submitButton.removeAttribute('disabled');
		} 
	}

	//ищем инпуты выбранной формы через массив инпутов для каждой формы для дальнейшей валидации
	_setEventListeners() {
		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
		this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
		this._toggleButtonState();
  	this._inputList.forEach((inputElement) => {
    	this._hideInputError(inputElement);
    	inputElement.addEventListener('input', () => {
      	this._isValid(inputElement);
				this._toggleButtonState();
    	});
  	});
	}

	_getForm() {
    const formElement = document.querySelector(this._form);
    return formElement;
	}

	enableValidation () {
		this._formElement = this._getForm();
		this._setEventListeners();
		return this._formElement;
	}
	clearError() {
		this._toggleButtonState();
		this._inputList.forEach((inputElement) => {
  		this._hideInputError(inputElement);
		});
	}
}

export default FormValidator;


