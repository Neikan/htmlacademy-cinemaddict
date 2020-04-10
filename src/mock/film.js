import {Posters, Titles, Directors, Screenwriters, Actors, Countries, AgeRatings, Genres, Count} from '../consts.js';
import {getRandomElement, getRandomSubArray, getRandomInt, getRandomRating, getRandomDate, getReleaseDate, getRandomDuration, getRandomDescription} from '../utils.js';
import {generateComments} from './comment.js';


/**
 * Генерация фильма
 * @return {Object} созданный фильм
 */
export const generateFilm = () => {
  const commentsCount = getRandomInt(Count.COMMENTS_MAX);
  const randomDate = getRandomDate(new Date());
  const releaseDate = getReleaseDate(randomDate);

  return {
    poster: getRandomElement(Posters),
    title: getRandomElement(Titles),
    titleOrigin: getRandomElement(Titles),
    rating: getRandomRating(),
    director: getRandomElement(Directors),
    screenwriters: getRandomSubArray(Screenwriters),
    actors: getRandomSubArray(Actors),
    releaseDate,
    year: randomDate.getFullYear(),
    duration: getRandomDuration(),
    country: getRandomElement(Countries),
    genres: getRandomSubArray(Genres),
    commentsCount,
    comments: generateComments(commentsCount),
    description: getRandomDescription(),
    age: getRandomElement(AgeRatings),
  };
};
