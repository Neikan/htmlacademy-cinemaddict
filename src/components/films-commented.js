import {Count} from "../consts";
import {createFilmCards} from "./films/films-creation";

/**
 * Создание шаблона списка самых обсуждаемых фильмов
 * @param {Array} films список фильмов
 * @return {string} список самых обсуждаемых фильмов
 */
const createFilmsCommented = (films) => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
        ${createFilmCards(films.slice(Count.ZERO, Count.FILMS_EXTRA))}
      </div>
    </section>
  `);
};

export {createFilmsCommented};
