import AbstractComponent from "./abstract/component";


/**
 * Создание разметки кнопки показа фильмов
 * @return {string} разметка кнопки показа скрытых фильмов
 */
const createShowMore = () => `<button class="films-list__show-more">Show more</button>`;


/**
 * Создание класса кнопки показа скрытых фильмов
 */
export default class ShowMoreBtn extends AbstractComponent {
  getTemplate() {
    return createShowMore();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
