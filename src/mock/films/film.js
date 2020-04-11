import {
  TITLES,
  POSTERS,
  DIRECTORS,
  SCREEN_WRITERS,
  ACTORS,
  COUNTRIES,
  GENRES,
  AGE_RATINGS,
  COUNT_COMMENTS_MAX
} from '../../consts.js';
import {getRandomElement, getRandomSubArray, getRandomInt, getRandomRating, getRandomDate} from '../../utils.js';
import {getReleaseDate, getRandomDuration, getRandomDescription, getRandomBoolean} from '../../utils.js';
import {generateComments} from '../comments/comment.js';

/**
 * Генерация фильма
 * @return {Object} созданный фильм
 */
const generateFilm = () => {
  const titles = getRandomElement(TITLES);
  const randomDate = getRandomDate(new Date());
  const releaseDate = getReleaseDate(randomDate);

  return {
    poster: getRandomElement(POSTERS),
    title: titles.translate,
    titleOrigin: titles.original,
    rating: getRandomRating(),
    director: getRandomElement(DIRECTORS),
    screenwriters: getRandomSubArray(SCREEN_WRITERS).join(`, `),
    actors: getRandomSubArray(ACTORS).join(`, `),
    releaseDate,
    year: randomDate.getFullYear(),
    duration: getRandomDuration(),
    country: getRandomElement(COUNTRIES),
    genres: getRandomSubArray(GENRES),
    comments: generateComments(getRandomInt(COUNT_COMMENTS_MAX)),
    description: getRandomDescription(),
    age: getRandomElement(AGE_RATINGS),
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
const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
