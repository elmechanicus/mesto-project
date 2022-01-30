//Открываем модальное окошко
export function openWindow(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closePopupEscape); //Послушаем кнопочку Escape во всём документе
}

//Закрываем модальное окошко
export function closeWindow(popup) {
  document.removeEventListener("keydown", closePopupEscape); //удаляем прослушку на клавиши
  popup.classList.remove("popup_open"); //закрываемся
}

//обработаем кнопочку Escape
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_open");
    closeWindow(popup);
  }
}