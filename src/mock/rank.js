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
    case (rank >= ProfileRank.NOVICE.from && rank <= ProfileRank.FUN.from - 1):
      return ProfileRank.NOVICE.rank;

    case (rank >= ProfileRank.FUN.from && rank <= ProfileRank.MOVIE_BUFF.from - 1):
      return ProfileRank.FUN.rank;

    case (rank >= ProfileRank.MOVIE_BUFF.from):
      return ProfileRank.MOVIE_BUFF.rank;

    default:
      return (``);
  }
};


export {getProfileRank};
