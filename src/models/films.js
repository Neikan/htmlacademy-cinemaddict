import {FilterType, FilmAttribute, Flag, SortType,
  CountFilm, RankDescription, NOT_DATA
} from '../consts';
import {filterRules, sortRules} from '../utils/components';
import {getIndex} from '../utils/common';


/**
 * Модель данных фильмов
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
   * Метод, выполняющий проверку наличия комментируемых фильмов среди данных
   * @return {Boolean} результат проверки
   */
  getCommentedFilmsData() {
    return filterRules[FilterType.COMMENTED](this._filmsData);
  }


  /**
   * Метод, обеспечивающий получение данных для компонента-контейнера статистики
   * @param {string} period период статистики
   * @return {Object} данные для статистики по просмотренным фильмам
   */
  getFilmsDataForStats(period) {
    const filmsWatchedData = this.getWatchedFilmsDataByPeriod(period);

    if (filmsWatchedData.length) {
      return this._getRealStats(filmsWatchedData);
    } else {
      return this._getZeroStats();
    }
  }


  /**
   * Метод обеспечивающий получение жанров с количеством им соответствующих просмотренных фильмов
   * @param {Array} filmsWatchedData данные фильмов, соответствующие периоду
   * @return {Array} жанры и количество фильмов им соответствующих
   */
  getCountWatchedFilmsByGenre(filmsWatchedData) {
    const countGenres = this._getWatchedFilmsGenres(filmsWatchedData).map((genre) => {
      return {
        [`name`]: genre,
        [`count`]: filterRules[FilterType.GENRES](filmsWatchedData, genre)
      };
    });

    return sortRules[SortType.BY_GENRES](countGenres);
  }


  /**
   * Метод, обеспечивающий получение ранга профиля пользователя
   * @param {Number} countWatchedFilms количество просмотренных фильмов
   * @return {string} ранг профиля пользователя
   */
  getRankDescription(countWatchedFilms) {
    if (countWatchedFilms >= RankDescription.MOVIE_BUFF.from) {
      return RankDescription.MOVIE_BUFF.rank;
    } else if (countWatchedFilms >= RankDescription.FUN.from) {
      return RankDescription.FUN.rank;
    } else if (countWatchedFilms >= RankDescription.NOVICE.from) {
      return RankDescription.NOVICE.rank;
    } else {
      return (``);
    }
  }


  /**
   * Метод, выполняющий получение фильмов, просмотренных за период
   * @param {string} period период статистики
   * @return {Array} данные фильмов, соответствующие периоду
   */
  getWatchedFilmsDataByPeriod(period) {
    return period !== 0 ?
      filterRules[FilterType.HISTORY_BY_TIME](this._filmsData, period) :
      filterRules[FilterType.HISTORY](this._filmsData);
  }


  /**
   * Метод, обеспечивающий получение данных для компонента-контейнера статистики в случае, если просмотренные за период фильмы присутствуют
   * @param {Array} filmsWatchedData данные фильмов, соответствующие периоду
   * @return {Object} данные для статистики по просмотренным фильмам
   */
  _getRealStats(filmsWatchedData) {
    return {
      rank: this.getRankDescription(filmsWatchedData.length),
      count: filmsWatchedData.length,
      duration: this._getDurationWatchedFilms(filmsWatchedData),
      topGenre: this._getTopGenre(filmsWatchedData)
    };
  }


  /**
   * Метод, обеспечивающий получение данных для компонента-контейнера статистики в случае, если просмотренные за период фильмы отсутствуют
   * @return {Object} данные для статистики по просмотренным фильмам
   */
  _getZeroStats() {
    return {
      rank: this.getRankDescription(0),
      count: 0,
      duration: 0,
      topGenre: NOT_DATA
    };
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
  _getWatchedFilmsGenres(filmsWatchedData) {
    const uniqueGenres = [];

    this._fillArrayGenresByWatchedFilms(filmsWatchedData, uniqueGenres);

    return uniqueGenres;
  }


  /**
   * Метод обеспечивающий получение самого популярного жанра среди просмотренных за период фильмов
   * @param {Array} filmsWatchedData данные фильмов, соответствующие периоду
   * @return {string} название жанра
   */
  _getTopGenre(filmsWatchedData) {
    return this.getCountWatchedFilmsByGenre(filmsWatchedData).slice(0, 1)[0].name;
  }


  /**
   * Метод, обеспечивающий обновление данных фильма в исходных данных
   * @param {Number} oldData прежние данные фильма
   * @param {Object} newData обновленные данные фильма
   * @return {Object} обновленные данные фильма
  */
  updateFilmData(oldData, newData) {
    const index = getIndex(this._filmsData, oldData.id);

    if (index === -1) {
      return Flag.NO;
    }

    this._updateFilmsData(index, newData);

    return newData;
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


  /**
   * Метод, выполняющий формирование списка жанров просмотренных за период фильмов
   * @param {Array} filmsWatchedData данные фильмов, соответствующие периоду
   * @param {Array} uniqueGenres перечень жанров
   */
  _fillArrayGenresByWatchedFilms(filmsWatchedData, uniqueGenres) {
    filmsWatchedData.map((film) => {
      film.details.genres.map((genre) => {
        if (!uniqueGenres.includes(genre)) {
          uniqueGenres.push(genre);
        }
      });
    });
  }
}
