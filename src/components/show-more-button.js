import AbstractComponent from "./abstract/abstract-component";
import {CountFilm} from "../consts";
import {remove} from "../utils/components";


/**
 * Добавление лисенера на кнопку показа скрытых фильмов
 * @param {Object} showMoreComponent блок фильмов
 * @param {Array} films фильмы
 * @param {Number} showingFilmsCount количество фильмов, ранее отображенных
 * @param {Function} renderFilmList отрисовка списка фильмов
 */
const addShowMoreListener = (showMoreComponent, films, showingFilmsCount, renderFilmList) => {

  const showMoreClickHandler = () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += CountFilm.BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount).map(renderFilmList());

    if (showingFilmsCount >= films.length) {
      remove(showMoreComponent);
    }
  };

  showMoreComponent.setClickHandler(showMoreClickHandler);
};


/**
 * Создание разметки кнопки показа фильмов
 * @return {string} разметка кнопки показа скрытых фильмов
 */
const createShowMore = () => `<button class="films-list__show-more">Show more</button>`;


/**
 * Создание класса кнопки показа скрытых фильмов
 */
export default class ShowMoreBtn extends AbstractComponent {
  getTemplate() {
    return createShowMore();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}


export {addShowMoreListener};
