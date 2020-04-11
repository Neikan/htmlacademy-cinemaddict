import {Sorting, CountFilm} from "../consts";
import {createFilmCards} from "./films/films-creation";
import {createFilmsRated} from "./films-rated";
import {createFilmsCommented} from "./films-commented";
import {createShowMore} from "./button-show-more";
import {sortingArray} from "../utils";

/**
 * Создание разметки списка фильмов
 * @param {Array} films список фильмов
 * @return {string} разметка списка фильмов
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
      ${createFilmsRated(sortingArray(films, Sorting.TOP_RATING))}
      ${createFilmsCommented(sortingArray(films, Sorting.MOST_COMMENTED))}
    </section>
  `);
};

export {createFilms};
