/**
 * Создание шаблона стандартной карточки фильма
 * @param {Object} film фильм
 * @return {string} стандартная карточка фильма
 */
export const createFilmCard = (film) => {
  const {poster, title, rating, year, duration,
    commentsCount, description, isWatch, isWatched, isFavorite} = film;

  const ActiveClass = {
    YES: ` film-card__controls-item--active`,
    NO: ``
  };

  const ClassesMarkup = {
    addToWatch: isWatch ? ActiveClass.YES : ActiveClass.NO,
    markAsWatched: isWatched ? ActiveClass.YES : ActiveClass.NO,
    markAsFavourite: isFavorite ? ActiveClass.YES : ActiveClass.NO
  };

  return (`
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">Drama</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${ClassesMarkup.addToWatch}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${ClassesMarkup.markAsFavourite}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite${ClassesMarkup.markAsFavourite}">Mark as favorite</button>
      </form>
    </article>
  `);
};
