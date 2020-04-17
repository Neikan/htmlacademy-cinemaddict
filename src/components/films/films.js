import {Sorting, CountFilm} from "../../consts";
import {createFilmsRated} from "./films-rated";
import {createFilmsCommented} from "./films-commented";
import {createShowMore, addShowMoreListener} from "./components/show-more-button";
import {sortingArray, createElement} from "../../utils";
import {renderFilm} from "../film-card/film-card";

/**
 * Создание разметки блока фильмов
 * @param {Array} films список фильмов
 * @return {string} разметка блока
 */
const createFilms = (films) => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
        ${createShowMore()}
      </section>
      ${createFilmsRated(sortingArray(films, Sorting.BY_RATING))}
      ${createFilmsCommented(sortingArray(films, Sorting.BY_COMMENTS))}
    </section>`
  );
};

/**
 * Создание класса блока фильмов
 */
export default class Films {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilms(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

const renderFilms = (filmsComponent, films) => {
  if (films.length) {
    let showingFilmsCount = CountFilm.START;

    const renderFilmsList = () => (film) => renderFilm(filmsComponent, film);

    films.slice(0, showingFilmsCount).map(renderFilmsList());

    if (filmsComponent.getElement().querySelector(`.films-list__show-more`)) {
      addShowMoreListener(filmsComponent, films, showingFilmsCount, renderFilmsList);
    }
  }
};

export {renderFilms};
