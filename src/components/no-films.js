import AbstractComponent from "./abstract/abstract-component";


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
 * Создание класса контейнера при отсутствии фильмов
 */
export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return createContainerNoFilms();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
