export const KeyCode = {
  ENTER: 13,
  ESC: 27
};

export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export const CountFilm = {
  ALL: 20,
  START: 5,
  BY_BUTTON: 5,
  EXTRA: 2,
};

export const CountCheckFormat = {
  TIME: 10,
  NUMBER: 1000,
};

export const Position = {
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`
};


export const Filter = {
  IS_WATCH: `isWatch`,
  IS_WATCHED: `isWatched`,
  IS_FAVORITE: `isFavorite`
};

export const Sorting = {
  ByRating: {
    type: `forNumber`,
    parameter: `rating`
  },
  ByComments: {
    type: `forArray`,
    parameter: `comments`
  }
};

export const ProfileRank = {
  NOVICE: {
    RANK: `Novice`,
    FROM: 1,
  },
  FUN: {
    RANK: `Fan`,
    FROM: 11
  },
  MOVIE_BUFF: {
    RANK: `Movie Buff`,
    FROM: 21
  }
};

export const EMOJIES = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];
