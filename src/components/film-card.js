import {AbstractComponent} from "./abstract/component";
import {CARD_ELEMENTS, CardElement, ClassMarkup} from "../consts";


/**
 * Создание разметки блока стандартной карточки фильма
 * @param {Object} {данные фильма}
 * @param {string} filmsBlock название компонента-контейнера фильмов
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
}, filmsBlock
) => {
  const classMarkup = {
    'addToWatch': isWatch ? ` ` + CardElement.BTN_ACTIVE : ``,
    'markAsWatched': isWatched ? ` ` + CardElement.BTN_ACTIVE : ``,
    'markAsFavourite': isFavorite ? ` ` + CardElement.BTN_ACTIVE : ``
  };

  return (
    `<article class="film-card" data-films-block="${filmsBlock}">
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
class FilmCard extends AbstractComponent {
  constructor(film, filmsBlock) {
    super();

    this._film = film;
    this._filmsBlock = filmsBlock;
  }

  getTemplate() {
    return createFilmCard(this._film, this._filmsBlock);
  }

  setClickHandler(handler) {
    for (let cardElement of CARD_ELEMENTS) {
      const target = this.getElement().querySelector(`.${cardElement}`);
      target.classList.add(ClassMarkup.POINTER);
      target.addEventListener(`click`, handler);
    }
  }

  setBtnWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.${CardElement.BTN_WATCHLIST}`)
      .addEventListener(`click`, handler);
  }

  setBtnWatchedClickHandler(handler) {
    this.getElement().querySelector(`.${CardElement.BTN_HISTORY}`)
      .addEventListener(`click`, handler);
  }

  setBtnFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.${CardElement.BTN_FAVORITE}`)
    .addEventListener(`click`, handler);
  }
}


export {FilmCard};
