import FilmData from "../models/film";
import {Flag} from "../consts";


/**
 * Проверка сетевого статуса браузера
 * @return {Boolean} результат
 */
const checkIsOnline = () => {
  return window.navigator.onLine;
};


/**
 * Провайдер для API
 */
export default class Provider {
  constructor(api, storeFilmsData, storeCommentsData) {
    this._api = api;
    this._storeFilmsData = storeFilmsData;
    this._storeCommentsData = storeCommentsData;
  }


  /**
   * Метод, обеспечивающий получение данных фильмов
   * @return {Array} полученные данные
   */
  getFilmsData() {
    if (checkIsOnline()) {
      return this._api.getFilmsData()
        .then((filmsData) => {
          filmsData.map((filmData) => {
            this._storeFilmsData.setDataItem(filmData.id, filmData.toRaw());
          });
          return filmsData;
        });
    }

    return Promise.resolve(FilmData.parseFilms(
        Object.values(this._storeFilmsData.getAllData())
    ));
  }


  /**
   * Метод, обеспечивающий получение данных комментариев
   * @param {Number} filmDataId идентификатор фильма
   * @return {Object} полученные данные
   */
  getCommentsData(filmDataId) {
    if (checkIsOnline()) {
      return this._api.getCommentsData(filmDataId)
        .then((commentsData) => {
          commentsData.map((commentData) => {
            this._storeCommentsData.setDataItem(commentData.id, commentData.toRaw());
          });
          return commentsData;
        });
    }

    return Promise.resolve();
  }


  /**
   * Метод, обеспечивающий отправку данных комментария
   * @param {Number} filmDataId идентификатор фильма
   * @param {Object} commentData данные комментария
   * @return {Object}
   */
  sendCommentData(filmDataId, commentData) {
    if (checkIsOnline()) {
      return this._api.sendCommentData(filmDataId, commentData)
        .then((commentsData) => {
          this._storeFilmsData.setCommentsData(filmDataId, commentsData, Flag.YES);
          this._storeCommentsData.setCommentsData(filmDataId, commentsData);

          return commentsData;
        });
    }

    return Promise.resolve();
  }


  /**
   * Метод, обеспечивающий удаление комментария
   * @param {Number} commentDataId идентификатор комментария
   * @param {Number} filmDataId идентификатор фильма
   * @return {Object}
   */
  deleteCommentData(commentDataId, filmDataId) {
    if (checkIsOnline()) {
      return this._api.deleteCommentData(commentDataId)
        .then(() => {
          this._storeFilmsData.removeCommentData(filmDataId, commentDataId, Flag.YES);
          this._storeCommentsData.removeCommentData(filmDataId, commentDataId);
        });
    }

    return Promise.resolve();
  }


  /**
   * Метод, обеспечивающий обновление данных фильма
   * @param {Number} filmDataId идентификатор фильма
   * @param {Object} filmData данные фильма
   * @return {Object} обновленные данные
   */
  updateFilmData(filmDataId, filmData) {
    if (checkIsOnline()) {
      return this._api.updateFilmData(filmDataId, filmData)
        .then((newFilmData) => {
          this._storeFilmsData.setDataItem(newFilmData.id, newFilmData.toRaw());
          return newFilmData;
        });
    }

    return Promise.resolve(FilmData.parseFilm(
        Object.assign({}, filmData.toRaw())
    ));
  }
}
