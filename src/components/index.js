import "../../src/pages/index.css";

import {
  objectsValidate,
  elements,
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
  inputNameCard,
  inputUrlCard,
  inputOccupationEdit,
  popupNewAvatar,
  avatarProfile,
  inputNewAvatar,
} from "./constants.js";

import { createCard } from "./card.js";
import { openWindow, closeWindow } from "./modal.js";
import { eraseForm, setButtonState } from "./utils.js";
import { getInitialServerCards, getUserProfile, patchUser, patchNewAvatar, addCardToServer } from "./api.js";

const classesValidate = objectsValidate;
let userId;

Promise.all([getUserProfile(), getInitialServerCards()])//получим от сервера информацию о пользователе и карточках
  .then(([userInfo, serverCards]) => {
    nameProfile.textContent = userInfo.name;
    occupationProfile.textContent = userInfo.about;
    avatarProfile.src = userInfo.avatar;
    userId = userInfo._id;
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

// открываем окошечко для редактирования данных профиля
function openProfileWindow() {
  openWindow(popupEditProfile);
  inputNameEdit.value = nameProfile.textContent; // перенесли имя из документа в форму
  inputOccupationEdit.value = occupationProfile.textContent; // перенесли род деятельности в форму
}

//заполняем карточки из массива, полученного с сервера
function fillCards(serverCards) {
  serverCards.forEach((newcard) => {
    elements.append(createCard(newcard, userId));
  });
}

//функция добавления новой карточки
function handleCardFormSubmit() {
  addCardToServer(inputNameCard.value, inputUrlCard.value) //создаём новую карточку на сервере
    .then(result => {
      elements.prepend(createCard(result, userId));//вставляем карточку
      closeWindow(popupAddCard); //закрываем окошко
    })
    .catch((err) => { console.log(err) });
  
}

// функция изменения информации в профиле
function handleProfileFormSubmit() {
  const formButton = formPopupEdit.querySelector(".popup__save");//найдём кнопочку в этой форме
  formButton.setAttribute("disabled", true);//глушим её на время передачи данных на сервер
  setButtonState(formButton, true);
  patchUser(inputNameEdit.value, inputOccupationEdit.value)//и отправляем ваши данные на сервер
    .then(() => {
      nameProfile.textContent = inputNameEdit.value;// Запишем ваше имя в профиле
      occupationProfile.textContent = inputOccupationEdit.value;// а так же запишем чем вы заниметесь
      closeWindow(popupEditProfile);
    })
    .catch(err => { console.log(err); })
    .finally(() => {
      formButton.removeAttribute("disabled");
      setButtonState(formButton, false);
    });
  
};

//функция изменения аватара пользователя
function handleAvatarFormSubmit() {
  const formButton = formNewAvatar.querySelector(".popup__save");
  formButton.setAttribute("disabled", true);//глушим кнопку на время передачи данных
  setButtonState(formButton, true);
  patchNewAvatar(inputNewAvatar.value)//обновим ссылку на аватар на сервере
    .then(() => {
      avatarProfile.src = inputNewAvatar.value;//выведем на страницу
      closeWindow(popupNewAvatar);
    })
    .catch((err) => { console.log(err); })
    .finally(() => {
      formButton.removeAttribute("disabled");
      setButtonState(formButton, false);
    });
  
};

// послушаем кнопочку редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  eraseForm(popupEditProfile, classesValidate);
  openProfileWindow();
});

// послушаем кнопочку добавления карточки
buttonAddCard.addEventListener("click", () => {
  eraseForm(popupAddCard, classesValidate);
  openWindow(popupAddCard);
});

//послушаем кнопку обновления аватарки
buttonNewAvatar.addEventListener("click", () => {
  eraseForm(popupNewAvatar, classesValidate);
  openWindow(popupNewAvatar);
});

formPopupEdit.addEventListener("submit", handleProfileFormSubmit); // послушаем форму редактирования профиля
formPopupCard.addEventListener("submit", handleCardFormSubmit); // послушаем форму добавления карточки
formNewAvatar.addEventListener("submit", handleAvatarFormSubmit); //послушаем форму изменения аватара

