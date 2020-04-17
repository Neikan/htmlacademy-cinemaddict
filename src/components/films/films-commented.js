import {createFilmCards} from "../film-card/film-card";

/**
 * Создание разметки блока самых обсуждаемых фильмов
 * @param {Array} films список фильмов
 * @return {string} разметка блока
 */
const createFilmsCommented = (films) => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
        ${createFilmCards(films)}
      </div>
    </section>
  `);
};

export {createFilmsCommented};
