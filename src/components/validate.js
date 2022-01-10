import { objectsValidate } from "./constants.js";

//Просигнализируем пользователю о некорректности введённых данных
function visibleError(
  formElement,
  inputElement,
  errorMessage,
  classesValidate
) {
  const errorUnit = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(classesValidate.inputErrorClass);
  errorUnit.textContent = errorMessage;
  errorUnit.classList.add(classesValidate.errorClass);
}

//Уберём все сигнализаторы ошибки
function unvisibleError(formElement, inputElement, classesValidate) {
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
    visibleError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      classesValidate
    ); //то покажем, что юзер ошибся при вводе
  } else {
    unvisibleError(formElement, inputElement, classesValidate); // иначе спрячем сообщение об ошибке
  }
}

// Проверяем корректны ли данные во всех полях формы
function hasInvalidInput(inputsCatlogue) {
  //вернём истину, если
  return inputsCatlogue.some((input) => !input.validity.valid); //в любом поле из массива полей будут некорректные данные, иначе выдадим ложь.
}

// Активация/дезактивация кнопки отправки формы
function tumblerButtonStatus(inputsCatlogue, buttonElement, classesValidate) {
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

  tumblerButtonStatus(inputsCatlogue, buttonElement, classesValidate);

  //Пробежимся по массиву полей ввода, и навесим на каждое поле ввода слушателя
  inputsCatlogue.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      controlInputsValidity(formElement, inputElement, classesValidate); //проконтролируем поле на котором произошло событие
      tumblerButtonStatus(inputsCatlogue, buttonElement, classesValidate); //включим или выключим кнопочку
    });
  });
}

//Очистка формы от данных валидации
export function eraseValidation(popup) {
  const buttonElement = popup.querySelector(
    objectsValidate.submitButtonSelector
  );
  const inputStrings = Array.from(
    popup.querySelectorAll(objectsValidate.inputSelector)
  ); //массив полей для ввода
  inputStrings.forEach((input) => {
    input.classList.remove(objectsValidate.inputErrorClass); //убираем красную подсветку строки ввода
  });
  const errorReset = Array.from(
    popup.querySelectorAll(objectsValidate.errorField)
  ); //массив полей с ошибками
  errorReset.forEach((errorElement) => {
    errorElement.textContent = ""; //очищаем поля с ошибкой
    errorElement.classList.remove(objectsValidate.errorClass); //скрываем сообщения об ошибке
  });
  buttonElement.classList.add(objectsValidate.inactiveButtonClass); //делаем кнопку неактивной
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
