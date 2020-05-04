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
  ALL: 12,
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

export const ATTRIBUTES = [`isWatch`, `isWatched`, `isFavorite`];

export const DETAILS = `details`;

export const Sorting = {
  BY_RATING: {
    type: `forNumberDesc`,
    parameter: `rating`
  },
  BY_COMMENTS: {
    type: `forArray`,
    parameter: `comments`
  },
  BY_DATE: {
    type: `forDate`,
    parameter: `year`
  },
  BY_COMMENT_DATE: {
    type: `forNumberAsc`,
    parameter: `date`
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

export const CLASS_FILM_OPACITY = `film-card--opacity`;

export const ACTIVE_CLASS = `film-card__controls-item--active`;

export const CARD_CLASS = `film-card`;

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
  BTN_CLOSE: `film-details__close-btn`,
  EMOJI_ITEM: `film-details__emoji-item`,
  EMOJI_ITEM_CHECKED: `film-details__emoji-item:checked`,
  EMOJI_ADD_BLOCK: `film-details__add-emoji-label`,
  COMMENT_INPUT: `film-details__comment-input`,
  COMMENT_LIST: `film-details__comments-list`
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

export const FormatRule = {
  RELEASE_DATE: `DD MMMM YYYY`,
  RELEASE_YEAR: `YYYY`,
  COMMENT_DATE: `YYYY/MM/DD HH:MM`
};

export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};
