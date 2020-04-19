import {Filter} from "../../consts";
import {filterCountMenu} from "../../mock/menu-filters";
import {createElement} from "../../utils";


/**
 * Создание разметки блока главного меню
 * @param {Array} films список фильмов
 * @return {string} разметка блока
 */
const createMenu = (films) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist
          <span class="main-navigation__item-count">${filterCountMenu(films, Filter.IS_WATCH)}</span>
        </a>
        <a href="#history" class="main-navigation__item">History
          <span class="main-navigation__item-count">${filterCountMenu(films, Filter.IS_WATCHED)}</span>
        </a>
        <a href="#favorites" class="main-navigation__item">Favorites
          <span class="main-navigation__item-count">${filterCountMenu(films, Filter.IS_FAVORITE)}</span>
        </a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


/**
 * Создание класса подробной карточки фильма
 */
export default class Menu {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createMenu(this._films);
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
