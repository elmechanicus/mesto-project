import { objectsValidate } from "./constants.js";

//Просигнализируем пользователю о некорректности введённых данных
function showError(formElement, inputElement, errorMessage, classesValidate) {
  const errorUnit = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(classesValidate.inputErrorClass);
  errorUnit.textContent = errorMessage;
  errorUnit.classList.add(classesValidate.errorClass);
}

//Уберём все сигнализаторы ошибки
function hideError(formElement, inputElement, classesValidate) {
  const errorUnit = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(classesValidate.inputErrorClass);
  errorUnit.textContent = "";
  errorUnit.classList.remove(classesValidate.errorClass);
}

// Проконтролируем валидность данных
function controlInputsValidity(formElement, inputElement, classesValidate) {
  //Проверяем поле ввода на валидность
  if (!inputElement.validity.valid) {
    //Если поле с ошибкой
    showError(formElement, inputElement, inputElement.validationMessage, classesValidate); //то покажем, что юзер ошибся при вводе
  } else {
    hideError(formElement, inputElement, classesValidate); // иначе спрячем сообщение об ошибке
  }
}

// Проверяем корректны ли данные во всех полях формы
function hasInvalidInput(inputsCatlogue) {
  //вернём истину, если
  return inputsCatlogue.some((input) => !input.validity.valid); //в любом поле из массива полей будут некорректные данные, иначе выдадим ложь.
}

// Активация/дезактивация кнопки отправки формы
function switchButtonStatus(inputsCatlogue, buttonElement, classesValidate) {
  if (hasInvalidInput(inputsCatlogue)) {
    //если в полях ввода некорректная инфа
    buttonElement.classList.add(classesValidate.inactiveButtonClass); //то делаем кнопку неактивной
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(classesValidate.inactiveButtonClass); //иначе активируем кнопку
    buttonElement.removeAttribute("disabled");
  }
}

//Установка слуховых аппаратов на каждую строку ввода :))
function setEventListeners(formElement, classesValidate) {
  //Соберём в массив все поля ввода в данной форме
  const inputsCatlogue = Array.from(
    formElement.querySelectorAll(classesValidate.inputSelector)
  );
  //И кнопочку тоже найдём
  const buttonElement = formElement.querySelector(
    classesValidate.submitButtonSelector
  );
  //Вызываем функцию переключения состояния кнопки

  switchButtonStatus(inputsCatlogue, buttonElement, classesValidate);

  //Пробежимся по массиву полей ввода, и навесим на каждое поле ввода слушателя
  inputsCatlogue.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      controlInputsValidity(formElement, inputElement, classesValidate); //проконтролируем поле на котором произошло событие
      switchButtonStatus(inputsCatlogue, buttonElement, classesValidate); //включим или выключим кнопочку
    });
  });
}

//Очистка формы от данных валидации
export function eraseValidation(popup, classesValidate) {
  const buttonElement = popup.querySelector(classesValidate.submitButtonSelector);

  const inputList = Array.from(
    popup.querySelectorAll(classesValidate.inputSelector)
  );
  inputList.forEach((input) => hideError(popup, input, classesValidate));


  // const inputStrings = Array.from(//массив полей для ввода
  //   popup.querySelectorAll(classesValidate.inputSelector)
  // );
  // inputStrings.forEach((input) => {//убираем красную подсветку строки ввода
  //   input.classList.remove(classesValidate.inputErrorClass); 
  // });

  // const errorReset = Array.from(//массив полей с ошибками
  //   popup.querySelectorAll(classesValidate.errorField)
  // );
  // errorReset.forEach((errorElement) => {
  //   errorElement.textContent = ""; //очищаем поля с ошибкой
  //   errorElement.classList.remove(classesValidate.errorClass); //скрываем сообщения об ошибке
  // });

  buttonElement.classList.add(classesValidate.inactiveButtonClass); //делаем кнопку неактивной
  buttonElement.setAttribute("disabled", true);
}

//Функция активации валидации форм
function enableValidation(classesValidate) {
  //Запихиваем в массив все формы, которые найдём в документе
  const formsCatalogue = Array.from(
    document.querySelectorAll(classesValidate.formSelector)
  );
  //Пройдёмся по массиву,
  formsCatalogue.forEach((formElement) => {
    //подключим к каждой форме слушателя и предовратим отправку формы на сервак
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, classesValidate);
  });
}

enableValidation(objectsValidate);
