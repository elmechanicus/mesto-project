import { eraseValidation } from "./validate.js";


//Очистка форм
export function eraseForm(popup, classesValidate) {
  const form = popup.querySelector(classesValidate.formSelector);
  eraseValidation(popup, classesValidate);
  form.reset(); // очищаем форму
}

export function setButtonState(button, isSending) {//функция вывода статуса кнопки при отправке данных на сервер
  button.textContent = isSending ? "Сохранение..." : "Сохранить";
}
