import {FilterType, FilmAttribute, Flag, SortMethod} from '../consts';
import {filterRules, sortRules} from '../utils/components';
import {sortingArray} from '../utils/common';


/**
 * Создание класса модели данных фильмов
 */
class FilmsModel {
  constructor() {
    this._filmsData = [];
    this._activeFilter = FilterType.ALL;
  }


  /**
   * Метод, обеспечивающий присвоение данным модели текущего значения данных фильмов
   * @param {Array} filmsData
   */
  setFilmsData(filmsData) {
    this._filmsData = filmsData;
  }


  /**
   * Метод, обспечивающий присвоение фильтру текущего значения
   * @param {string} filterType примененный фильтр
   */
  setFilter(filterType) {
    this._activeFilter = filterType;
  }


  /**
   * Метод, обеспечивающий получение значения фильтра
   * @return {string} фильтр
   */
  getFilter() {
    return this._activeFilter;
  }


  /**
   * Метод, обеспечивающий получение полных данных фильмов
   * @return {Array} отсортированные данные
   */
  getFilmsData() {
    return this._filmsData;
  }


  /**
   * Метод, обеспечивающий получение отсортированных по рейтингу данных фильмов
   * @return {Array} отсортированные данные
   */
  getSortedFilmsDataByRating() {
    return sortingArray(this._filmsData, SortMethod.BY_RATING);
  }


  /**
   * Метод, обеспечивающий получение отсортированных по количеству комментариев данных фильмов
   * @return {Array}
   */
  getSortedFilmsDataByComments() {
    return sortingArray(this._filmsData, SortMethod.BY_COMMENTS);
  }


  /**
   * Метод, обеспечивающий получение отсортированных по количеству комментариев данных фильмов
   * @param {string} sortType примененный тип сортировки
   * @return {Array}
   */
  getSortedFilmsData(sortType) {
    return sortRules[sortType](this._filmsData);
  }


  /**
   * Метод, обеспечивабщий подсчет фильмов в запланированном к просмотру
   * @return {Number} количество фильмов
   */
  getWatchlistFilms() {
    return this._filmsData.reduce((count, film) => (film[FilmAttribute.IS_WATCH] ? ++count : count), 0);
  }


  /**
   * Метод, обеспечивабщий подсчет фильмов в просмотренном
   * @return {Number} количество фильмов
   */
  getWatchedFilms() {
    return this._filmsData.reduce((count, film) => (film[FilmAttribute.IS_WATCHED] ? ++count : count), 0);
  }


  /**
   * Метод, обеспечивабщий подсчет фильмов в избранном
   * @return {Number} количество фильмов
   */
  getFavoriteFilms() {
    return this._filmsData.reduce((count, film) => (film[FilmAttribute.IS_FAVORITE] ? ++count : count), 0);
  }


  /**
   * Метод, обеспечивающий получение отфильтрованных данных фильмов
   * @param {string} sortType применная сортировка
   * @param {string} filterType примененный фильтр
   * @return {Array} отфильтрованный массив данных
   */
  getFilteringFilmsData(sortType, filterType = this._activeFilter) {
    return sortRules[sortType](filterRules[filterType](this._filmsData));
  }


  /**
   * Метод, обеспечивающий обновление данных фильма в исходных данных
   * @param {Number} id идентификатор элемента в массиве данных фильмов
   * @param {Object} newFilmData обновленные данные фильма
   * @return {Object}
   */
  updateFilmData(id, newFilmData) {
    const index = this._filmsData.findIndex((filmData) => filmData.id === id);

    if (index === -1) {
      return Flag.NO;
    }

    this._updateFilmsData(index, newFilmData);

    return newFilmData;
  }


  /**
   * Метод, обеспечивающий запись новых данных в массив данных
   * @param {Number} index индекс элемента в массиве данных фильмов
   * @param {Object} newFilmData обновленные данные фильма
   */
  _updateFilmsData(index, newFilmData) {
    const newFilmsData = this._filmsData.slice();
    newFilmsData[index] = newFilmData;
    this._filmsData = newFilmsData;
  }
}


export {FilmsModel};
