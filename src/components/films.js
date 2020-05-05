import AbstractComponent from "./abstract/component";


/**
 * Создание разметки блока фильмов
 * @return {string} разметка блока
 */
const createFilms = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};


/**
 * Создание класса блока фильмов
 */
class Films extends AbstractComponent {
  getTemplate() {
    return createFilms();
  }
}


export {Films};
