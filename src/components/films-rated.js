import {createFilmCards} from "./films/film-card";

/**
 * Создание шаблона списка высокорейтинговых фильмов
 * @param {Array} films список фильмов
 * @return {string} список высокорейтинговых фильмов
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
