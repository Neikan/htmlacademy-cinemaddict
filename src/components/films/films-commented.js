import {Count} from "../../consts";
import {createFilmCards} from "./films-generation";

/**
 * Создание шаблона списка самых обсуждаемых фильмов
 * @return {string} список самых обсуждаемых фильмов
 */
export const createFilmsCommented = () => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
        ${createFilmCards(Count.FILMS_EXTRA)}
      </div>
    </section>
  `);
};
