import {sortingArray, getTime} from "./common";
import {SortMethod, FilmAttribute, SortType, FilterType, Position} from "../consts";


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
  [Position.BEFORE_BEGIN]: (container, component) => container.before(component.getElement()),
  [Position.BEFORE_END]: (container, component) => container.append(component.getElement()),
  [Position.AFTER_BEGIN]: (container, component) => container.prepend(component.getElement()),
  [Position.AFTER_END]: (container, component) => container.after(component.getElement())
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
  [FilterType.ALL]: (filmsData) => filmsData,

  [FilterType.WATCHLIST]: (filmsData) => filmsData.filter((filmData) => filmData.isWatch),

  [FilterType.HISTORY]: (filmsData) => filmsData.filter((filmData) => filmData.isWatched),

  [FilterType.FAVORITES]: (filmsData) => filmsData.filter((filmData) => filmData.isFavorite),

  [FilterType.RATED]: (filmsData) => filmsData.filter((filmData) => filmData.rating !== 0),

  [FilterType.COMMENTED]: (filmsData) =>
    filmsData.filter((filmData) => filmData.commentsIds.length !== 0),

  [FilterType.GENRES]: (filmsData, genre) =>
    filmsData.filter((filmData) => filmData.details.genres.includes(genre)).length,

  [FilterType.HISTORY_BY_TIME]: (filmsData, period) =>
    filmsData.filter((filmData) => filmData.isWatched && filmData.watchedDate >= getTime(period))
};


/**
 * Правила сортировки
 */
export const sortRules = {
  [SortType.DEFAULT]: (films) => films,
  [SortType.BY_DATE]: (films, count = films.length) => sortingArray(films, SortMethod.BY_DATE, count),
  [SortType.BY_RATING]: (films, count = films.length) => sortingArray(films, SortMethod.BY_RATING, count),
  [SortType.BY_COMMENTS]: (films, count = films.length) => sortingArray(films, SortMethod.BY_COMMENTS, count),
  [SortType.BY_GENRES]: (films, count = films.length) => sortingArray(films, SortMethod.BY_GENRES, count)
};


/**
 * Правила изменения данных фильма
 */
export const changeDataRules = {
  [FilmAttribute.IS_WATCH]: (filmData) => {
    filmData.isWatch = !filmData.isWatch;

    return filmData;
  },

  [FilmAttribute.IS_WATCHED]: (filmData) => {
    filmData.isWatched = !filmData.isWatched;
    filmData.watchedDate = filmData.isWatched ? new Date() : null;

    return filmData;
  },

  [FilmAttribute.IS_FAVORITE]: (filmData) => {
    filmData.isFavorite = !filmData.isFavorite;

    return filmData;
  }
};
