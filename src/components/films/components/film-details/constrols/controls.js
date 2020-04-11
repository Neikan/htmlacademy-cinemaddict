/**
 * Создание разметки блока кнопок управления фильмом
 * @param {Object} film фильм
 * @return {string} разметка блока управления
 */
const createControls = (film) => {
  const {isWatch, isWatched, isFavorite} = film;

  const Checked = {
    addToWatch: isWatch ? ` checked` : ``,
    markAsWatched: isWatched ? ` checked` : ``,
    markAsFavourite: isFavorite ? ` checked` : ``
  };

  return (`
    <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${Checked.addToWatch}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${Checked.markAsWatched}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${Checked.markAsFavourite}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>
  `);
};

export {createControls};
