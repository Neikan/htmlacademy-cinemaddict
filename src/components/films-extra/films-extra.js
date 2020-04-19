import {createElement} from "../../utils";


/**
 * Создание разметки дополнительного блока фильмов
 * @param {string} title название блока
 * @return {string} разметка блока
 */
const createFilmsExtra = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};


/**
 * Создание класса блока фильмов
 */
export default class FilmsExtra {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createFilmsExtra(this._title);
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
