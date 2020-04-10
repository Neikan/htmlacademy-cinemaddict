import {Count} from "../../consts";
import {castNumberFormat} from "../../utils";

/**
 * Создание шаблона информации о статистике
 * @return {string} информация
 */
export const createStatistic = () => `<p>${castNumberFormat(Count.FILMS)} movies inside</p>`;
