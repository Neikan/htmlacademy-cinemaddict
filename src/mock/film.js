import {Posters, Titles, Directors, Screenwriters, Actors, Countries, AgeRatings, Genres, Count} from '../consts.js';
import {getRandomElement, getRandomSubArray, getRandomInt, getRandomRating, getRandomDate} from '../utils.js';
import {getReleaseDate, getRandomDuration, getRandomDescription, getRandomBoolean} from '../utils.js';
import {generateComments} from './comment.js';


/**
 * Генерация фильма
 * @return {Object} созданный фильм
 */
export const generateFilm = () => {
  const titles = getRandomElement(Titles);
  const commentsCount = getRandomInt(Count.COMMENTS_MAX);
  const randomDate = getRandomDate(new Date());
  const releaseDate = getReleaseDate(randomDate);

  return {
    poster: getRandomElement(Posters),
    title: titles.translate,
    titleOrigin: titles.original,
    rating: getRandomRating(),
    director: getRandomElement(Directors),
    screenwriters: getRandomSubArray(Screenwriters).join(`, `),
    actors: getRandomSubArray(Actors).join(`, `),
    releaseDate,
    year: randomDate.getFullYear(),
    duration: getRandomDuration(),
    country: getRandomElement(Countries),
    genres: getRandomSubArray(Genres),
    commentsCount,
    comments: generateComments(commentsCount),
    description: getRandomDescription(),
    age: getRandomElement(AgeRatings),
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
export const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};
