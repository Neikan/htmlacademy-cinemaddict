import {createFilmCard} from "./film-card";

/**
 * Создание разметки нескольких карточек фильмов
 * @param {Array} films список фильмов
 * @return {string} разметка нескольких карточек
 */
const createFilmCards = (films) => {
  let result = ``;
  films.forEach((it) => {
    result += createFilmCard(it);
  });
  return result;
};

export {createFilmCards};
