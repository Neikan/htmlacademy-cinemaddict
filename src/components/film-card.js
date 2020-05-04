import AbstractComponent from "./abstract/component";
import {CLASS_POINTER, ControlName, CONTROL_ITEM, Action, CARD_ELEMENTS, ACTIVE_CLASS} from "../consts";


/**
 * Создание разметки блока стандартной карточки фильма
 * @param {Object} {свойства фильма}
 * @return {string} разметка блока
 */
const createFilmCard = ({
  promo,
  titles,
  rating,
  details,
  comments,
  isWatch,
  isWatched,
  isFavorite
}) => {
  const classMarkup = {
    'addToWatch': isWatch ? ` ` + ACTIVE_CLASS : ``,
    'markAsWatched': isWatched ? ` ` + ACTIVE_CLASS : ``,
    'markAsFavourite': isFavorite ? ` ` + ACTIVE_CLASS : ``
  };

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${titles.translate}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${details.year}</span>
        <span class="film-card__duration">${details.duration.info}</span>
        <span class="film-card__genre">${details.genres[0]}</span>
      </p>
      <img src="./images/posters/${promo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${details.description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button
          film-card__controls-item--add-to-watchlist${classMarkup[`addToWatch`]}">Add to watchlist</button>
        <button class="film-card__controls-item button
          film-card__controls-item--mark-as-watched${classMarkup[`markAsWatched`]}">Mark as watched</button>
        <button class="film-card__controls-item button
          film-card__controls-item--favorite${classMarkup[`markAsFavourite`]}">Mark as favorite</button>
      </form>
    </article>`
  );
};


/**
 * Создание класса стандартной карточки фильма
 */
export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  setClickHandler(handler) {
    for (let cardElement of CARD_ELEMENTS) {
      const target = this.getElement().querySelector(`.${cardElement}`);
      target.classList.add(CLASS_POINTER);
      target.addEventListener(`click`, handler);
    }
  }

  setBtnWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.${CONTROL_ITEM}${Action.ADD_TO}${ControlName.WATCHLIST}`)
      .addEventListener(`click`, handler);
  }

  setBtnWatchedClickHandler(handler) {
    this.getElement().querySelector(`.${CONTROL_ITEM}${Action.MARK_AS}${ControlName.WATCHED}`)
      .addEventListener(`click`, handler);
  }

  setBtnFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.${CONTROL_ITEM}${ControlName.FAVORITE}`)
    .addEventListener(`click`, handler);
  }
}