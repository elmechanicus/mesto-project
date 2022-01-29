import { closeWindow, openWindow } from "./modal.js";
import { popupViewedImage, nameProfile, popupDeleteCard, buttonConfirmDeteleCard } from "./constants.js";
import { deleteCardFromServer, setLikeInCard, resetLikeInCard } from "./api.js";

const cardTemplate = document.querySelector("#card").content; //вытаскиваем контент из темплета
const popupImageAttribute = popupViewedImage.querySelector(".popup__image"); //аттрибуты картинки
const popupImageTitle = popupViewedImage.querySelector(".popup__image-title");

//создание карточки
export function createCard(addCard) {
  const card = cardTemplate.querySelector(".element").cloneNode(true); //клонируем темплейт
  const cardImage = card.querySelector(".element__photo"); //наше фото
  const cardTitle = card.querySelector(".element__text"); //наша подпись к фото
  const cardLikeCounter = card.querySelector(".element__like-counter"); //количество лайков
  cardTitle.textContent = addCard.name; //заполняем текстом карточку
  cardImage.alt = addCard.name; //подпись к картинке в карточке
  cardImage.src = addCard.link; //добавляем картинку в карточку
  cardLikeCounter.textContent = addCard.likes.length;//добавляем количество лайков в карточку
  
  for (let i = 0; i < addCard.likes.length; i++) {//закрасим лайки, которые уже лайкнул
    if (addCard.likes[i].name === addCard.owner.name) {
      card.querySelector(".element__like").classList.add("element__like_active");
  }
  };
  
  //навесим клик по картинке карточки
  cardImage.addEventListener("click", () =>
    viewImageWindow(cardImage.src, cardTitle.textContent)
  ); // засунем в показ фотки

  if (addCard.owner.name !== nameProfile.textContent) {//если карточка не наша
    card.querySelector(".element__delete").classList.add("element__delete_hidden");//спрячем кнопку удаления карточки
  } else {
    card.querySelector(".element__delete").addEventListener("click", (evt) => {// навесим событие на значок корзины
        openWindow(popupDeleteCard);
        handleDeleteCard(evt.target, addCard);  
      });
  }

  //навесим событие лайкнуть карточку
  card.querySelector(".element__like").addEventListener("click", (evt) => {
    if (evt.target.classList.contains("element__like_active")) {//если сердечко закрашено
      resetLikeInCard(addCard._id)//удалим лайк
        .then(result => { cardLikeCounter.textContent = result.likes.length; })//изменим счётчик
        .catch((err) => { console.log(err); });
      evt.target.classList.remove("element__like_active"); //и сделаем сердечко неактивным
    } else {
      setLikeInCard(addCard._id)//установим лайк
        .then(result => { cardLikeCounter.textContent = result.likes.length; })//изменим счётчик
        .catch((err) => { console.log(err); });
      evt.target.classList.add("element__like_active");//и закрасим сердечко
    }
  });
  
  return card;
}

function handleDeleteCard(deleteCard, addCard) {
  buttonConfirmDeteleCard.addEventListener("click", () => {//послушаем кнопочку "Да"
    deleteCardFromServer(addCard._id)//если нажали - удаляем карточку с сервера
      .then(() => { deleteCard.closest(".element").remove(); })//и удаляем со страницы
      .catch((err) => { console.log(err) });
    closeWindow(popupDeleteCard);
  });
      
}

//открываем окошечко просмотра фотографии
function viewImageWindow(url, title) {
  openWindow(popupViewedImage);
  popupImageAttribute.src = url;
  popupImageAttribute.alt = title;
  popupImageTitle.textContent = title;
}
