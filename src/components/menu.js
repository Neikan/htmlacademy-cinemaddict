import AbstractComponent from "./abstract/component";
import {FilterType, MenuElement} from "../consts";


/**
 * Создание разметки блока главного меню
 * @param {Object} countsFilmsByFilters количества фильмов, соответствующих фильтрам
 * @param {string} filterType примененный фильтр
 * @return {string} разметка блока
 */
const createMenu = (countsFilmsByFilters, filterType) => {
  const classMarkup = {
    ALL: filterType === FilterType.ALL ? ` ` + MenuElement.ITEM_ACTIVE : ``,
    WATCHLIST: filterType === FilterType.WATCHLIST ? ` ` + MenuElement.ITEM_ACTIVE : ``,
    HISTORY: filterType === FilterType.HISTORY ? ` ` + MenuElement.ITEM_ACTIVE : ``,
    FAVORITES: filterType === FilterType.FAVORITES ? ` ` + MenuElement.ITEM_ACTIVE : ``
  };

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" data-filter-type="${FilterType.ALL}" class="main-navigation__item${classMarkup.ALL}">All movies</a>
        <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item${classMarkup.WATCHLIST}">Watchlist
          <span class="main-navigation__item-count">${countsFilmsByFilters.WATCHLIST}</span>
        </a>
        <a href="#history" data-filter-type="${FilterType.HISTORY}" class="main-navigation__item${classMarkup.HISTORY}">History
          <span class="main-navigation__item-count">${countsFilmsByFilters.HISTORY}</span>
        </a>
        <a href="#favorites" data-filter-type="${FilterType.FAVORITES}" class="main-navigation__item${classMarkup.FAVORITES}">Favorites
          <span class="main-navigation__item-count">${countsFilmsByFilters.FAVORITES}</span>
        </a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


/**
 * Создание класса главного меню
 */
export default class Menu extends AbstractComponent {
  constructor(countsFilmsByFilters, filterType) {
    super();

    this._countsFilmsByFilters = countsFilmsByFilters;
    this._filterType = filterType;

    this._clickHandler = this._clickHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createMenu(this._countsFilmsByFilters, this._filterType);
  }


  /**
   * Метод, обеспечивающий добавление слушателей на изменение текущего фильтра
   * @param {Function} handler помощник
   */
  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this._clickHandler(handler));
  }


  /**
   * Метод, обеспечиващий установку активного фильтра и получение его значения
   * @param {Function} handler помощник
   * @return {Function}
   */
  _clickHandler(handler) {
    return (evt) => {
      const target = evt.target.closest(`.${MenuElement.ITEM}`);

      if (target.tagName !== `A`) {
        return;
      }

      this._setActiveClassHandler(evt);
      this._filterType = target.dataset.filterType;
      handler(this._filterType);
    };
  }


  /**
   * Метод, обеспечивающий добавление/удаления активного класса с пункта меню
   * @param {Object} evt событие
   */
  _setActiveClassHandler(evt) {
    [...this.getElement().querySelectorAll(`.${MenuElement.ITEM}`)].map((menuItem) => {
      if (menuItem === evt.target.closest(`.${MenuElement.ITEM}`)) {
        menuItem.classList.add(`${MenuElement.ITEM_ACTIVE}`);
      } else {
        menuItem.classList.remove(`${MenuElement.ITEM_ACTIVE}`);
      }
    });
  }
}
