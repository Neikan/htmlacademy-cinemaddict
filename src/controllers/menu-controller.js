import {Menu} from "../components/menu";
import {Position, Attribute, ATTRIBUTES} from "../consts";
import {render, replace} from "../utils/components";
import {FilterType} from "../consts";


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
 * Создание класса контроллера меню
 */
class MenuController {
  constructor(container, filmModel) {
    this._container = container;
    this._filmModel = filmModel;

    this._activeMenuItem = filmModel._activeMenuItem;
    this._menu = null;
  }


  /**
   * Метод, обеспечивабщий отрисовку меню
   */
  render() {
    const oldMenu = this._menu;

    // this._menu = new Menu(this._getFilters(this._filmModel.getFilmsData()), this._activeMenuItem);
    this._menu = new Menu(this._getFiltersTwo(), this._activeMenuItem);


    this._replace(this._container, oldMenu);
  }


  /**
   * Метод, обеспечивающий сопоставление всех пунктов меню с количеством соответствующих фильмов
   * @param {Object} filmsData
   * @return {Object}
   */
  _getFilters(filmsData) {
    return Object.values(FilterType).map(this._getFilter(filmsData));
  }


  /**
   * Метод, обеспечивающий сопоставление пункта меню с количеством соответствующих фильмов
   * @param {Object} filmsData
   * @return {Object}
   */
  _getFilter() {
    return (filterType) => {
      return {
        name: filterType,
        count: this._filmModel.getFilteringFilmsData(filterType).length
      };
    };
  }


  /**
   * Получение количества элементов, соответствующих параметру фильтрации
   * @param {Array} films список фильмов
   * @param {string} param параметр фильтрации
   * @return {Number} количество соответствующих элементов
   */
  _filterCountMenu(films, param) {
    return films.reduce(this._getCount(param), 0);
  }


  /**
   * Проверка элемента и изменение счетчика по ее результатам
   * @param {string} param параметр проверки
   * @return {Number} значение счетчика
   */
  _getCount(param) {
    return (count, film) => (film[param] ? ++count : count);
  }


  /**
   * Метод, обеспечивающий получение количества фильмов, соответствующих фильтрам
   * @return {Array} созданный массив со значениями количества
   */
  _getFiltersTwo() {
    return ATTRIBUTES.map((attribute) => this._filterCountMenu(this._filmModel.getFilmsData(), attribute));
  }


  /**
   * Метод, обеспечивающий обновление меню
   * @param {Object} container
   * @param {Object} oldMenu
   */
  _replace(container, oldMenu) {
    if (!oldMenu) {
      render[Position.AFTER_BEGIN](container, this._menu);
    } else {
      replace(this._menu, oldMenu);
    }
  }
}


export {MenuController};
