import "../../src/pages/index.css";

import {
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

//import { createCard } from "./card.js";
import { openWindow, closeWindow } from "./modal.js";
import { editWindow, eraseForm, handleCardFormSubmit, fillCards } from "./utils.js";
import { initialServerCards, getUser, patchUser } from "./api.js";

initialServerCards() //получим карточки с сервера
  .then(serverCards => {
    fillCards(serverCards);
  })
  .catch((err) => { console.log(err) });

getUser() //получим от сервера информацию о пользователе
.then(userInfo => {
  nameProfile.textContent = userInfo.name;
  occupationProfile.textContent = userInfo.about;
  })
  .catch((err) => { console.log(err) });

const popups = document.querySelectorAll(".popup"); //найдём все модальные окна

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
  patchUser(inputNameEdit.value, inputOccupationEdit.value);//и отправим ваши данные на сервер
  closeWindow(popupEditProfile);
}

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

