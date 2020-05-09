import {
  COUNT_COMMENTS_MAX,
  TITLES,
  POSTERS,
  DIRECTORS,
  SCREEN_WRITERS,
  ACTORS,
  COUNTRIES,
  GENRES,
  AGE_RATINGS,
  START_DATE_WATCHED
} from './film-consts';
import {
  getRandomElement,
  getRandomSubArray,
  getRandomInt,
  getRandomBoolean,
  getRandomDate,
  formatDate,
  generateId
} from '../../utils/common';
import {generateComments} from '../comments/comment.js';
import {getRandomDescription, getRandomRating} from './film-utils';
import {FormatRule} from '../../consts';


/**
 * Генерация фильма
 * @return {Object} созданный фильм
 */
const generateFilm = () => {
  const titles = getRandomElement(TITLES);
  const randomDate = getRandomDate(new Date());

  return {
    id: generateId(),
    promo: {
      poster: getRandomElement(POSTERS),
      age: getRandomElement(AGE_RATINGS),
    },
    titles: {
      translate: titles.translate,
      original: titles.original
    },
    rating: getRandomRating(),
    details: {
      director: {
        name: `Director`,
        info: getRandomElement(DIRECTORS)
      },
      screenwriters: {
        name: `Writers`,
        info: getRandomSubArray(SCREEN_WRITERS).join(`, `)
      },
      actors: {
        name: `Actors`,
        info: getRandomSubArray(ACTORS).join(`, `)
      },
      releaseDate: {
        name: `Release Date`,
        info: formatDate(randomDate, FormatRule.RELEASE_DATE)
      },
      duration: {
        name: `Runtime`,
        info: getRandomInt(240)
      },
      country: {
        name: `Country`,
        info: getRandomElement(COUNTRIES)
      },
      genres: getRandomSubArray(GENRES),
      description: getRandomDescription(),
      year: formatDate(randomDate, FormatRule.RELEASE_YEAR)
    },
    comments: generateComments(getRandomInt(COUNT_COMMENTS_MAX)),
    isWatch: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    watchedDate: getRandomDate(new Date(), new Date([...START_DATE_WATCHED])),
    isFavorite: getRandomBoolean()
  };
};


/**
 * Генерация заданного количества фильмов
 * @param {Number} count количество фильмов
 * @return {Array} массив сгенерированных фильмов
 */
const generateFilms = (count) => new Array(count).fill({}).map(generateFilm);


export {generateFilm, generateFilms};
