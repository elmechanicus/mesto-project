import {settingsAuth} from "./constants.js";

export const getInitialServerCards = () => {//вытаскиваем карточки из сервера
  return fetch(`${settingsAuth.apiURL}/cards`, {
    headers: settingsAuth.headers
  })
    .then(res => checkResult(res));
}


export const getUserProfile = () => {//получаем данные о профиле пользователя
  return fetch(`${settingsAuth.apiURL}/users/me`, {
    headers: settingsAuth.headers
  })
  .then(res => checkResult(res));
}

export const patchUser = (userName, aboutUser) => {//отсылаем отредактированные данные профиля пользователя
  return fetch(`${settingsAuth.apiURL}/users/me`, {
    method: 'PATCH',
    headers: settingsAuth.headers,
    body: JSON.stringify({
      name: userName,
      about: aboutUser
    })
  })
  .then(res => checkResult(res));
}

export const addCardToServer = (nameCard, urlCard) => {//создаём новую карточку на сервере
  return fetch(`${settingsAuth.apiURL}/cards`, {
    method: 'POST',
    headers: settingsAuth.headers,
    body: JSON.stringify({
      name: nameCard,
      link: urlCard,

    }),
  })
  .then(res => checkResult(res));
}

export const deleteCardFromServer = (cardId) => {//удаляем карточку с сервера
  return fetch(`${settingsAuth.apiURL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: settingsAuth.headers
  })
    .then(res => {
      if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}

export const setLikeInCard = (cardId) => {//поставим лайк карточке
  return fetch(`${settingsAuth.apiURL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: settingsAuth.headers
  })
  .then(res => checkResult(res));
}

export const resetLikeInCard = (cardId) => {//уберём лайк из карточки
  return fetch(`${settingsAuth.apiURL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: settingsAuth.headers
  })
  .then(res => checkResult(res));
}

export const patchNewAvatar = (newAvatar) => {
  return fetch(`${settingsAuth.apiURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: settingsAuth.headers,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
    .then(res => checkResult(res));
}


//проверим результат запроса
function checkResult(result) {
if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.status}`);
}