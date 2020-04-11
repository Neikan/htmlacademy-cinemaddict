import {ProfileRank, Filter} from '../consts.js';
import {filterCountMenu} from './menu-filters.js';

/**
 * Получение ранга профиля пользователя
 * @param {Array} films список фильмов
 * @return {string} ранг профиля пользователя
 */
const getProfileRank = (films) => {
  const rank = filterCountMenu(films, Filter.IS_WATCHED);

  switch (true) {
    case (rank >= ProfileRank.NOVICE.FROM && rank <= ProfileRank.FUN.FROM - 1):
      return ProfileRank.NOVICE.RANK;

    case (rank >= ProfileRank.FUN.FROM && rank <= ProfileRank.MOVIE_BUFF.FROM - 1):
      return ProfileRank.FUN.RANK;

    case (rank >= ProfileRank.MOVIE_BUFF.FROM):
      return ProfileRank.MOVIE_BUFF.RANK;

    default:
      return (``);
  }
};

export {getProfileRank};
