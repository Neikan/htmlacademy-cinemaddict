import {DESCRIPTION, CountDescription, RATING_MAX} from "./film-consts";
import {getRandomInt, getShuffleArray} from "../../utils/common";


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
 * Получение случайного значения рейтинга фильма
 * @return {Number} значение рейтинга
 */
export const getRandomRating = () => Math.fround(Math.random() * RATING_MAX).toFixed(1);
