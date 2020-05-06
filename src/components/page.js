import {AbstractComponent} from "./abstract/component";

/**
 * Создание разметки секции фильмов
 * @return {string} разметка блока
 */
const createPage = () => `<section class="films"></section>`;


/**
 * Создание класса секции для управления блоками фильмов
 */
class Page extends AbstractComponent {
  getTemplate() {
    return createPage();
  }
}


export {Page};
