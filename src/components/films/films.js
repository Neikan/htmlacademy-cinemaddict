import {Count} from "../../consts";
import {createFilmCards} from "./films-generation";
import {createFilmsRated} from "./films-rated";
import {createFilmsCommented} from "./films-commented";
import {createShowMore} from "../button-show-more/button-show-more";

/**
 * Создание разметки списка фильмов
 * @param {Array} films список фильмов
 * @return {string} разметка списка фильмов
 */
export const createFilms = (films) => {
  return (`
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
          ${createFilmCards(films.slice(Count.ZERO, Count.FILMS_ON_START))}
        </div>
        ${createShowMore()}
      </section>
      ${createFilmsRated(films)}
      ${createFilmsCommented(films)}
    </section>
  `);
};
