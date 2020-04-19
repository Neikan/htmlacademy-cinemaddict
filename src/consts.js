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
  AFTER_END: `afterend`,
  AFTER_BEGIN: `afterbegin`
};


export const Filter = {
  IS_WATCH: `isWatch`,
  IS_WATCHED: `isWatched`,
  IS_FAVORITE: `isFavorite`
};

export const Sorting = {
  BY_RATING: {
    type: `forNumber`,
    parameter: `rating`
  },
  BY_COMMENTS: {
    type: `forArray`,
    parameter: `comments`
  }
};

export const ProfileRank = {
  NOVICE: {
    rank: `Novice`,
    from: 1,
  },
  FUN: {
    rank: `Fan`,
    from: 11
  },
  MOVIE_BUFF: {
    rank: `Movie Buff`,
    from: 21
  }
};

export const EMOJIES = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

export const START_DATE_FILMS = [1970, 1, 1];

export const CLASS_POINTER = `pointer`;

export const ExtraName = {
  RATED: `Top rated`,
  COMMENTED: `Most commented`
};
