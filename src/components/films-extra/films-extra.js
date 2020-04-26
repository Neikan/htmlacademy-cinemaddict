import AbstractComponent from "../abstract/abstract-component";


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
export default class FilmsExtra extends AbstractComponent {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return createFilmsExtra(this._title);
  }
}
