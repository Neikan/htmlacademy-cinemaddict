import {createFilmCard} from "./components/film-card/film-card";


/**
 * Создание разметки нескольких карточек фильмов
 * @param {Array} films список фильмов
 * @return {string} разметка нескольких карточек
 */
export const createFilmCards = (films) => {
  let result = ``;
  films.forEach((it) => {
    result += createFilmCard(it);
  });
  return result;
};
