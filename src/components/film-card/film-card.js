import {CountFilm, KeyCode} from "../../consts";
import {createElement, renderComponent} from "../../utils";
import FilmCardComponent from "./film-card";
import FilmDetailsComponent from "./../film-details/film-details";

/**
 * Создание разметки нескольких карточек фильмов
 * @param {Array} films список фильмов
 * @return {string} разметка нескольких карточек
 */
const createFilmCards = (films) => films.slice(0, CountFilm.START)
  .reduce((cards, film) => cards + createFilmCard(film), ``);

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

  const ACTIVE_CLASS = ` film-card__controls-item--active`;
  const classMarkup = {
    'addToWatch': isWatch ? ACTIVE_CLASS : ``,
    'markAsWatched': isWatched ? ACTIVE_CLASS : ``,
    'markAsFavourite': isFavorite ? ACTIVE_CLASS : ``
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

export {createFilmCards};


/**
 * Создание класса стандартной карточки фильма
 */
export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/**
 * Изменение карточки фильна на подробную
 * @param {Object} filmsContainer список фильмов
 * @param {Object} {формы фильма}
 */
const removeDetails = (filmsContainer, {details}) => {
  const detailsForm = details.getElement().querySelector(`form`);

  const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    filmsContainer.removeChild(details.getElement());
  };

  detailsForm.addEventListener(`submit`, editFormSubmitHandler);
};

/**
 * Изменение карточки фильма на стандартную
 * @param {Object} filmsContainer список фильмов
 * @param {Object} {формы фильма}
 * @param {Function} escKeyDownHandler помощник
 */
const showDetails = (filmsContainer, {card, details}) => {
  const poster = card.getElement().querySelector(`.film-card__poster`);
  const title = card.getElement().querySelector(`.film-card__title`);
  const comments = card.getElement().querySelector(`.film-card__comments`);
  const btnCloseDetails = details.getElement().querySelector(`.film-details__close-btn`);

  const removeCardDetails = () => {
    filmsContainer.removeChild(details.getElement());
    document.removeEventListener(`keydown`, btnCloseDetailsKeyDownHandler);
  };

  const btnCloseDetailsClickHandler = () => {
    if (document.querySelector(`.film-details`)) {
      removeCardDetails();
    }
  };

  const cardClickHandler = () => {
    filmsContainer.appendChild(details.getElement());
    btnCloseDetails.addEventListener(`click`, btnCloseDetailsClickHandler);
    document.addEventListener(`keydown`, btnCloseDetailsKeyDownHandler);
  };

  const btnCloseDetailsKeyDownHandler = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      removeCardDetails();
    }
  };

  poster.addEventListener(`click`, cardClickHandler);
  title.addEventListener(`click`, cardClickHandler);
  comments.addEventListener(`click`, cardClickHandler);
};


const renderFilm = (filmsComponent, film) => {
  const filmsContainer = filmsComponent.getElement().querySelector(`.films .films-list__container`);

  const filmForm = {
    card: new FilmCardComponent(film),
    details: new FilmDetailsComponent(film)
  };

  const escKeyDownHandler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      filmsContainer.removeChild(filmForm.details.getElement());
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  removeDetails(filmsContainer, filmForm);
  showDetails(filmsContainer, filmForm, escKeyDownHandler);

  renderComponent(filmsContainer, filmForm.card.getElement());
};

export {renderFilm};
