import { openWindow } from "./modal.js";
import { popupViewedImage } from "./constants.js";

const cardTemplate = document.querySelector("#card").content; //вытаскиваем контент из темплета

//создание карточки
export function createCard(addCard) {
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

//открываем окошечко просмотра фотографии
function viewImageWindow(url, title) {
  openWindow(popupViewedImage);
  popupViewedImage.querySelector(".popup__image").src = url;
  popupViewedImage.querySelector(".popup__image-title").textContent = title;
  popupViewedImage.querySelector(".popup__image").alt = title;
}
