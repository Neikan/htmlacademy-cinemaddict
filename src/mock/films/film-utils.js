import {DESCRIPTION, CountDescription, CountDuration, RATING_MAX} from "./film-consts";
import {getRandomInt, getShuffleArray} from "../../utils";


/**
 * Получение случайного описания фильма
 * @return {string} описание фильма
 */
export const getRandomDescription = () => {
  let description = [];
  const shuffleArr = getShuffleArray(DESCRIPTION);
  const lengthDesc = getRandomInt(CountDescription.MAX, CountDescription.MIM);

  for (let i = 0; i < lengthDesc; i++) {
    description[i] = shuffleArr[i];
  }
  description = description.join(` `);

  return description;
};


/**
 * Создание случайной длительности фильма
 * @return {string} длительность фильма
 */
export const getRandomDuration = () => {
  const hours = getRandomInt(0, CountDuration.HOURS_MAX);
  const minutes = getRandomInt(0, CountDuration.MINUTES_MAX);
  const duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return duration;
};


/**
 * Получение случайного значения рейтинга фильма
 * @return {Number} значение рейтинга
 */
export const getRandomRating = () => Math.fround(Math.random() * RATING_MAX).toFixed(1);
