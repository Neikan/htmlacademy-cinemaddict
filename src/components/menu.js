import AbstractComponent from "./abstract/component";
import {FilterType, MenuElement} from "../consts";


/**
 * Создание разметки блока главного меню
 * @param {Object} countsFilmsByFilters количества фильмов, соответствующих фильтрам
 * @param {string} activefilterType примененный фильтр
 * @return {string} разметка блока
 */
const createMenu = (countsFilmsByFilters, activefilterType) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createMenuItem(activefilterType, FilterType.ALL)}
        ${createMenuItem(activefilterType, FilterType.WATCHLIST, countsFilmsByFilters.WATCHLIST)}
        ${createMenuItem(activefilterType, FilterType.HISTORY, countsFilmsByFilters.HISTORY)}
        ${createMenuItem(activefilterType, FilterType.FAVORITES, countsFilmsByFilters.FAVORITES)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


/**
 * Создание разметки пункта меню
 * @param {string} activefilterType примененный фильтр
 * @param {string} filterType фильтр
 * @param {Number} countFilms количество фильмов, соответствующее фильтру
 * @return {string} разметка пункта
 */
const createMenuItem = (activefilterType, filterType, countFilms) => {
  return (
    `<a href="#favorites" data-filter-type="${filterType}"
      class="main-navigation__item${getClassMarkup(activefilterType, filterType)}"
      >${filterType} ${getSpanMarkup(filterType, countFilms)}</a>`
  );
};


/**
 * Создание разметки дополнительного активного класса
 * @param {string} activefilterType примененный фильтр
 * @param {string} filterType фильтр
 * @return {string} разметка класса
 */
const getClassMarkup = (activefilterType, filterType) => {
  return activefilterType === filterType ?
    ` ` + MenuElement.ITEM_ACTIVE :
    ``;
};


/**
 * Создание разметки с количеством фильмов, соответствующих фильтру
 * @param {string} filterType фильтр
 * @param {Number} countFilms количество фильмов, соответствующих фильтру
 * @return {string} разметка элемента
 */
const getSpanMarkup = (filterType, countFilms) => {
  return filterType !== FilterType.ALL ?
    `<span class="main-navigation__item-count">${countFilms}</span>` :
    ``;
};


/**
 * Создание класса главного меню
 */
export default class Menu extends AbstractComponent {
  constructor(countsFilmsByFilters, filterType) {
    super();

    this._countsFilmsByFilters = countsFilmsByFilters;
    this._filterType = filterType;

    this._clickFilterHandler = this._clickFilterHandler.bind(this);
    this._clickStatsHandler = this._clickStatsHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createMenu(this._countsFilmsByFilters, this._filterType);
  }


  /**
   * Метод, обеспечивающий получение контнейнера с пунктами-фильтрами меню
   * @return {Object}
   */
  getMenuItems() {
    return this.getElement().querySelector(`.${MenuElement.ITEMS}`);
  }


  /**
   * Метод, обеспечивающий получение пункта статистики
   * @return {Object}
   */
  getMenuItemStats() {
    return this.getElement().querySelector(`.${MenuElement.ITEM_STATS}`);
  }


  /**
   * Метод, обеспечивающий добавление слушателей на изменение текущего фильтра
   * @param {Function} handler помощник
   */
  setFilterChangeHandler(handler) {
    this.getMenuItems().addEventListener(`click`, this._clickFilterHandler(handler));
  }


  /**
   * Метод, обеспечивающий отображение статистики
   * @param {Function} handler
   */
  setStatisticsClickHandler(handler) {
    this.getMenuItemStats().addEventListener(`click`, this._clickStatsHandler(handler));
  }


  /**
   * Метод, обеспечиващий создание помощника для установки активным пункта стастистики
   * @param {Function} handler помощник
   * @return {Function} созданный помощник
   */
  _clickStatsHandler(handler) {
    return (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      if (evt.target) {
        evt.target.classList.add(`${MenuElement.ITEM_ACTIVE}`);
        this._setActiveClassHandler(evt);
      } else {
        evt.target.classList.remove(`${MenuElement.ITEM_ACTIVE}`);
      }

      handler(evt);
    };
  }


  /**
   * Метод, обеспечиващий создание помощника для установки активного фильтра и получения его значения
   * @param {Function} handler помощник
   * @return {Function} созданный помощник
   */
  _clickFilterHandler(handler) {
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
        this._setActiveStatsHandler(menuItem);
      } else {
        menuItem.classList.remove(`${MenuElement.ITEM_ACTIVE}`);
      }
    });
  }


  _setActiveStatsHandler(element) {
    if (element === this.getElement().querySelector(`.${MenuElement.ITEM_STATS}`)) {
      this.getElement().querySelector(`.${MenuElement.ITEM_STATS}`).classList.add(`${MenuElement.ITEM_ACTIVE}`);
    } else {
      this.getElement().querySelector(`.${MenuElement.ITEM_STATS}`).classList.remove(`${MenuElement.ITEM_ACTIVE}`);
    }
  }
}
