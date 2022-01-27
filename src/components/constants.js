export const settingsAuth = {
  apiURL: 'https://nomoreparties.co/v1/plus-cohort-5',
  headers: {
    authorization: '1a92109e-5904-468d-b1cc-bb517659891e',
    'Content-Type': 'application/json',
  }
};

export const objectsValidate = {
  formSelector: ".popup__form",
  errorField: ".popup__error",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const buttonEditProfile = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
export const buttonAddCard = document.querySelector(".profile__add-button"); // кнопочка добавления карточки

export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
); // окошко редактирования профиля

export const formPopupEdit = popupEditProfile.querySelector(".popup__form"); // форма ввода для редактирования профиля
export const inputNameEdit = popupEditProfile.querySelector(
  ".popup__input_type_name"
); //поле для ввода имени профиля
export const inputOccupationEdit = popupEditProfile.querySelector(
  ".popup__input_type_occupation"
); // поле для ввода рода деятельности

export const popupAddCard = document.querySelector(".popup_type_add-card"); // окошко добавления карточки
export const formPopupCard = popupAddCard.querySelector(".popup__form"); // форма ввода данных для добавления карточки
export const inputNameCard = popupAddCard.querySelector(
  ".popup__input_type_name"
); // поле для ввода названия карточки
export const inputUrlCard = popupAddCard.querySelector(
  ".popup__input_type_url"
); //поле для ввода ссылки на картинку

export const popupViewedImage = document.querySelector(
  ".popup_type_view-image"
); //окошко показа фото

export const popupDeleteCard = document.querySelector(".popup_type_delete-card"); //окошко запроса на удаление карточки
export const buttonConfirmDeteleCard = popupDeleteCard.querySelector(".popup__save"); //кнопка Да

export const nameProfile = document.querySelector(".profile__name"); // Изменяемое имя в профиле
export const occupationProfile = document.querySelector(
  ".profile__description"
); // изменяемый род деятельности

export const elements = document.querySelector(".elements"); // секция для карточек
