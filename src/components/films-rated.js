import {Count} from "./consts";
import {createFilmCards} from "./films-generation";

/**
 * Создание шаблона списка высокорейтинговых фильмов
 * @return {string} список высокорейтинговых фильмов
 */
export const createFilmsRated = () => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
        ${createFilmCards(Count.FILMS_EXTRA)}
      </div>
    </section>
  `);
};
