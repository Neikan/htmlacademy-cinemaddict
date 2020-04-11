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
    case (rank >= ProfileRank.novice.range.from && rank <= ProfileRank.novice.range.to):
      return ProfileRank.novice.rank;

    case (rank >= ProfileRank.fun.range.from && rank <= ProfileRank.fun.range.to):
      return ProfileRank.fun.rank;

    case (rank >= ProfileRank.moviebuff.range.from && rank <= ProfileRank.moviebuff.range.to):
      return ProfileRank.moviebuff.rank;

    default:
      return (``);
  }
};

export {getProfileRank};
