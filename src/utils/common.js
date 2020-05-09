import moment from "moment";
import {
  Position, CountCheckFormat, START_DATE_FILMS,
  CountFilm, DETAILS, FormatRule, MINUTES_IN_HOUR
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
 * Получение случайного числа из диапазона
 * @param {Number} max большее число
 * @param {Number} min меньшее число
 * @return {Number} полученное случайное число
 */
export const getRandomInt = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};


/**
 * Получение случайного элемента массива
 * @param {Array} array массив для получения элемента
 * @return {Object} случайный элемент массива
 */
export const getRandomElement = (array) => array[getRandomInt(array.length)];

/**
 * Получание случайного логического значения
 * @return {boolean} полученное логическое значение
 */
export const getRandomBoolean = () => Math.random() > 0.5;


/**
 * Перемешивание массива
 * @param {Array} array исходный массив данных
 * @return {Array} новый перемешанный массив
 */
export const getShuffleArray = function (array) {
  let j;

  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [array[j], array[i]] = [array[i], array[j]];
  }

  return array;
};


/**
 * Создание подмассива из массива
 * @param {Array} array исходный массив данных
 * @return {Array} подмассив
 */
export const getRandomSubArray = (array) => {
  const shuffleArray = getShuffleArray(array);
  const subArray = [];
  const lengthSubArray = getRandomInt(shuffleArray.length, 1);

  for (let i = 0; i < lengthSubArray; i++) {
    subArray.push(shuffleArray[i]);
  }

  return subArray;
};


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
  'forNumberDesc': (parameter) => ((a, b) => (b[parameter] - a[parameter])),
  'forNumberAsc': (parameter) => ((a, b) => (a[parameter] - b[parameter])),
  'forArray': (parameter) => ((a, b) => (b[parameter].length - a[parameter].length)),
  'forDate': (parameter) => ((a, b) =>
    parseInt(b[DETAILS][parameter], 10) - parseInt(a[DETAILS][parameter], 10))
};


/**
 * Получение случайной даты
 * @param {Date} maxDate
 * @param {Date} minDate
 * @return {Date} полученная дата
 */
export const getRandomDate = (maxDate, minDate = new Date([...START_DATE_FILMS])) => {
  return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
};


/**
 * Приведение формата 4х-6ти-значного числа к формату "123 456"
 * @param {string} value
 * @return {string}
 */
export const castNumberFormat = (value) => {
  return value > CountCheckFormat.NUMBER ?
    `${Math.trunc(value / CountCheckFormat.NUMBER)}  ${value % CountCheckFormat.NUMBER}` :
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
 * Генерация идентификатора для фильмов и комментариев
 * @return {string}
 */
export const generateId = () => `f${(+new Date()).toString(16)}${Math.random() * 1e8}`;


/**
 *
 * @param {number} period
 * @return {Date}
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
