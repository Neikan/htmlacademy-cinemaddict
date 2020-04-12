import {CountFilm, Sorting} from "../consts";
import {createFilmsRated} from "./films/films-rated";
import {createFilmsCommented} from "./films/films-commented";
import {createShowMore} from "./films/button-show-more";
import {sortingArray} from "../utils";
import {createFilmCards} from "./films/film-card";

/**
 * Создание разметки блока фильмов
 * @param {Array} films список фильмов
 * @return {string} разметка блока
 */
const createFilms = (films) => {
  return (`
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
          ${createFilmCards(films.slice(0, CountFilm.START))}
        </div>
        ${createShowMore()}
      </section>
      ${createFilmsRated(sortingArray(films, Sorting.ByRating, CountFilm.EXTRA))}
      ${createFilmsCommented(sortingArray(films, Sorting.ByComments, CountFilm.EXTRA))}
    </section>
  `);
};

export {createFilms};
