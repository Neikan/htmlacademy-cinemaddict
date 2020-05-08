import AbstractComponent from "./abstract/component";
import {FilterType, MenuElement, STATS_NAME, Flag} from "../consts";


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
 * @param {string} activefilterType примененный фильтр
 * @param {string} menuItemsData фильтр
 * @param {Number} countFilms количество фильмов, соответствующее фильтру
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
    return createMenu(this._getMenuItemsData());
  }


  _getIsActiveFilter(filterType) {
    return this._filterType === filterType ? Flag.YES : Flag.NO;
  }


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
        name: STATS_NAME,
        isActive: this._getIsActiveFilter(STATS_NAME)
      }
    };
  }


  /**
   * Метод, обеспечивающий получение контнейнера с пунктами-фильтрами меню
   * @return {Object}
   */
  getMenuFilters() {
    return this.getElement().querySelector(`.${MenuElement.ITEMS}`);
  }


  /**
   * Метод, обеспечивающий получение пункта статистики
   * @return {Object}
   */
  getMenuStats() {
    return this.getElement().querySelector(`.${MenuElement.ITEM_STATS}`);
  }


  /**
   * Метод, обеспечивающий добавление слушателей на изменение текущего фильтра
   * @param {Function} handler помощник
   */
  setFilterChangeHandler(handler) {
    this.getMenuFilters().addEventListener(`click`, this._clickFilterHandler(handler));
  }


  /**
   * Метод, обеспечивающий отображение статистики
   * @param {Function} handler
   */
  setStatisticsClickHandler(handler) {
    this.getMenuStats().addEventListener(`click`, this._clickStatsHandler(handler));
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
      this._filterType = target.dataset.itemId;
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
