import FilmData from "../models/film";
import CommentData from "../models/comment";


const HEADER_CONTENT_TYPE = {'Content-Type': `application/json`};
const HEADER_AUTHORIZATION = `Authorization`;

const RequestStatusCode = {
  OK: 200,
  MULTIPLE: 300
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const Url = {
  FILMS: `movies`,
  COMMENTS: `comments`,
  SYNC: `movies/sync`
};


/**
 * Проверка статуса ответа от сервера
 * @param {Object} response ответ
 * @return {string}
 */
const checkStatus = (response) => {
  if (response.status >= RequestStatusCode.OK
    && response.status < RequestStatusCode.MULTIPLE) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


const API = class {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }


  /**
   * Метод, обеспечивающий получение данных фильмов
   * @return {Object} полученные данные
   */
  getFilmsData() {
    return this._load({url: `${Url.FILMS}`})
      .then((response) => response.json())
      .then(FilmData.parseFilms);
  }


  /**
   * Метод, обеспечивающий получение данных комментариев
   * @param {Number} filmDataId идентификатор фильма
   * @return {Object} полученные данные
   */
  getCommentsData(filmDataId) {
    return this._load({url: `${Url.COMMENTS}/${filmDataId}`})
      .then((response) => response.json())
      .then(CommentData.parseComments);
  }


  /**
   * Метод, обеспечивающий отправку данных комментария
   * @param {Number} filmDataId идентификатор фильма
   * @param {Object} commentData данные комментария
   * @return {Object} обновленные данные комментариев
   */
  sendCommentData(filmDataId, commentData) {
    return this._load({
      url: `${Url.COMMENTS}/${filmDataId}`,
      method: Method.POST,
      body: JSON.stringify(commentData.toRaw()),
      headers: new Headers(HEADER_CONTENT_TYPE)
    })
      .then((response) => response.json())
      .then((filmData) => CommentData.parseComments(filmData.comments));
  }


  /**
   * Метод, обеспечивающий удаление комментария
   * @param {Number} commentDataId идентификатор комментария
   * @return {Object} результат
   */
  deleteCommentData(commentDataId) {
    return this._load({
      url: `${Url.COMMENTS}/${commentDataId}`,
      method: Method.DELETE});
  }


  /**
   * Метод, обеспечивающий обновление данных фильма
   * @param {Object} filmData данные фильма
   * @return {Object} обновленные данные
   */
  updateFilmData(filmData) {
    return this._load({
      url: `${Url.FILMS}/${filmData.id}`,
      method: Method.PUT,
      body: JSON.stringify(filmData.toRaw()),
      headers: new Headers(HEADER_CONTENT_TYPE)
    })
      .then((response) => response.json())
      .then(FilmData.parseFilm);
  }


  /**
   * Метод, обеспечиваюший подключение для получения/отправки данных
   * @param {Object} параметры подключения
   * @return {Object} результат
   */
  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(HEADER_AUTHORIZATION, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }


  /**
   * Метод, обеспечивающий синхронизацию данных хранилища с сервером
   * @param {Object} storeData данные хранилища
   * @return {Object}
   */
  sync(storeData) {
    return this._load({
      url: Url.SYNC,
      method: Method.POST,
      body: JSON.stringify(storeData),
      headers: new Headers(HEADER_CONTENT_TYPE)
    })
      .then((response) => response.json());
  }
};


export default API;
