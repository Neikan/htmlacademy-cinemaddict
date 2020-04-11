import {createGenre} from "./genre-item";


/**
 * Создание разметки списка жанров
 * @param {Array} genres список жанров
 * @return {string} разметка списка
 */
export const createGenresList = (genres) => {
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

const createGenres = (genres) => {
  return genres.map((genre) => createGenre(genre)).join(`\n`);
};
