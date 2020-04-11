import {
  COUNT_COMMENTS_MAX,
  TITLES,
  POSTERS,
  DIRECTORS,
  SCREEN_WRITERS,
  ACTORS,
  COUNTRIES,
  GENRES,
  AGE_RATINGS
} from './film-consts';

import {
  getRandomElement,
  getRandomSubArray,
  getRandomInt,
  getRandomBoolean,
  getRandomDate,
  getReleaseDate,
} from '../../utils.js';

import {generateComments} from '../comments/comment.js';
import {getRandomDuration, getRandomDescription, getRandomRating} from './film-utils';

/**
 * Генерация фильма
 * @return {Object} созданный фильм
 */
const generateFilm = () => {
  const titles = getRandomElement(TITLES);
  const randomDate = getRandomDate(new Date());
  const releaseDate = getReleaseDate(randomDate);

  return {
    promo: {
      poster: getRandomElement(POSTERS),
      age: getRandomElement(AGE_RATINGS),
    },
    titles: {
      translate: titles.translate,
      titleOrigin: titles.original
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
        info: releaseDate
      },
      duration: {
        name: `Runtime`,
        info: getRandomDuration()
      },
      country: {
        name: `Country`,
        info: getRandomElement(COUNTRIES)
      },
      genres: getRandomSubArray(GENRES),
      description: getRandomDescription(),
      year: randomDate.getFullYear(),
    },
    comments: generateComments(getRandomInt(COUNT_COMMENTS_MAX)),
    isWatch: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean()
  };
};

/**
 * Генерация заданного количества фильмов
 * @param {Number} count количество фильмов
 * @return {Array} массив сгенерированных фильмов
 */
const generateFilms = (count) => new Array(count).fill().map(generateFilm);

export {generateFilm, generateFilms};
