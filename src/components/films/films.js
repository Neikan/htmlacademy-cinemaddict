import {createShowMore} from "./components/show-more-button";
import {createElement} from "../../utils";


/**
 * Создание разметки блока фильмов
 * @return {string} разметка блока
 */
const createFilms = () => {
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
 * Создание класса блока фильмов
 */
export default class Films {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilms();
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
