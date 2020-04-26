import AbstractComponent from "./abstract/abstract-component";

/**
 * Создание разметки блока фильмов
 * @return {string} разметка блока
 */
const createPage = () => `<section class="films"></section>`;


/**
 * Создание класса блока фильмов
 */
export default class Page extends AbstractComponent {
  getTemplate() {
    return createPage();
  }
}
