import FilmData from "../models/film";
import {Flag} from "../consts";


const Message = {
  FAIL_SYNC: `Sync data failed`,
  NOT_IMPLEMENTED: `Logic for offline mode is not implemented`
};


/**
 * Получение синхронизированных данных
 * @param {Object} filmsData
 * @return {Array}
 */
const getSyncedFilmsData = (filmsData) => filmsData
  .filter(({success}) => success)
  .map(({payload}) => payload.filmData);


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
   * Метод, обеспечивающий получение сетевого статуса браузера
   * @return {Boolean} значение
   */
  _getIsOnLine() {
    return window.navigator.onLine;
  }


  /**
   * Метод, обеспечивающий получение фильма для синхронизации
   * @param {Object} filmData данные фильма
   * @return {Object}
   */
  _getFilmDataForSync(filmData) {
    return this._storeFilmsData.setDataItem(
        filmData.id,
        Object.assign(
            {},
            FilmData.parseFilm(
                Object.assign(
                    {},
                    filmData.toRaw())).toRaw(),
            {offline: Flag.YES}
        )
    );
  }


  /**
   * Метод, обеспечивающий получение данных фильмов
   * @return {Array} полученные данные
   */
  getFilmsData() {
    if (this._getIsOnLine()) {
      return this._api.getFilmsData()
        .then((filmsData) => {
          filmsData.map((filmData) => {
            this._storeFilmsData.setDataItem(filmData.id, filmData.toRaw());
          });

          return filmsData;
        });
    }

    this.setIsSynchronized(Flag.NO);

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

    return Promise.reject(
        new Error(Message.NOT_IMPLEMENTED)
    );
  }


  /**
   * Метод, обеспечивающий удаление комментария
   * @param {Number} commentDataId идентификатор комментария
   * @param {Number} filmData данные фильма
   * @return {Object}
   */
  deleteCommentData(commentDataId, filmData) {
    if (this._getIsOnLine()) {
      return this._api.deleteCommentData(commentDataId)
        .then(() => {
          this._removeCommentDataFromStore(filmData, commentDataId);
        });
    }

    return Promise.reject(
        new Error(Message.NOT_IMPLEMENTED)
    );
  }


  /**
   * Метод, обеспечивающий обновление данных фильма
   * @param {Object} filmData данные фильма
   * @return {Object} обновленные данные
   */
  updateFilmData(filmData) {
    if (this._getIsOnLine()) {
      return this._api.updateFilmData(filmData)
        .then((newFilmData) => {
          this._storeFilmsData.setDataItem(newFilmData.id, newFilmData.toRaw());

          return newFilmData;
        });
    }

    this.setIsSynchronized(Flag.NO);

    return Promise.resolve(this._getFilmDataForSync(filmData));
  }


  /**
   * Метод, обеспечивающий выполнение синхронизации данных хранилища и сервера
   * @return {Object}
   */
  sync() {
    if (this._getIsOnLine()) {
      const storeFilmsData = Object.values(this._storeFilmsData.getAllData());

      return this._api.sync(storeFilmsData)
        .then((response) => {
          storeFilmsData
            .filter((storeFilmData) => storeFilmData.offline)
            .map((storeFilmData) => this._storeFilmsData.removeDataItem(storeFilmData.id));

          this._storeFilmsData.setAllData(
              [...getSyncedFilmsData(response.updated)]
          );
          this.setIsSynchronized(Flag.YES);

          return Promise.resolve();
        });
    }

    return Promise.reject(
        new Error(Message.FAIL_SYNC)
    );
  }


  /**
   * Метод, обеспечивающий удаление данных комментария из хранилищ
   * @param {Object} filmData данные фильма
   * @param {Number} commentDataId идентификатор комментария
   */
  _removeCommentDataFromStore(filmData, commentDataId) {
    this._storeCommentsData.removeCommentData(filmData.id, commentDataId);
    this._storeFilmsData.removeCommentData(filmData.id, commentDataId, Flag.YES);
  }
}
