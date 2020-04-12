/**
 * Создание разметки блока жанров
 * @param {Array} genres список жанров
 * @return {string} разметка блока
 */
const createGenresBlock = (genres) => {
  const title = genres.length > 1 ? `Genres` : `Genre`;

  return (`
    <tr class="film-details__row">
      <td class="film-details__term">${title}</td>
      <td class="film-details__cell">
        ${createGenres(genres)}
      </td>
    </tr>
  `);
};

/**
 * Создание разметки жанра
 * @param {string} genre жанр
 * @return {string} разметка элемента
 */
const createGenre = (genre) => `<span class="film-details__genre">${genre}</span>`;

/**
 * Создание разметки перечня жанров
 * @param {Array} genres жанры
 * @return {string} разметка перечня
 */
const createGenres = (genres) => genres.map(createGenre).join(`\n`);

export {createGenresBlock};
