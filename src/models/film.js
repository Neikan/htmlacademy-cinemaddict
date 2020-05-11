import {FormatRule} from "../consts";
import {formatDate} from '../utils/common';


const DetailsLabel = {
  DIRECTOR: `Director`,
  SCREENWRITERS: `Writers`,
  ACTORS: `Actors`,
  RELEASE_DATE: `Release Date`,
  DURATION: `Runtime`,
  COUNTRY: `Country`,
};


export default class FilmData {
  constructor(filmData) {
    this.id = filmData[`id`];

    this.promo = {
      poster: filmData[`film_info`][`poster`],
      age: filmData[`film_info`][`age_rating`]
    };

    this.titles = {
      translate: filmData[`film_info`][`title`],
      original: filmData[`film_info`][`alternative_title`]
    };

    this.rating = filmData[`film_info`][`total_rating`];

    this.details = {
      director: {
        name: DetailsLabel.DIRECTOR,
        info: filmData[`film_info`][`director`]
      },
      screenwriters: {
        name: DetailsLabel.SCREENWRITERS,
        info: filmData[`film_info`][`writers`].join(`, `)
      },
      actors: {
        name: DetailsLabel.ACTORS,
        info: Array.from(filmData[`film_info`][`actors`]).join(`, `)
      },
      releaseDate: {
        name: DetailsLabel.RELEASE_DATE,
        info: formatDate(filmData[`film_info`][`release`][`date`], FormatRule.RELEASE_DATE)
      },
      duration: {
        name: DetailsLabel.DURATION,
        info: filmData[`film_info`][`runtime`]
      },
      country: {
        name: DetailsLabel.COUNTRY,
        info: filmData[`film_info`][`release`][`release_country`]
      },
      genres: filmData[`film_info`][`genre`],
      description: filmData[`film_info`][`description`],
      year: formatDate(filmData[`film_info`][`release`][`date`], FormatRule.RELEASE_YEAR)
    };

    this.comments = [];
    this.commentsIds = filmData[`comments`];
    this.isWatch = filmData[`user_details`][`watchlist`];
    this.isWatched = filmData[`user_details`][`already_watched`];
    this.watchedDate = new Date(filmData[`user_details`][`watching_date`]);
    this.isFavorite = filmData[`user_details`][`favorite`];
  }


  /**
   * Метод, обеспечивающий преобразование локальных данных в соответствующие серверу
   * @return {Object} преобразованные данные
   */
  toRaw() {
    return {
      'id': this.id,
      'comments': this.commentsIDs,
      'film_info': {
        'title': this.titles.translate,
        'alternative_title': this.titles.original,
        'total_rating': this.rating,
        'poster': this.promo.poster,
        'age_rating': this.promo.age,
        'director': this.details.director.info,
        'writers': this.details.screenwriters.info,
        'actors': this.details.actors.info,
        'release': {
          'date': this.details.releaseDate.info,
          'release_country': this.details.country.info
        },
        'runtime': this.details.director.info,
        'genre': this.details.genres,
        'description': this.details.description
      },
      'user_details': {
        'watchlist': this.isWatch,
        'already_watched': this.isWatched,
        'watching_date': this.watchedDate,
        'favorite': this.isFavorite
      }
    };
  }


  /**
   * Метод, обеспечивающий вызов метода для преобразования сервернех данных фильмов в локальную структуру
   * @param {Array} filmsData данные фильмов
   * @return {Array} массив преобразованных данных
   */
  static parseFilms(filmsData) {
    return filmsData.map(FilmData.parseFilm);
  }


  /**
   * Метод, обеспечивающий преобразование серверных данных фильма в локальную структуру
   * @param {Object} filmData данные фильма
   * @return {Object}
   */
  static parseFilm(filmData) {
    return new FilmData(filmData);
  }


  /**
   * Метод, обеспечивающий вызов метода для преобразования локальных данных в соответствующие серверу
   * @param {Object} filmData данные фильма
   * @return {Object}
   */
  static clone(filmData) {
    return new FilmData(filmData.toRAW());
  }
}
