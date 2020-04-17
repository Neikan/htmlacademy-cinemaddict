import {CountFilm} from "../../consts";
import {castNumberFormat} from "../../utils";


/**
 * Создание разметки блока информации о количестве фильмов
 * @return {string} разметка
 */
const createStatistic = () => `<p>${castNumberFormat(CountFilm.ALL)} movies inside</p>`;


export {createStatistic};
