const buttonEditProfile = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const buttonAddCard = document.querySelector(".profile__add-button"); // кнопочка добавления карточки

const popupEditProfile = document.querySelector(".popup_type_edit-profile"); // окошко редактирования профиля
const buttonSaveEditPopup = popupEditProfile.querySelector(".popup__save"); //кнопочка Сохранить
const buttonClosedEditPopup = popupEditProfile.querySelector(".popup__close"); // кнопка закрытия окна редактирования профиля
const formPopupEdit = popupEditProfile.querySelector(".popup__form"); // форма ввода для редактирования профиля
const inputNameEdit = popupEditProfile.querySelector(".popup__input_type_name"); //поле для ввода имени профиля
const inputOccupationEdit = popupEditProfile.querySelector(
  ".popup__input_type_occupation"
); // поле для ввода рода деятельности

const popupAddCard = document.querySelector(".popup_type_add-card"); // окошко добавления карточки
const buttonClosedAddCard = popupAddCard.querySelector(".popup__close"); // кнопка закрытия окна добавления карточки
const formPopupCard = popupAddCard.querySelector(".popup__form"); // форма ввода данных для добавления карточки
const inputNameCard = popupAddCard.querySelector(".popup__input_type_name"); // поле для ввода названия карточки
const inputUrlCard = popupAddCard.querySelector(".popup__input_type_url"); //поле для ввода ссылки на картинку

const popupViewedImage = document.querySelector(".popup_type_view-image"); //окошко показа фото
const buttonClosedImage = popupViewedImage.querySelector(".popup__close"); //кнопка закрытия просмотра фото

const nameProfile = document.querySelector(".profile__name"); // Изменяемое имя в профиле
const occupationProfile = document.querySelector(".profile__description"); // изменяемый род деятельности

const elements = document.querySelector(".elements"); // секция для карточек

const cardTemplate = document.querySelector("#card").content; //вытаскиваем контент из темплета

//создание карточки
function createCard(addCard) {
  const card = cardTemplate.querySelector(".element").cloneNode(true); //клонируем темплейт
  const cardImage = card.querySelector(".element__photo"); //наше фото
  const cardTitle = card.querySelector(".element__text"); //наша подпись к фото
  cardTitle.textContent = addCard.nameCard; //заполняем текстом карточку
  cardImage.alt = addCard.nameCard; //подпись к картинке в карточке
  cardImage.src = addCard.urlCard; //добавляем картинку в карточку

  //навесим клик по картинке карточки
  cardImage.addEventListener("click", () =>
    viewImageWindow(cardImage.src, cardTitle.textContent)
  ); // засунем в показ фотки

  // навесим событие на значок корзины
  card
    .querySelector(".element__delete")
    .addEventListener("click", handleDeleteCard);

  //навесим событие лайкнуть карточку
  card.querySelector(".element__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like_active"); //закрасим сердечко
  });
  return card;
}

//удаление карточки
function handleDeleteCard(evt) {
  evt.target.closest(".element").remove();
}

//Открываем модальное окошко
function openWindow(popup) {
  const form = popup.querySelector(objectsValidate.formSelector);
  if (form != null) {
    //проверим есть ли в модальном окошке формы
    eraseForm(popup); //если есть, то почистим форму
  }
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closePopupEscape); //Послушаем кнопочку Escape во всём документе
  popup.addEventListener("click", closePopupOverlayClick); //Давайте кликнем мимо модального окошка
}

//обработаем кнопочку Escape
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_open");
    closeWindow(popup);
  }
}

//обработаем клик по оверлею
function closePopupOverlayClick(evt) {
  //если в таргете нашлось popup_open, то закрываем окошко
  if (evt.target.className.includes("popup_open")) {
    const popup = document.querySelector(".popup_open");
    closeWindow(popup);
  }
}

//Очистка форм
function eraseForm(popup) {
  const form = popup.querySelector(objectsValidate.formSelector);
  eraseValidation(popup);
  form.reset(); // очищаем форму
}

//Закрываем модальное окошко
function closeWindow(popup) {
  document.removeEventListener("keydown", closePopupEscape); //удаляем прослушку на клавиши
  popup.removeEventListener("click", closePopupOverlayClick); //удаляем клик по оверлею
  popup.classList.remove("popup_open"); //закрываемся
}

// открываем окошечко для редактирования данных профиля
function editWindow() {
  openWindow(popupEditProfile);
  inputNameEdit.value = nameProfile.textContent; // перенесли имя из документа в форму
  inputOccupationEdit.value = occupationProfile.textContent; // перенесли род деятельности в форму
}

//открываем окошечко просмотра фотографии
function viewImageWindow(url, title) {
  openWindow(popupViewedImage);
  popupViewedImage.querySelector(".popup__image").src = url;
  popupViewedImage.querySelector(".popup__image-title").textContent = title;
  popupViewedImage.querySelector(".popup__image").alt = title;
}

// функция изменения информации в профиле
function handleProfileFormSubmit() {
  // evt.preventDefault(); // запретим отправку формы на сервак (сделано в validate.js)
  nameProfile.textContent = inputNameEdit.value; // Запишем ваше имя в профиле
  occupationProfile.textContent = inputOccupationEdit.value; // а так же запишем чем вы заниметесь
  closeWindow(popupEditProfile);
}

//функция добавления новой карточки
function handleCardFormSubmit() {
  //evt.preventDefault(); // запретим отправку формы на сервак (сделано в validate.js)
  addCard.nameCard = inputNameCard.value; //запишем в класс объекта значение строки ввода
  addCard.urlCard = inputUrlCard.value; //запишем в класс объёкта строку с адресом картинки
  elements.prepend(createCard(addCard)); // запихиваем новую карточку на страницу
  closeWindow(popupAddCard); //закрываем окошко
}

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
