import moment from "moment";
import {
  Position, CountCheckFormat, CountFilm, DETAILS,
  FormatRule, MINUTES_IN_HOUR, SortKind
} from "../consts";


/**
 * Отрисовка элемента страницы ("компонента")
 * @param {Element} container контейнер, в который отрисосывается шаблон
 * @param {string} template отрисовываемый шаблон
 * @param {string} position место в контейнере для отрисовываемого шаблона
 * @return {void}
 */
export const renderMarkup = (container, template, position = Position.BEFORE_END) =>
  void container.insertAdjacentHTML(position, template);


/**
 * Сортировка массива объектов по параметру
 * @param {Array} array массив для сортировки
 * @param {Object} {параметры сортировки}
 * @param {Number} count количество отстортированных элементов
 * @return {Array} отсортированный массив заданной длины
 */
export const sortingArray = (array, {type, parameter}, count = CountFilm.EXTRA) =>
  [...array].sort(choiceType[type](parameter)).slice(0, count);

const choiceType = {
  [SortKind.ARRAY]: (parameter) => ((a, b) => (b[parameter].length - a[parameter].length)),
  [SortKind.NUMBER_ASC]: (parameter) => ((a, b) => (a[parameter] - b[parameter])),
  [SortKind.NUMBER_DESC]: (parameter) => ((a, b) => (b[parameter] - a[parameter])),
  [SortKind.DATE]: (parameter) => ((a, b) =>
    parseInt(b[DETAILS][parameter], 10) - parseInt(a[DETAILS][parameter], 10))
};


/**
 * Приведение формата 4х-6ти-значного числа к формату "123 456"
 * @param {string} value
 * @return {string}
 */
export const castNumberFormat = (value) => {
  return value > CountCheckFormat.NUMBER ?
    `${Math.trunc(value / CountCheckFormat.NUMBER)} ${value % CountCheckFormat.NUMBER}` :
    String(value);
};


/**
 * Получение индекса элемента
 * @param {Array} items данные элементов
 * @param {Object} id идентификатор элемента
 * @return {Number} индекс
 */
export const getIndex = (items, id) => items.findIndex((item) => item.id === id);


/**
 * Приведение даты к необходмому формату
 * @param {Date} date форматируемая дата
 * @param {string} formatRule правило форматирования
 * @return {string} отформатированная дата
 */
export const formatDate = (date, formatRule) => moment(date).format(formatRule);


/**
 * Приведение даты к "человеческому" формату
 * @param {Date} date форматируемая дата
 * @return {string} отформатированная дата
 */
export const formatDateFromNow = (date) => moment(date).fromNow();


/**
 * Приведение длительности фильма к формату заданному формату
 * @param {Number} duration длительность в минутах
 * @return {string} отформатированная длительность
 */
export const formatDuration = (duration) => {
  const rawDuration = moment.duration(duration, `minutes`);

  const formatedDuration = rawDuration.hours() === 0 ?
    moment.utc(rawDuration.asMilliseconds()).format(FormatRule.DURATION) :
    moment.utc(rawDuration.asMilliseconds()).format(FormatRule.DURATION_WITH_HOURS);

  return formatedDuration;
};


/**
 * Генерация строки для авторизации
 * @return {string}
 */
export const generateToken = () => `f${(+new Date()).toString(16)}${Math.random() * 1e8}`;


/**
 * Получение даты, отстоящей от выбранного периода
 * @param {Number} period период
 * @return {Date} дата
 */
export const getTime = (period) => {
  const currentDate = new Date();
  return currentDate.setDate(currentDate.getDate() - period);
};


/**
 * Получение количества часов длительности фильмов
 * @param {Number} durationInMinutes длительность фильмов в минутах
 * @return {Number} количество часов
 */
export const getHours = (durationInMinutes) =>
  (durationInMinutes - durationInMinutes % MINUTES_IN_HOUR) / MINUTES_IN_HOUR;


/**
 * Получение количества минут длительности фильмов
 * @param {Number} durationInMinutes длительность фильмов в минутах
 * @return {Number} количество минут
 */
export const getMinutes = (durationInMinutes) => durationInMinutes % MINUTES_IN_HOUR;
