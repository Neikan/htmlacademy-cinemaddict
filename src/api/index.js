import FilmData from "../models/film";
import CommentData from "../models/comment";

const RequestStatusCode = {
  OK: 200,
  MULTIPLE: 300,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};


const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const Url = {
  FILMS: `movies`,
  COMMENTS: `comments`
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
   * Метод, обеспечивающий обновление данных фильма
   * @param {Number} filmDataId идентификатор фильма
   * @param {Object} filmData данные фильма
   * @return {Object}
   */
  updateFilmData(filmDataId, filmData) {
    return this._load({
      url: `${Url.FILMS}/${filmDataId}`,
      method: Method.PUT,
      body: JSON.stringify(filmData.toRaw()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(FilmData.parseFilm);
  }


  /**
   * Метод, обеспечиваюший подключение для получения/отправки данных
   * @param {Object} параметры подключения
   * @return {Object}
   */
  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};


export default API;
