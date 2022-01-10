import { openWindow, closeWindow } from "./modal.js";
import {
  popupEditProfile,
  objectsValidate,
  inputNameEdit,
  inputOccupationEdit,
  nameProfile,
  occupationProfile,
  addCard,
  elements,
  inputNameCard,
  inputUrlCard,
  popupAddCard,
} from "./constants.js";
import { createCard } from "./card.js";
import { eraseValidation } from "./validate.js";

//функция добавления новой карточки
export function handleCardFormSubmit() {
  addCard.nameCard = inputNameCard.value; //запишем в класс объекта значение строки ввода
  addCard.urlCard = inputUrlCard.value; //запишем в класс объёкта строку с адресом картинки
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

//обработаем клик по оверлею
export function closePopupOverlayClick(evt) {
  //если в таргете нашлось popup_open, то закрываем окошко
  if (evt.target.className.includes("popup_open")) {
    closeWindow(evt.target);
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

// функция изменения информации в профиле
export function handleProfileFormSubmit() {
  nameProfile.textContent = inputNameEdit.value; // Запишем ваше имя в профиле
  occupationProfile.textContent = inputOccupationEdit.value; // а так же запишем чем вы заниметесь
  closeWindow(popupEditProfile);
}
