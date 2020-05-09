import {sortingArray, getTime} from "./common";
import {SortMethod} from "../consts";


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
 * Замена компонента
 * @param {Object} newComponent новый компонент
 * @param {Object} oldComponent заменяемый заменяемый
 */
export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


/**
 * Отрисовка компонента на странице
 */
export const render = {
  'beforebegin': (container, component) => container.before(component.getElement()),
  'beforeend': (container, component) => container.append(component.getElement()),
  'afterend': (container, component) => container.after(component.getElement()),
  'afterbegin': (container, component) => container.prepend(component.getElement())
};


/**
 * Удаление компонента
 * @param {Object} component удаляемый компонент
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


/**
 * Создание элемента изображения
 * @param {string} imageName название изображения
 * @return {Object} созданный элемент
 */
export const getImageElement = (imageName) => {
  const imgElement = document.createElement(`img`);
  imgElement.src = `./images/emoji/${imageName}.png`;
  imgElement.width = `55`;
  imgElement.height = `55`;
  imgElement.alt = `emoji-${imageName}`;
  return imgElement;
};


/**
 * Получение элемента по селектору класса
 * @param {Object} contaner контейнер, в котором выполняется поиск
 * @param {string} selector параметр поиска
 * @return {Object} найденный элемент
 */
export const getItem = (contaner, selector) => contaner.querySelector(`.${selector}`);


/**
 * Правила фильтрации
 */
export const filterRules = {
  'All movies': (filmsData) => filmsData,
  'Watchlist': (filmsData) => filmsData.filter((filmData) => filmData.isWatch),
  'History': (filmsData) => filmsData.filter((filmData) => filmData.isWatched),
  'Favorites': (filmsData) => filmsData.filter((filmData) => filmData.isFavorite),
  'Rated': (filmsData) => filmsData.filter((filmData) => filmData.rating !== 0),
  'Commented': (filmsData) => filmsData.filter((filmData) => filmData.comments.length !== 0),
  'By genres': (filmsData, genre) => filmsData.filter((filmData) =>
    filmData.details.genres.includes(genre)).length,
  'History by time': (filmsData, period) => filmsData.filter((filmData) =>
    filmData.isWatched && filmData.watchedDate >= getTime(period))
};


/**
 * Правила сортировки
 */
export const sortRules = {
  'default': (films) => films,
  'by-date': (films, count = films.length) => sortingArray(films, SortMethod.BY_DATE, count),
  'by-rating': (films, count = films.length) => sortingArray(films, SortMethod.BY_RATING, count),
  'by-comments': (films, count = films.length) => sortingArray(films, SortMethod.BY_COMMENTS, count),
  'by-genres': (films, count = films.length) => sortingArray(films, SortMethod.BY_GENRES, count)
};
