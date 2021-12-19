import {
  eraseForm,
  closePopupEscape,
  closePopupOverlayClick,
} from "./utils.js";
import { objectsValidate } from "./constants.js";

//Открываем модальное окошко
export function openWindow(popup) {
  const form = popup.querySelector(objectsValidate.formSelector);
  if (form != null) {
    //проверим есть ли в модальном окошке формы
    eraseForm(popup); //если есть, то почистим форму
  }
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closePopupEscape); //Послушаем кнопочку Escape во всём документе
  popup.addEventListener("click", closePopupOverlayClick); //Давайте кликнем мимо модального окошка
}

//Закрываем модальное окошко
export function closeWindow(popup) {
  document.removeEventListener("keydown", closePopupEscape); //удаляем прослушку на клавиши
  popup.removeEventListener("click", closePopupOverlayClick); //удаляем клик по оверлею
  popup.classList.remove("popup_open"); //закрываемся
}
