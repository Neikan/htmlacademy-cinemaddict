import AbstractComponent from "./abstract/component";
import {CountFilm} from "../consts";
import {remove} from "../utils/components";
import {renderFilmsList} from "../controllers/page-controller";


/**
 * Добавление лисенера на кнопку показа скрытых фильмов
 * @param {Object} filmsList блок фильмов
 * @param {Array} films данные фильмов
 * @param {Number} pageController котроллер страницы
 * @param {Function} showingFilmsCount количество показанных фильмов
 */
const addShowMoreListener = (filmsList, films, pageController, showingFilmsCount) => {
  const showMoreClickHandler = () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += CountFilm.BY_BUTTON;

    renderFilmsList(filmsList, films, prevFilmsCount, showingFilmsCount, pageController);

    if (showingFilmsCount >= films.length) {
      remove(pageController._showMoreBtn);
    }
  };

  pageController._showMoreBtn.setClickHandler(showMoreClickHandler);
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
  constructor() {
    super();


  }

  getTemplate() {
    return createShowMore();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}


export {addShowMoreListener};
