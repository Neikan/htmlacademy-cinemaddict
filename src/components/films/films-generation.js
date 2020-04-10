import {createFilmCard} from "./film-card";

/**
 * Создание нескольких карточек фильмов по одному щаблону
 * @param {number} count количество итераций
 * @return {string} результирующая строка
 */
export const createFilmCards = (count) => {
  let result = ``;
  for (let i = 0; i < count; i++) {
    result += createFilmCard();
  }
  return result;
};
