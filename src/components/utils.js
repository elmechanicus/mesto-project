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
import { addCardToServer } from "./api.js";

//функция добавления новой карточки
export function handleCardFormSubmit() {
  addCardToServer(inputNameCard.value, inputUrlCard.value) //создаём новую карточку на сервере
    .then(result => { elements.prepend(createCard(result)); })
    .catch((err) => { console.log(err) });
  closeWindow(popupAddCard); //закрываем окошко
}

//заполняем карточки из массива, полученного с сервера
export function fillCards(serverCards) {
  serverCards.forEach((newcard) => {
    elements.append(createCard(newcard));
  });
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

export function setButtonState(button, isSending) {//функция вывода статуса кнопки при отправке данных на сервер
  button.textContent = isSending ? "Сохранение..." : "Сохранить";
}
