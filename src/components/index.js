import "../../src/pages/index.css";

import {
  initialCards,
  elements,
  buttonEditProfile,
  buttonAddCard,
  formPopupEdit,
  formPopupCard,
  popupAddCard,
  popupEditProfile,
  nameProfile,
  occupationProfile,
  inputNameEdit,
  inputOccupationEdit,
} from "./constants.js";

import { createCard } from "./card.js";
import { openWindow, closeWindow } from "./modal.js";
import { editWindow, eraseForm, handleCardFormSubmit } from "./utils.js";

const popups = document.querySelectorAll(".popup"); //найдём все модальные окна
//Огромный респектище за такой способ!!!
popups.forEach((popupWindow) => {
  //пробежимся по всем модалкам
  popupWindow.addEventListener("click", (evt) => {
    //подключим к ним клики
    if (evt.target.classList.contains("popup_open")) {
      //если кликнули мимо окошка, то закроем его
      closeWindow(popupWindow);
    }
    if (evt.target.classList.contains("popup__close")) {
      //если кликнули по крестику, то закроем окошко
      closeWindow(popupWindow);
    }
  });
});

// функция изменения информации в профиле
function handleProfileFormSubmit() {
  nameProfile.textContent = inputNameEdit.value; // Запишем ваше имя в профиле
  occupationProfile.textContent = inputOccupationEdit.value; // а так же запишем чем вы заниметесь
  closeWindow(popupEditProfile);
}

//заполняем карточки из массива
initialCards.forEach((newcard) => {
  const addCard = {
    nameCard: "",
    urlCard: "",
  };
  addCard.nameCard = newcard.name;
  addCard.urlCard = newcard.link;
  elements.append(createCard(addCard));
});

// послушаем кнопочку редактирования
buttonEditProfile.addEventListener("click", () => {
  eraseForm(popupEditProfile);
  editWindow();
});

// послушаем кнопочку добавления карточки
buttonAddCard.addEventListener("click", () => {
  eraseForm(popupAddCard);
  openWindow(popupAddCard);
});

formPopupEdit.addEventListener("submit", handleProfileFormSubmit); // послушаем форму редактирования профиля
formPopupCard.addEventListener("submit", handleCardFormSubmit); // послушаем форму добавления карточки
