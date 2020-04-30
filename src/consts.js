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
  ALL: 1,
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
  BEFORE_BEGIN: `beforebegin`,
  AFTER_END: `afterend`,
  AFTER_BEGIN: `afterbegin`
};


export const Attribute = {
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

export const CARD_ELEMENTS = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

export const DetailsElement = {
  BTN_CLOSE: `film-details__close-btn`
};

export const Flag = {
  YES: true,
  NO: false
};

export const CONTROL_LABEL = `film-details__control-label--`;

export const CONTROL_ITEM = `film-card__controls-item--`;

export const Action = {
  ADD_TO: `add-to-`,
  MARK_AS: `mark-as-`
};

export const ControlName = {
  WATCHLIST: `watchlist`,
  WATCHED: `watched`,
  FAVORITE: `favorite`
};
