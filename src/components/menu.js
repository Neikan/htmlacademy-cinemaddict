import AbstractComponent from "./abstract/component";
import {FilterType, MenuElement, Flag, StatsElement} from "../consts";


/**
 * Создание разметки блока главного меню
 * @param {Object} menuItemsData данные пунктов меню
 * @return {string} разметка блока
 */
const createMenu = (menuItemsData) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createMenuItem(menuItemsData.ALL)}
        ${createMenuItem(menuItemsData.WATCHLIST)}
        ${createMenuItem(menuItemsData.HISTORY)}
        ${createMenuItem(menuItemsData.FAVORITES)}
      </div>
      <a href="#stats" data-item-id="${menuItemsData.STATS.name}" class="main-navigation__additional">${menuItemsData.STATS.name}</a>
    </nav>`
  );
};


/**
 * Создание разметки пункта меню
 * @param {string} {данные пункта меню}
 * @return {string} разметка пункта
 */
const createMenuItem = ({name, isActive, count}) => {
  return (
    `<a href="#favorites" data-item-id="${name}"
      class="main-navigation__item${getClassMarkup(isActive)}"
      >${name} ${getSpanMarkup(name, count)}</a>`
  );
};


/**
 * Создание разметки дополнительного активного класса
 * @param {string} isActive флаг, определяющий применен или нет фильтр
 * @return {string} разметка класса
 */
const getClassMarkup = (isActive) => isActive ? ` ` + MenuElement.ITEM_ACTIVE : ``;


/**
 * Создание разметки с количеством фильмов, соответствующих фильтру
 * @param {string} name фильтр
 * @param {Number} count количество фильмов, соответствующих фильтру
 * @return {string} разметка элемента
 */
const getSpanMarkup = (name, count) => {
  return name !== FilterType.ALL ?
    `<span class="main-navigation__item-count">${count}</span>` :
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

    this._clickMenuItemHandler = this._clickMenuItemHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createMenu(this._getMenuItemsData());
  }


  /**
   * Метод, обеспечивающий добавление слушателей на изменение текущего фильтра
   * @param {Function} handler помощник
   */
  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this._clickMenuItemHandler(handler));
  }


  /**
   * Метод, обеспечивающий получение пункта статистики
   * @return {Object}
   */
  _getMenuStats() {
    return this.getElement().querySelector(`.${MenuElement.ITEM_STATS}`);
  }


  /**
   * Метод, выполняющий получение агрегированных данных для пунктов меню
   * @return {Object} данные пунктов меню
   */
  _getMenuItemsData() {
    return {
      ALL: {
        name: FilterType.ALL,
        isActive: this._getIsActiveFilter(FilterType.ALL)
      },
      WATCHLIST: {
        name: FilterType.WATCHLIST,
        isActive: this._getIsActiveFilter(FilterType.WATCHLIST),
        count: this._countsFilmsByFilters.WATCHLIST
      },
      HISTORY: {
        name: FilterType.HISTORY,
        isActive: this._getIsActiveFilter(FilterType.HISTORY),
        count: this._countsFilmsByFilters.HISTORY
      },
      FAVORITES: {
        name: FilterType.FAVORITES,
        isActive: this._getIsActiveFilter(FilterType.FAVORITES),
        count: this._countsFilmsByFilters.FAVORITES
      },
      STATS: {
        name: StatsElement.NAME,
        isActive: this._getIsActiveFilter(StatsElement.NAME)
      }
    };
  }


  /**
   * Метод, выполняющий проверку применен фильтр или нет
   * @param {string} filterType фильтр
   * @return {Boolean} признак активности фильтра
   */
  _getIsActiveFilter(filterType) {
    return this._filterType === filterType ? Flag.YES : Flag.NO;
  }


  /**
   * Метод, обеспечиващий создание помощника для установки активного фильтра и получения его значения
   * @param {Function} handler помощник
   * @return {Function} созданный помощник
   */
  _clickMenuItemHandler(handler) {
    return (evt) => {
      const target = evt.target.closest(MenuElement.DATA_ID);

      if (evt.target.tagName !== `A`) {
        return;
      }

      this._setActiveClassHandler(evt);
      this._filterType = target.dataset.itemId;
      handler(this._filterType);
    };
  }


  /**
   * Метод, обеспечивающий добавление/удаления активного класса с пункта меню
   * @param {Object} evt событие
   */
  _setActiveClassHandler(evt) {
    [...this.getElement().querySelectorAll(`.${MenuElement.ITEM}`)]
      .concat(this._getMenuStats())
      .map((menuItem) => {
        if (menuItem === evt.target.closest(MenuElement.DATA_ID)) {
          menuItem.classList.add(`${MenuElement.ITEM_ACTIVE}`);
        } else {
          menuItem.classList.remove(`${MenuElement.ITEM_ACTIVE}`);
        }
      });
  }
}
