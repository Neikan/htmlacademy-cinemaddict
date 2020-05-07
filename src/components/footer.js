import {castNumberFormat} from "../utils/common";


/**
 * Создание разметки блока информации о количестве фильмов
 * @param {number} countFilms количество фильмов
 * @return {string} разметка
 */
const createFooter = (countFilms) => `<p>${castNumberFormat(countFilms)} movies inside</p>`;


export {createFooter};
