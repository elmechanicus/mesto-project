import "../../src/pages/index.css";

import {
  initialCards,
  addCard,
  elements,
  buttonEditProfile,
  buttonAddCard,
  buttonClosedEditPopup,
  buttonClosedAddCard,
  buttonClosedImage,
  formPopupEdit,
  formPopupCard,
  popupAddCard,
  popupViewedImage,
  popupEditProfile,
} from "./constants.js";

import { createCard } from "./card.js";
import { openWindow, closeWindow } from "./modal.js";
import {
  editWindow,
  handleCardFormSubmit,
  handleProfileFormSubmit,
} from "./utils.js";

//заполняем карточки из массива
initialCards.forEach((newcard) => {
  addCard.nameCard = newcard.name;
  addCard.urlCard = newcard.link;
  elements.append(createCard(addCard));
});

// послушаем кнопочку редактирования
buttonEditProfile.addEventListener("click", editWindow);

// послушаем кнопочку добавления карточки
buttonAddCard.addEventListener("click", () => {
  openWindow(popupAddCard);
});

buttonClosedEditPopup.addEventListener("click", () => {
  closeWindow(popupEditProfile);
}); // послушаем кнопочку закрытия окошка редактирования профиля
buttonClosedAddCard.addEventListener("click", () => {
  closeWindow(popupAddCard);
}); // послушаем кнопочку закрытия окошка добавления карточки
buttonClosedImage.addEventListener("click", () => {
  closeWindow(popupViewedImage);
}); // послушаем кнопочку закрытия просмотра фото

formPopupEdit.addEventListener("submit", handleProfileFormSubmit); // послушаем форму редактирования профиля
formPopupCard.addEventListener("submit", handleCardFormSubmit); // послушаем форму добавления карточки
