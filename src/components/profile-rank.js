import {AbstractComponent} from './abstract/component.js';
import {RankDescription} from '../consts.js';


/**
 * Получение ранга профиля пользователя
 * @param {Number} countWatchedFilms количество просмотренных фильмов
 * @return {string} ранг профиля пользователя
 */
const getProfileRank = (countWatchedFilms) => {
  switch (true) {
    case (countWatchedFilms >= RankDescription.NOVICE.from && countWatchedFilms <= RankDescription.FUN.from - 1):
      return RankDescription.NOVICE.rank;

    case (countWatchedFilms >= RankDescription.FUN.from && countWatchedFilms <= RankDescription.MOVIE_BUFF.from - 1):
      return RankDescription.FUN.rank;

    case (countWatchedFilms >= RankDescription.MOVIE_BUFF.from):
      return RankDescription.MOVIE_BUFF.rank;

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


class ProfileRank extends AbstractComponent {
  constructor(countWatchedFilms) {
    super();

    this._countWatchedFilms = countWatchedFilms;
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createProfileRank(this._countWatchedFilms);
  }
}


export {ProfileRank};
