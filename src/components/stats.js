import {CountFilm} from "../consts";
import {castNumberFormat} from "../utils";

/**
 * Создание шаблона информации о статистике
 * @return {string} информация
 */
const createStatistic = () => `<p>${castNumberFormat(CountFilm.ALL)} movies inside</p>`;

export {createStatistic};
