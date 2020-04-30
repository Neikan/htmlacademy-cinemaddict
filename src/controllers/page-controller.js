import {CountFilm, ExtraName, Position, Sorting} from "../consts";
import {render} from "../utils/components";
import {sortingArray, getIndex} from "../utils/common";
import {addShowMoreListener} from "../components/show-more-button";
import FilmsComponent from "../components/films";
import ShowMoreBtnComponent from "../components/show-more-button";
import FilmsExtraComponent from "../components/films-extra";
import NoFilmsComponent from "../components/no-films";
import SortingComponent from "../components/sorting";
import MenuComponent from "../components/menu";
import {FilmController} from "./film-controller";


const FILM_LIST_CLASS = `.films-list__container`;

/**
 * Создание контроллера, обеспечивающего отрисовку фильмов
 * @param {Object} filmsList список фильмов
 * @param {Array} films данные фильмов
 * @param {Function} viewChangeHandler метод контроллера страницы,
 *  обеспечивающий установку отображения контроллера фильма в режим по умолчанию
 * @param {Function} dataChangeHandler метод контроллера страницы,
 *  обеспечивающий изменение данных фильма и перерисовку карточки фильма
 * @return {Array} массив контроллеров карточек фильмов
 */
const renderFilmControllers = (filmsList, films, viewChangeHandler, dataChangeHandler) => {
  return films.map((film) => {
    const filmController = new FilmController(filmsList, viewChangeHandler, dataChangeHandler);
    filmController.render(film);

    return filmController;
  });
};


/**
 * Отрисовка фильмов в список
 * @param {Object} filmsList список фильмов
 * @param {Array} films данные фильмов
 * @param {Number} prevFilmsCount текущее количество фильмов на странице
 * @param {Number} showingFilmsCount новое количество фильмов
 * @param {Object} pageController контроллер страницы
 */
const renderFilmsList = (filmsList, films, prevFilmsCount, showingFilmsCount, pageController) => {
  const newFilmContollers = renderFilmControllers(filmsList,
      films.slice(prevFilmsCount, showingFilmsCount),
      pageController._viewChangeHandler, pageController._dataChangeHandler
  );
  pageController._showedFilmContollers = pageController._showedFilmContollers.concat(newFilmContollers);
};


/**
 * Отрисовка блока фильмов
 * @param {Object} filmsComponent блок фильмов
 * @param {Array} films данные фильмов
 * @param {Object} pageController контроллер страницы
 * @param {Object} showMoreBtnComponent кнопка показа скрытых фильмов
 */
const renderFilms = (filmsComponent, films, pageController, showMoreBtnComponent) => {
  let showingFilmsCount = CountFilm.START;

  const filmsList = filmsComponent.getElement().querySelector(FILM_LIST_CLASS);
  renderFilmsList(filmsList, films, 0, showingFilmsCount, pageController);

  if (showMoreBtnComponent && showingFilmsCount < films.length) {
    render[Position.BEFORE_END](filmsComponent.getElement(), showMoreBtnComponent);
    addShowMoreListener(filmsList, films, pageController, showingFilmsCount);
  }
};


/**
 * Создание контроллера, обеспечивающего отрисовку компонентов на странице
 */
class PageController {
  constructor(container) {
    this._container = container;

    this._filmsData = [];
    this._showedFilmContollers = [];
    this._menu = null;
    this._films = new FilmsComponent();
    this._filmsCommented = new FilmsExtraComponent(ExtraName.COMMENTED);
    this._filmsRated = new FilmsExtraComponent(ExtraName.RATED);
    this._showMoreBtn = new ShowMoreBtnComponent();
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortingComponent();

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }


  render(films) {
    this._filmsData = films;
    const container = this._container.getElement();
    this._renderMenu(container);

    if (!this._filmsData.length) {
      render[Position.BEFORE_END](container, this._noFilms);
      return;
    }
    this._renderFilms(container);
  }


  _renderMenu(container) {
    this._menu = new MenuComponent(this._filmsData);
    render[Position.BEFORE_BEGIN](container, this._menu);
  }


  _renderFilms(container) {
    render[Position.BEFORE_BEGIN](container, this._sorting);
    render[Position.BEFORE_END](container, this._films);
    render[Position.BEFORE_END](container, this._filmsRated);
    render[Position.BEFORE_END](container, this._filmsCommented);
    renderFilms(this._films, this._filmsData, this, this._showMoreBtn);
    renderFilms(this._filmsRated, sortingArray(this._filmsData, Sorting.BY_RATING), this);
    renderFilms(this._filmsCommented, sortingArray(this._filmsData, Sorting.BY_COMMENTS), this);
  }


  _dataChangeHandler(filmContoller, oldData, newData) {
    const index = getIndex(this._filmsData, oldData);
    if (index === -1) {
      return;
    }
    const newFilmsData = this._filmsData.slice();
    newFilmsData[index] = newData;
    this._filmsData = newFilmsData;

    filmContoller.render(this._filmsData[index]);
  }


  _viewChangeHandler() {
    this._showedFilmContollers.map((showedFilmContoller) => showedFilmContoller.setDefaultView());
  }
}


export {PageController, renderFilmsList};
