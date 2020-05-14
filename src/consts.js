export const KeyCode = {
  ENTER: 13,
  ESC: 27
};


export const MINUTES_IN_HOUR = 60;


export const CountFilm = {
  START: 5,
  BY_BUTTON: 5,
  EXTRA: 2,
};

export const CountCheckFormat = {
  TIME: 10,
  NUMBER: 1000,
};


export const FILM_DESCRIPTION_LENGTH = 140;


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


export const SortKind = {
  ARRAY: `forArray`,
  NUMBER_ASC: `forNumberAsc`,
  NUMBER_DESC: `forNumberDesc`,
  DATE: `forDate`,
};


export const SortMethod = {
  BY_RATING: {
    type: SortKind.NUMBER_DESC,
    parameter: `rating`
  },
  BY_COMMENTS: {
    type: SortKind.ARRAY,
    parameter: `commentsIds`
  },
  BY_DATE: {
    type: SortKind.DATE,
    parameter: `year`
  },
  BY_COMMENT_DATE: {
    type: SortKind.NUMBER_ASC,
    parameter: `date`
  },
  BY_GENRES: {
    type: SortKind.NUMBER_DESC,
    parameter: `count`
  }
};


export const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`,
  BY_COMMENTS: `by-comments`,
  BY_GENRES: `by-genres`
};


export const SortClass = {
  BUTTON: `sort__button`,
  BUTTON_ACTIVE: `sort__button--active`
};


export const RankDescription = {
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


export const ExtraName = {
  RATED: `Top rated`,
  COMMENTED: `Most commented`
};


export const FilmsBlock = {
  DEFAULT: `default`,
  ALL: `all-films`,
  RATED: `top-rated`,
  COMMENTED: `most-commented`
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


export const FilmsElement = {
  EXTRA: `films-list--extra`,
  TITLE: `films-list__title`,
  FILM_LIST: `.films-list__container`
};


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
  COMMENT_COUNT: `film-details__comments-count`,
  COMMENT_ITEM: `film-details__comment`,
  BTN_COMMENT_DELETE: `film-details__comment-delete`,
  BTN_WATCHLIST: `film-details__control-label--watchlist`,
  BTN_HISTORY: `film-details__control-label--watched`,
  BTN_FAVORITE: `film-details__control-label--favorite`,
  ERROR: `film-details__new-comment--error`
};


export const MenuElement = {
  ITEMS: `main-navigation__items`,
  ITEM: `main-navigation__item`,
  ITEM_ACTIVE: `main-navigation__item--active`,
  ITEM_STATS: `main-navigation__additional`,
  DATA_ID: `a[data-item-id]`
};


export const Flag = {
  YES: true,
  NO: false
};


export const FormatRule = {
  RELEASE_DATE: `DD MMMM YYYY`,
  RELEASE_YEAR: `YYYY`,
  COMMENT_DATE: `YYYY/MM/DD HH:MM`,
  DURATION: `mm[m]`,
  DURATION_WITH_HOURS: `H[h] mm[m]`
};


export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  HISTORY_BY_TIME: `History by time`,
  FAVORITES: `Favorites`,
  RATED: `Rated`,
  COMMENTED: `Commented`,
  GENRES: `By genres`
};


export const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};


export const StatsElement = {
  NAME: `Stats`,
  FILTER: `statistic__filters-input`,
  CHART: `statistic__chart`
};


export const SHAKE_ANIMATION = `shake`;


export const BtnName = {
  DELETE: `Delete`,
  DELETING: `Deleting`
};


export const BTN_ATTRIBUTE = `disabled`;


export const NOT_DATA = `—`;
