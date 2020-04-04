import {Count} from "./consts";
import {createFilmCards} from "./films-generation";
import {createShowMore} from "./button-show-more";
import {createFilmsRated} from "./films-rated";
import {createFilmsCommented} from "./films-commented";

/**
 * Создание шаблона списка фильмов
 * @return {string} список фильмов
 */
export const createFilms = () => {
  return (`
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
          ${createFilmCards(Count.FILMS)}
        </div>
        ${createShowMore()}
      </section>
      ${createFilmsRated()}
      ${createFilmsCommented()}
    </section>
  `);
};
