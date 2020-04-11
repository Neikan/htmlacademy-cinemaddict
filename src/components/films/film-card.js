/**
 * Создание разметки нескольких карточек фильмов
 * @param {Array} films список фильмов
 * @return {string} разметка нескольких карточек
 */
const createFilmCards = (films) => films.reduce((cards, film) => cards + createFilmCard(film), ``);

/**
 * Создание разметки стандартной карточки фильма
 * @param {Object} {свойства фильма}
 * @return {string} разметка стандартной карточки фильма
 */
const createFilmCard = ({
  poster,
  title,
  rating,
  year,
  duration,
  genres,
  comments,
  description,
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

  return (`
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button
          film-card__controls-item--add-to-watchlist${classMarkup[`addToWatch`]}">Add to watchlist</button>
        <button class="film-card__controls-item button
          film-card__controls-item--mark-as-watched${classMarkup[`markAsWatched`]}">Mark as watched</button>
        <button class="film-card__controls-item button
          film-card__controls-item--favorite${classMarkup[`markAsFavourite`]}">Mark as favorite</button>
      </form>
    </article>
  `);
};

export {createFilmCard, createFilmCards};
