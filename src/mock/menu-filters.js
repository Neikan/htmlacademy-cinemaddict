/**
 * Получение количества элементов, соответствующих параметру фильтрации
 * @param {Array} films список фильмов
 * @param {string} param параметр фильтрации
 * @return {Number} количество соответствующих элементов
 */
export const filterCountMenu = (films, param) => films.reduce(getCount(param), 0);


/**
 * Проверка элемента и изменение счетчика по ее результатам
 * @param {string} param параметр проверки
 * @return {Number} значение счетчика
 */
const getCount = (param) => {
  return (count, film) => {
    return (film[param] ? ++count : count);
  };
};
