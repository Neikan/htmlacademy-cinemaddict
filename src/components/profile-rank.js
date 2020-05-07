import AbstractComponent from './abstract/component.js';
import {RankDescription} from '../consts.js';


/**
 * Создание разметки блока ранга профиля пользователя
 * @param {string} rank ранг профиля пользователя
 * @return {string} разметка блока
 */
const createProfileRank = (rank) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


export default class ProfileRank extends AbstractComponent {
  constructor(countWatchedFilms) {
    super();

    this._countWatchedFilms = countWatchedFilms;
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createProfileRank(this._getRankDescription());
  }


  /**
   * Метод, обеспечивающий получение ранга профиля пользователя
   * @return {string} ранг профиля пользователя
   */
  _getRankDescription() {
    if (this._countWatchedFilms >= RankDescription.MOVIE_BUFF.from) {
      return RankDescription.MOVIE_BUFF.rank;
    } else if (this._countWatchedFilms >= RankDescription.FUN.from) {
      return RankDescription.FUN.rank;
    } else if (this._countWatchedFilms >= RankDescription.NOVICE.from) {
      return RankDescription.NOVICE.rank;
    } else {
      return (``);
    }
  }
}
