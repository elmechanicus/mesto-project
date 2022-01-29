import "../../src/pages/index.css";

import {
  buttonEditProfile,
  buttonAddCard,
  buttonNewAvatar,
  formPopupEdit,
  formPopupCard,
  formNewAvatar,
  popupAddCard,
  popupEditProfile,
  nameProfile,
  occupationProfile,
  inputNameEdit,
  inputOccupationEdit,
  popupNewAvatar,
  avatarProfile,
  inputNewAvatar,
} from "./constants.js";

//import { createCard } from "./card.js";
import { openWindow, closeWindow } from "./modal.js";
import { editWindow, eraseForm, handleCardFormSubmit, fillCards, setButtonState } from "./utils.js";
import { initialServerCards, getUser, patchUser, patchNewAvatar } from "./api.js";


getUser() //получим от сервера информацию о пользователе
  .then(userInfo => {
    nameProfile.textContent = userInfo.name;
    occupationProfile.textContent = userInfo.about;
    avatarProfile.src = userInfo.avatar;
  })
  .catch((err) => { console.log(err); });


initialServerCards() //получим карточки с сервера
  .then(serverCards => {
    fillCards(serverCards);
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
  const formButton = formPopupEdit.querySelector(".popup__save");//найдём кнопочку в этой форме
  formButton.setAttribute("disabled", true);//глушим её на время передачи данных на сервер
  setButtonState(formButton, true);
  patchUser(inputNameEdit.value, inputOccupationEdit.value)//и отправляем ваши данные на сервер
    .catch(err => { console.log(err); })
    .finally(() => {
      formButton.removeAttribute("disabled");
      setButtonState(formButton, false);
    });
  closeWindow(popupEditProfile);
};

//функция изменения аватара пользователя
function handleAvatarFormSubmit() {
  avatarProfile.src = inputNewAvatar.value//выведем на страницу
  const formButton = formNewAvatar.querySelector(".popup__save");
  formButton.setAttribute("disabled", true);//глушим кнопку на время передачи данных
  setButtonState(formButton, true);
  patchNewAvatar(inputNewAvatar.value)//обновим ссылку на аватар на сервере
    .catch((err) => { console.log(err); })
    .finally(() => {
      formButton.removeAttribute("disabled");
      setButtonState(formButton, false);
    });
  closeWindow(popupNewAvatar);
};

// послушаем кнопочку редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  eraseForm(popupEditProfile);
  editWindow();
});

// послушаем кнопочку добавления карточки
buttonAddCard.addEventListener("click", () => {
  eraseForm(popupAddCard);
  openWindow(popupAddCard);
});

//послушаем кнопку обновления аватарки
buttonNewAvatar.addEventListener("click", () => {
  eraseForm(popupNewAvatar);
  openWindow(popupNewAvatar);
});

formPopupEdit.addEventListener("submit", handleProfileFormSubmit); // послушаем форму редактирования профиля
formPopupCard.addEventListener("submit", handleCardFormSubmit); // послушаем форму добавления карточки
formNewAvatar.addEventListener("submit", handleAvatarFormSubmit); //послушаем форму изменения аватара

