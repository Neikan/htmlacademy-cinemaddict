/**
 * Создание разметки жанра
 * @param {string} genre жанр
 * @return {string} разметка элемента
 */
export const createGenre = (genre) => {
  return (`
    <span class="film-details__genre">${genre}</span>
  `);
};
