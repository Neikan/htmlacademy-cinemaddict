import {ProfileRank} from '../consts.js';


/**
 * Получение ранга профиля пользователя
 * @param {Number} countWatchedFilms количество просмотренных фильмов
 * @return {string} ранг профиля пользователя
 */
const getProfileRank = (countWatchedFilms) => {
  switch (true) {
    case (countWatchedFilms >= ProfileRank.NOVICE.from && countWatchedFilms <= ProfileRank.FUN.from - 1):
      return ProfileRank.NOVICE.rank;

    case (countWatchedFilms >= ProfileRank.FUN.from && countWatchedFilms <= ProfileRank.MOVIE_BUFF.from - 1):
      return ProfileRank.FUN.rank;

    case (countWatchedFilms >= ProfileRank.MOVIE_BUFF.from):
      return ProfileRank.MOVIE_BUFF.rank;

    default:
      return (``);
  }
};


/**
 * Создание разметки блока ранга профиля пользователя
 * @param {Number} countWatchedFilms список фильмов
 * @return {string} разметка блока
 */
const createProfileRank = (countWatchedFilms) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getProfileRank(countWatchedFilms)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


export {createProfileRank};
