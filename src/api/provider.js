import FilmData from "../models/film";
import {Flag} from "../consts";


const getSyncedFilmsData = (filmsData) => filmsData
  .filter(({success}) => success)
  .map(({payload}) => payload.filmData);


const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};


/**
 * Провайдер для API
 */
export default class Provider {
  constructor(api, storeFilmsData, storeCommentsData) {
    this._api = api;
    this._storeFilmsData = storeFilmsData;
    this._storeCommentsData = storeCommentsData;
    this._isSynchronized = Flag.YES;
  }


  /**
   * Метод, обеспечивающий установку значения результату выполнения синхронизации
   * @param {Boolean} value значение
   */
  setIsSynchronized(value) {
    this._isSynchronized = value;
  }


  /**
   * Метод, обеспечиваюший получение значения результата выполнения синхронизации
   * @return {Boolean}
   */
  getIsSynchronized() {
    return this._isSynchronized;
  }


  /**
   * Метод, обеспечивающий получение данных фильмов
   * @return {Array} полученные данные
   */
  getFilmsData() {
    if (this._getIsOnLine()) {
      return this._api.getFilmsData()
        .then((filmsData) => {
          // filmsData.map((filmData) => {
          //   this._storeFilmsData.setDataItem(filmData.id, filmData.toRaw());
          // });

          const items = createStoreStructure(filmsData.map((filmData) => filmData.toRaw()));
          this._storeFilmsData.setAllData(items);

          return filmsData;
        });
    }

    this.setIsSynchronized(Flag.NO);

    return Promise.resolve(FilmData.parseFilms(Object.values(this._storeFilmsData.getAllData())));
  }


  /**
   * Метод, обеспечивающий получение данных комментариев
   * @param {Number} filmDataId идентификатор фильма
   * @return {Object} полученные данные
   */
  getCommentsData(filmDataId) {
    if (this._getIsOnLine()) {
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
   * Метод, обеспечивающий получение сетевого статуса браузера
   * @return {Boolean} значение
   */
  _getIsOnLine() {
    return window.navigator.onLine;
  }


  /**
   * Метод, обеспечивающий отправку данных комментария
   * @param {Number} filmDataId идентификатор фильма
   * @param {Object} commentData данные комментария
   * @return {Object}
   */
  sendCommentData(filmDataId, commentData) {
    if (this._getIsOnLine()) {
      return this._api.sendCommentData(filmDataId, commentData)
        .then((commentsData) => {
          this._storeFilmsData.setCommentsData(filmDataId, commentsData, Flag.YES);
          this._storeCommentsData.setCommentsData(filmDataId, commentsData);

          return commentsData;
        });
    }

    this.setIsSynchronized(Flag.NO);

    const newComment = commentData;
    const commentsData = this._storeCommentsData.getAllData()[filmDataId];
    commentsData.push(newComment);

    this._storeFilmsData.setCommentsData(filmDataId, commentsData, Flag.YES);
    this._storeCommentsData.setCommentsData(filmDataId, commentsData);

    return Promise.resolve(FilmData.parseFilm(this._storeFilmsData.getAllData()[filmDataId]));
  }


  /**
   * Метод, обеспечивающий удаление комментария
   * @param {Number} commentDataId идентификатор комментария
   * @param {Number} filmDataId идентификатор фильма
   * @return {Object}
   */
  deleteCommentData(commentDataId, filmDataId) {
    if (this._getIsOnLine()) {
      return this._api.deleteCommentData(commentDataId)
        .then(() => {
          this._storeFilmsData.removeCommentData(filmDataId, commentDataId, Flag.YES);
          this._storeCommentsData.removeCommentData(filmDataId, commentDataId);
        });
    }

    // this.setIsSynchronized(Flag.NO);

    // this._storeCommentsData.removeCommentData(filmDataId, commentDataId);
    // this._storeFilmsData.removeCommentData(filmDataId, commentDataId, Flag.YES);

    return Promise.resolve();
  }


  /**
   * Метод, обеспечивающий обновление данных фильма
   * @param {Number} filmDataId идентификатор фильма
   * @param {Object} filmData данные фильма
   * @return {Object} обновленные данные
   */
  updateFilmData(filmDataId, filmData) {
    if (this._getIsOnLine()) {
      return this._api.updateFilmData(filmDataId, filmData)
        .then((newFilmData) => {
          this._storeFilmsData.setDataItem(newFilmData.id, newFilmData.toRaw());

          return newFilmData;
        });
    }

    this.setIsSynchronized(Flag.NO);

    this._storeFilmsData.setDataItem(filmDataId, filmData.toRaw());

    return Promise.resolve(filmData);
  }


  /**
   * Метод, обеспечивающий выполнение синхронизации данных хранилища и сервера
   * @return {Object}
   */
  sync() {
    if (this._getIsOnLine()) {
      const storeFilmsData = Object.values(this._storeFilmsData.getAllData());

      return this._api.sss(storeFilmsData)
        .then((response) => {
          // storeFilmsData
          //   .filter((storeFilmData) => storeFilmData.offline)
          //   .map((storeFilmData) => this._storeFilmsData.removeDataItem(storeFilmData.id));

          this._storeFilmsData.setAllData(
              [...getSyncedFilmsData(response.updated)]
          );

          this.setIsSynchronized(Flag.YES);

          // return Promise.resolve();
        });
    }

    return Promise.reject(
        new Error(`Sync data failed`)
    );
  }
}
