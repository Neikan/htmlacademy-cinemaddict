import {Position, Count, MONTH_NAMES, Dates, Descriptions} from "./consts";


/**
 * Отрисовка элемента страницы ("компонента")
 * @param {Element} container контейнер, в который отрисосывается шаблон
 * @param {string} template отрисовываемый шаблон
 * @param {string} position место в контейнере для отрисовываемого шаблона
 * @return {void}
 */
export const render = (container, template, position = Position.BEFORE_END) =>
  void container.insertAdjacentHTML(position, template);


/**
 * Получение случайного числа из диапазона
 * @param {Number} max большее число
 * @param {Number} min меньшее число
 * @return {Number} полученное случайное число
 */
export const getRandomInt = (max, min = Count.ZERO) => {
  return min + Math.floor(Math.random() * (max - min));
};


/**
 * Получение случайного элемента массива
 * @param {Array} array массив для получения элемента
 * @return {*} случайный элемент массива
 */
export const getRandomElement = (array) => {
  return array[getRandomInt(array.length)];
};


/**
 * Получание случайного логического значения
 * @return {boolean} полученное логическое значение
 */
// const getRandomBoolean = () => Math.random() > 0.5;


/**
 * Перемешивание массива
 * @param {Array} array исходный массив данных
 * @return {Array} новый перемешанный массив
 */
const getShuffleArray = function (array) {
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
  const lengthSubArray = getRandomInt(shuffleArray.length);

  for (let i = 0; i < lengthSubArray; i++) {
    subArray.push(shuffleArray[i]);
  }

  return subArray;
};


/**
 * Получение случайного значения рейтинга фильма
 * @return {Number} значение рейтинга
 */
export const getRandomRating = () => {
  return Math.fround(Math.random() * Count.RAITING_MAX).toFixed(1);
};


/**
 * Получение случайной даты
 * @param {Date} maxDate
 * @param {Date} minDate
 * @return {Date} полученная дата
 */
export const getRandomDate = (maxDate, minDate = new Date(Dates.def.year, Dates.def.month, Dates.def.day)) => {
  return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
};


/**
 * Получение случайной даты в формате "день месяц год"
 * @param {Date} date дата для приведения формата
 * @return {string} полученная дата
 */
export const getReleaseDate = (date) => {
  const day = date.getDay();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};


/**
 * Приведение формата часов и минут к формату: 2 часа 3 минуты -> 02:03
 * @param {string} value
 * @return {string}
 */
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};


/**
 * Получение случайной даты в формате "год/месяц/день часы:минуты"
 * @param {Date} date дата для приведения формата
 * @return {string} полученная дата
 */
export const getCommentDate = (date) => {
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};


/**
 * Создание случайной длительности фильма
 * @return {string} длительность фильма
 */
export const getRandomDuration = () => {
  const hours = getRandomInt(0, Count.DURATION_HOURS_MAX);
  const minutes = getRandomInt(0, Count.DURATION_MINUTES_MAX);
  const duration = `${hours}h ${minutes}m`;

  return duration;
};


/**
 * Создание случайного описания фильма
 * @return {string} описание фильма
 */
export const getRandomDescription = () => {
  let description = [];
  const lengthDesc = getRandomInt(Count.DESCRIPTION_LENGTH_MAX, Count.DESCRIPTION_LENGTH_MIM);

  for (let i = 0; i < lengthDesc; i++) {
    description[i] = Descriptions[i];
  }
  description = description.join(` `);

  return description;
};
