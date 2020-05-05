export const KeyCode = {
  ENTER: 13,
  ESC: 27
};

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


export const FilmAttribute = {
  IS_WATCH: `isWatch`,
  IS_WATCHED: `isWatched`,
  IS_FAVORITE: `isFavorite`
};

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

export const ExtraName = {
  RATED: `Top rated`,
  COMMENTED: `Most commented`
};

export const ClassMarkup = {
  POINTER: `pointer`,
  OPACITY: `film-card--opacity`,
};

export const CARD_ELEMENTS = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

export const CardElement = {
  CARD: `film-card`,
  BTN_WATCHLIST: `film-card__controls-item--add-to-watchlist`,
  BTN_HISTORY: `film-card__controls-item--mark-as-watched`,
  BTN_FAVORITE: `film-card__controls-item--favorite`,
  BTN_ACTIVE: `film-card__controls-item--active`,
};

export const DetailsElement = {
  BTN_CLOSE: `film-details__close-btn`,
  EMOJI_ITEM: `film-details__emoji-item`,
  EMOJI_ITEM_CHECKED: `film-details__emoji-item:checked`,
  EMOJI_ADD_BLOCK: `film-details__add-emoji-label`,
  COMMENT_INPUT: `film-details__comment-input`,
  COMMENT_LIST: `film-details__comments-list`,
  BTN_WATCHLIST: `film-details__control-label--watchlist`,
  BTN_HISTORY: `film-details__control-label--watched`,
  BTN_FAVORITE: `film-details__control-label--favorite`
};

export const Flag = {
  YES: true,
  NO: false
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
