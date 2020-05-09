import {FilterType, FilmAttribute, Flag, SortType, CountFilm} from '../consts';
import {filterRules, sortRules} from '../utils/components';
import {getIndex} from '../utils/common';


/**
 * Создание класса модели данных фильмов
 */
export default class FilmsModel {
  constructor() {
    this._filmsData = [];
    this._filterType = FilterType.ALL;
    this._sortType = SortType.DEFAULT;
  }


  /**
   * Метод, обеспечивающий присвоение данным модели действительных значений данных фильмов
   * @param {Array} filmsData
   */
  setFilmsData(filmsData) {
    this._filmsData = filmsData;
  }


  /**
   * Метод, обспечивающий присвоение фильтру примененного значения
   * @param {string} filterType примененный фильтр
   */
  setFilterType(filterType) {
    this._filterType = filterType;
  }


  /**
   * Метод, обспечивающий присвоение сортировке примененного значения
   * @param {string} sortType примененный тип сортировки
   */
  setSortType(sortType) {
    this._sortType = sortType;
  }


  /**
   * Метод, обеспечивающий получение полных данных фильмов
   * @return {Array} отсортированные данные
   */
  getFilmsData() {
    return this._filmsData;
  }


  /**
   * Метод, обеспечивающий получение значения фильтра
   * @return {string} фильтр
   */
  getFilterType() {
    return this._filterType;
  }


  /**
   * Метод, обеспечивающий получение значения сортировки
   * @return {string} тип сортировки
   */
  getSortType() {
    return this._sortType;
  }


  /**
   * Метод, обеспечивающий получение отсортированных по рейтингу данных фильмов
   * @return {Array} отсортированные данные
   */
  getSortedFilmsDataByRating() {
    return sortRules[SortType.BY_RATING](this.getRatedFilmsData()).slice(0, CountFilm.EXTRA);
  }


  /**
   * Метод, обеспечивающий получение отсортированных по количеству комментариев данных фильмов
   * @return {Array} отсортированные данные
   */
  getSortedFilmsDataByComments() {
    return sortRules[SortType.BY_COMMENTS](this.getCommentedFilmsData()).slice(0, CountFilm.EXTRA);
  }


  /**
   * Метод, обеспечивающий получение количества фильмов, соответствующих фильтрам
   * @return {Object}
   */
  getCountsFilmsByFilters() {
    const getCount = (param) => (count, film) => film[param] ? ++count : count;

    return {
      WATCHLIST: this._filmsData.reduce(getCount(FilmAttribute.IS_WATCH), 0),
      HISTORY: this._filmsData.reduce(getCount(FilmAttribute.IS_WATCHED), 0),
      FAVORITES: this._filmsData.reduce(getCount(FilmAttribute.IS_FAVORITE), 0)
    };
  }


  /**
   * Метод, обеспечивающий получение отфильтрованных данных фильмов
   * @return {Array} отфильтрованный массив данных
   */
  getFilteredFilmsData() {
    return sortRules[this._sortType](filterRules[this._filterType](this._filmsData));
  }


  /**
   * Метод, выполняющий проверку наличия фильмов с рейтигом среди данных
   * @return {Boolean} результат проверки
   */
  getRatedFilmsData() {
    return filterRules[FilterType.RATED](this._filmsData);
  }


  /**
   * Метод, выполняющий проверку наличия фильмов с рейтигом среди данных
   * @return {Boolean} результат проверки
   */
  getCommentedFilmsData() {
    return filterRules[FilterType.COMMENTED](this._filmsData);
  }


  /**
   * Метод, обеспечивающий получение данных для компонента-контейнера статистики
   * @param {string} period выбранный период
   * @return {Object} данные для статистики по просомтренным фильмам
   */
  getFilmsDataForStats(period) {
    const filmsWatchedData = this._getWatchedFilmsDataByTime(period);

    return {
      count: filmsWatchedData.length,
      duration: this._getDurationWatchedFilms(filmsWatchedData),
      topGenre: this._getTopGenre(filmsWatchedData)
    };
  }


  /**
   * Метод, выполняющий получение фильмов, просмотренных за период
   * @param {string} period выбранный период
   * @return {Array} данные фильмов, соответствующие периоду
   */
  _getWatchedFilmsDataByTime(period) {
    return period ?
      filterRules[FilterType.HISTORY_BY_TIME](this._filmsData, period) :
      filterRules[FilterType.HISTORY](this._filmsData);
  }


  /**
   * Метод, обеспечивающий получение длительности в минутах просмотренных за период фильмов
   * @param {Array} filmsWatchedData данные фильмов, соответствующие периоду
   * @return {Number} длительность просмотренных за период фильмов
   */
  _getDurationWatchedFilms(filmsWatchedData) {
    return filmsWatchedData.reduce((result, filmData) => {
      return result + filmData.details.duration.info;
    }, 0);
  }


  /**
   * Метод, выполняющий получение всех жанров просмотренных за период фильмов
   * @param {Array} filmsWatchedData данные фильмов, соответствующие периоду
   * @return {Array} жанры, соответствующие периоду
   */
  _getFilmsGenres(filmsWatchedData) {
    const uniqueGenres = [];

    const getGenres = () => {
      filmsWatchedData.map((film) => {
        film.details.genres.map((genre) => {
          if (!uniqueGenres.includes(genre)) {
            uniqueGenres.push(genre);
          }
        });
      });
    };
    getGenres();

    return uniqueGenres;
  }


  /**
   * Метод обеспечивающий получение самого популярного жанра среди просмотренных за период фильмов
   * @param {Array} filmsWatchedData данные фильмов, соответствующие периоду
   * @return {string} название жанра
   */
  _getTopGenre(filmsWatchedData) {
    const countGenres = this._getFilmsGenres(filmsWatchedData).map((genre) => {
      return {
        [`name`]: genre,
        [`count`]: filterRules[FilterType.GENRES](filmsWatchedData, genre)
      };
    });

    return sortRules[SortType.BY_GENRES](countGenres).slice(0, 1)[0].name;
  }


  /**
   * Метод, обеспечивающий обновление данных фильма в исходных данных
   * @param {Number} id идентификатор элемента в массиве данных фильмов
   * @param {Object} newFilmData обновленные данные фильма
   * @return {Object}
   */
  updateFilmData(id, newFilmData) {
    const index = getIndex(this._filmsData, id);

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
