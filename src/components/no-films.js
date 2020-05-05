import AbstractComponent from "./abstract/component";


/**
 * Создание разметки блока фильмов при отсутствии фильмов
 * @param {Boolean} isFilter
 * @return {string} разметка блока
 */
const createContainerNoFilms = (isFilter) => {
  const addMarkup = isFilter ? `` : `in our database`;

  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies ${addMarkup}</h2>
      </section>
    </section>`
  );
};


/**
 * Создание класса блока фильмов при отсутствии фильмов
 */
class NoFilms extends AbstractComponent {
  constructor(isFilter) {
    super();

    this._isFilter = isFilter;
  }


  getTemplate() {
    return createContainerNoFilms(this._isFilter);
  }

  /**
   * Метод, обеспечивающий добавление помощника
   * для отслеживания кликов по элементу
   * @param {Function} handler
   */
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}


export {NoFilms};
