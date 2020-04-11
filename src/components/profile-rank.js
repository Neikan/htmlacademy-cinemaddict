import {getProfileRank} from "../mock/rank/rank";

/**
 * Создание разметки блока ранга профиля пользователя
 * @param {Array} films список фильмов
 * @return {string} разметка ранга профиля пользователя
 */
const createProfileRank = (films) => {
  return (`
    <section class="header__profile profile">
      <p class="profile__rating">${getProfileRank(films)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `);
};

export {createProfileRank};
