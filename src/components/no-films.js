import AbstractComponent from "./abstract/component";


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
 * Создание класса блока фильмов при отсутствии фильмов
 */
export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return createContainerNoFilms();
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