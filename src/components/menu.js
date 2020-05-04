import AbstractComponent from "./abstract/component";
import {FilterType} from "../consts";


const FilterClass = {
  ITEM: `main-navigation__item`,
  ITEM_ACTIVE: `main-navigation__item--active`
};


/**
 * Получение количества элементов, соответствующих параметру фильтрации
 * @param {Array} films список фильмов
 * @param {string} param параметр фильтрации
 * @return {Number} количество соответствующих элементов
 */
const filterCountMenu = (films, param) => films.reduce(getCount(param), 0);


/**
 * Проверка элемента и изменение счетчика по ее результатам
 * @param {string} param параметр проверки
 * @return {Number} значение счетчика
 */
const getCount = (param) => (count, film) => (film[param] ? ++count : count);


/**
 * Создание разметки блока главного меню
 * @param {Number} watchlistCount количество фильмов в запланированном к просмотру
 * @param {Number} watchedCount количество фильмов в просмотренном
 * @param {Number} favoriteCount количество фильмов в избранном
 * @return {string} разметка блока
 */
const createMenu = (watchlistCount, watchedCount, favoriteCount) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" data-filter-type="${FilterType.ALL}" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item">Watchlist
          <span class="main-navigation__item-count">${watchlistCount}</span>
        </a>
        <a href="#history" data-filter-type="${FilterType.HISTORY}" class="main-navigation__item">History
          <span class="main-navigation__item-count">${watchedCount}</span>
        </a>
        <a href="#favorites" data-filter-type="${FilterType.FAVORITES}" class="main-navigation__item">Favorites
          <span class="main-navigation__item-count">${favoriteCount}</span>
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
  constructor(watchlistCount, watchedCount, favoriteCount, activeFilter) {
    super();

    this._watchlistCount = watchlistCount;
    this._watchedCount = watchedCount;
    this._favoriteCount = favoriteCount;
    this._currentFilter = activeFilter;

    this._clickHandler = this._clickHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createMenu(this._watchlistCount, this._watchedCount, this._favoriteCount);
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
      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = evt.target.dataset.filterType;
      if (this._currentFilter === filterType) {
        return;
      }

      this._setActiveClassHandler(evt);
      this._currentFilter = filterType;
      handler(this._currentFilter);
    };
  }


  /**
   * Метод, обеспечивающий добавление/удаления активного класса с пункта меню
   * @param {Object} evt событие
   */
  _setActiveClassHandler(evt) {
    [...this.getElement().querySelectorAll(`.${FilterClass.ITEM}`)].map((menuItem) => {
      if (menuItem === evt.target) {
        menuItem.classList.add(`${FilterClass.ITEM_ACTIVE}`);
      } else {
        menuItem.classList.remove(`${FilterClass.ITEM_ACTIVE}`);
      }
    });
  }
}


export {Menu, filterCountMenu};
