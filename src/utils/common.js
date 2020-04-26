import {Position, CountCheckFormat, MONTH_NAMES, START_DATE_FILMS, CountFilm} from "../consts";


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
 * @return {*} случайный элемент массива
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
  'forNumber': (parameter) => ((a, b) => (b[parameter] - a[parameter])),
  'forArray': (parameter) => ((a, b) => (b[parameter].length - a[parameter].length))
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
 * Приведение формата часов и минут к формату: 2 часа 3 минуты -> 02:03
 * @param {string} value
 * @return {string}
 */
const castTimeFormat = (value) => (value < CountCheckFormat.TIME ? `0${value}` : String(value));


/**
 * Приведение формата 4х-6ти-значного числа к формату "123 456"
 * @param {string} value
 * @return {string}
 */
export const castNumberFormat = (value) => {
  return value > CountCheckFormat.NUMBER ?
    `${Math.trunc(value / CountCheckFormat.NUMBER)}  ${value % CountCheckFormat.NUMBER}` : String(value);
};


/**
 * Получение случайной даты в формате "год/месяц/день часы:минуты"
 * @param {Date} date дата для приведения формата
 * @return {string} полученная дата
 */
export const getCommentDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};


/**
 * Получение случайной даты в формате "день месяц год"
 * @param {Date} date дата для приведения формата
 * @return {string} полученная дата
 */
export const getReleaseDate = (date) => {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};


/**
 * Создание DOM-элемента
 * @param {string} template шаблон-разметка для создания элемента
 * @return {string} разметка созданного элемента
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


/**
 * Отрисовка элемента страницы ("компонента")
 * @param {Object} container контейнер, в который отрисосывается шаблон
 * @param {string} element отрисовываемый элемент
 * @param {string} position место в контейнере для отрисовываемого шаблона
 * @return {void}
 */
export const renderComponent = (container, element, position = Position.BEFORE_END) => {
  switch (position) {
    case Position.AFTER_BEGIN:
      container.prepend(element);
      break;
    case Position.AFTER_END:
      container.after(element);
      break;
    case Position.BEFORE_END:
      container.append(element);
      break;
  }
};
