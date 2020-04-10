import {ProfileRank} from '../consts.js';
import {getRandomInt} from '../utils.js';

export const getRandomProfileRank = () => {
  const randomRank = getRandomInt(ProfileRank.moviebuff.range.to);

  switch (true) {
    case (randomRank >= ProfileRank.novice.range.from && randomRank < ProfileRank.novice.range.to):
      return ProfileRank.novice.rank;

    case (randomRank >= ProfileRank.fun.range.from && randomRank < ProfileRank.fun.range.to):
      return ProfileRank.fun.rank;

    case (randomRank >= ProfileRank.moviebuff.range.from && randomRank < ProfileRank.moviebuff.range.to):
      return ProfileRank.moviebuff.rank;

    default:
      return (`1`);
  }
};
