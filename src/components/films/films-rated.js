import {createFilmCards} from "./film-card";

/**
 * Создание разметки блока высокорейтинговых фильмов
 * @param {Array} films список фильмов
 * @return {string} разметка блока
 */
const createFilmsRated = (films) => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
        ${createFilmCards(films)}
      </div>
    </section>
  `);
};

export {createFilmsRated};
