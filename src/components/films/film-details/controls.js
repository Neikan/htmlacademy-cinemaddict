/**
 * Создание разметки блока кнопок управления фильмом
 * @param {Object} {свойства фильма}
 * @return {string} разметка блока управления
 */
const createControls = ({isWatch, isWatched, isFavorite}) => {
  const CHECKED = `checked`;

  return (`
    <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${isWatch && CHECKED}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${isWatched && CHECKED}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${isFavorite && CHECKED}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>
  `);
};

export {createControls};
