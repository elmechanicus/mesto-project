import { openWindow, closeWindow } from "./modal.js";
import {
  popupEditProfile,
  objectsValidate,
  inputNameEdit,
  inputOccupationEdit,
  nameProfile,
  occupationProfile,
  elements,
  inputNameCard,
  inputUrlCard,
  popupAddCard,
} from "./constants.js";
import { createCard } from "./card.js";
import { eraseValidation } from "./validate.js";

//функция добавления новой карточки
export function handleCardFormSubmit() {
  const addCard = {
    nameCard: "",
    urlCard: "",
  };
  addCard.nameCard = inputNameCard.value; //запишем в класс объекта значение строки ввода
  addCard.urlCard = inputUrlCard.value; //запишем в класс объекта строку с адресом картинки
  elements.prepend(createCard(addCard)); // запихиваем новую карточку на страницу
  closeWindow(popupAddCard); //закрываем окошко
}

//обработаем кнопочку Escape
export function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_open");
    closeWindow(popup);
  }
}

//Очистка форм
export function eraseForm(popup) {
  const form = popup.querySelector(objectsValidate.formSelector);
  eraseValidation(popup);
  form.reset(); // очищаем форму
}

// открываем окошечко для редактирования данных профиля
export function editWindow() {
  openWindow(popupEditProfile);
  inputNameEdit.value = nameProfile.textContent; // перенесли имя из документа в форму
  inputOccupationEdit.value = occupationProfile.textContent; // перенесли род деятельности в форму
}
