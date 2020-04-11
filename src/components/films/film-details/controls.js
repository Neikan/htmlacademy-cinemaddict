/**
 * Создание разметки блока кнопок управления фильмом
 * @param {Object} {свойства фильма}
 * @return {string} разметка блока управления
 */
const createControls = ({isWatch, isWatched, isFavorite}) => {
  const checked = {
    'addToWatch': isWatch ? ` checked` : ``,
    'markAsWatched': isWatched ? ` checked` : ``,
    'markAsFavourite': isFavorite ? ` checked` : ``
  };

  return (`
    <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${checked[`addToWatch`]}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${checked[`markAsWatched`]}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${checked[`markAsFavourite`]}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>
  `);
};

export {createControls};
