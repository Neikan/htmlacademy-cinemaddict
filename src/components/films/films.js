import {createShowMore} from "./components/show-more-button";
import {createElement} from "../../utils";


/**
 * Создание разметки блока фильмов
 * @param {Array} films фильмы
 * @return {string}
 */
const createFilms = (films) => {
  const filmsContainer = films.length ? createContainerWithFilms() : createContainerNoFilms();

  return filmsContainer;
};


/**
 * Создание разметки блока фильмов при наличии фильмов
 * @return {string} разметка блока
 */
const createContainerWithFilms = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
        ${createShowMore()}
      </section>
    </section>`
  );
};

/**
 * Создание разметки блока фильмов при отсутствии фильмов
 * @return {string} разметка блока
 */
const createContainerNoFilms = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
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
