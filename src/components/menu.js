import {AbstractComponent} from "./abstract/component";
import {FilterType} from "../consts";


const FilterClass = {
  ITEM: `main-navigation__item`,
  ITEM_ACTIVE: `main-navigation__item--active`
};

/**
 * Создание разметки блока главного меню
 * @param {Number} watchlistCount количество фильмов в запланированном к просмотру
 * @param {Number} watchedCount количество фильмов в просмотренном
 * @param {Number} favoriteCount количество фильмов в избранном
 * @param {string} currentFilter
 * @return {string} разметка блока
 */
const createMenu = (watchlistCount, watchedCount, favoriteCount, currentFilter) => {
  const classMarkup = {
    ALL: currentFilter === FilterType.ALL ? ` ` + FilterClass.ITEM_ACTIVE : ``,
    WATCHLIST: currentFilter === FilterType.WATCHLIST ? ` ` + FilterClass.ITEM_ACTIVE : ``,
    HISTORY: currentFilter === FilterType.HISTORY ? ` ` + FilterClass.ITEM_ACTIVE : ``,
    FAVORITES: currentFilter === FilterType.FAVORITES ? ` ` + FilterClass.ITEM_ACTIVE : ``
  };

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" data-filter-type="${FilterType.ALL}" class="main-navigation__item${classMarkup.ALL}">All movies</a>
        <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item${classMarkup.WATCHLIST}">Watchlist
          <span class="main-navigation__item-count">${watchlistCount}</span>
        </a>
        <a href="#history" data-filter-type="${FilterType.HISTORY}" class="main-navigation__item${classMarkup.HISTORY}">History
          <span class="main-navigation__item-count">${watchedCount}</span>
        </a>
        <a href="#favorites" data-filter-type="${FilterType.FAVORITES}" class="main-navigation__item${classMarkup.FAVORITES}">Favorites
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
class Menu extends AbstractComponent {
  constructor(watchlistCount, watchedCount, favoriteCount, filterType) {
    super();

    this._watchlistCount = watchlistCount;
    this._watchedCount = watchedCount;
    this._favoriteCount = favoriteCount;
    this._filterType = filterType;

    this._clickHandler = this._clickHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createMenu(this._watchlistCount, this._watchedCount,
        this._favoriteCount, this._filterType);
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

      this._setActiveClassHandler(evt);
      this._filterType = evt.target.dataset.filterType;
      handler(this._filterType);
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


export {Menu};
