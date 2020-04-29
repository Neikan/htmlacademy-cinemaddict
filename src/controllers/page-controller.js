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
import FilmController from "./film-controller";


/**
 * Создание контроллера, обеспечивающего отрисовку фильмов
 * @param {Object} filmsList список фильмов
 * @param {Array} films данные фильмов
 * @param {Function} pageController контроллер страницы
 * @return {Object} созданный контроллер
 */
const renderFilmCards = (filmsList, films, pageController) => {
  return films.map((film) => {
    const filmController = new FilmController(filmsList, pageController);
    filmController.render(film);

    return filmController;
  });
};


/**
 * Отрисовка блока фильмов
 * @param {Object} filmsComponent блок фильмов
 * @param {Array} films фильмы
 * @param {Object} pageController контроллер страницы
 * @param {Object} showMoreBtnComponent кнопка показа скрытых фильмов
 */
const renderFilms = (filmsComponent, films, pageController, showMoreBtnComponent) => {
  let showingFilmsCount = CountFilm.START;
  const filmsList = filmsComponent.getElement().querySelector(`.films-list__container`);

  const newFilms = renderFilmCards(filmsList, films.slice(0, showingFilmsCount), pageController);
  pageController._showedFilms = pageController._showedFilms.concat(newFilms);


  if (showMoreBtnComponent && showingFilmsCount < films.length) {
    render[Position.BEFORE_END](filmsComponent.getElement(), showMoreBtnComponent);
    addShowMoreListener(showMoreBtnComponent, films, showingFilmsCount);
  }
};


/**
 * Создание контроллера, обеспечивающего отрисовку компонентов на странице
 */
export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmsData = [];
    this._showedFilms = [];
    this._menu = null;
    this._films = new FilmsComponent();
    this._filmsCommented = new FilmsExtraComponent(ExtraName.COMMENTED);
    this._filmsRated = new FilmsExtraComponent(ExtraName.RATED);
    this._showMoreBtn = new ShowMoreBtnComponent();
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortingComponent();
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


  _dataChangeHandler(filmController, oldData, newData) {
    const index = getIndex(this._filmsData, oldData);
    if (index === -1) {
      return;
    }
    this._filmsData[index] = newData;

    filmController.render(this._filmsData[index]);
  }


  _viewChangeHandler() {
    this._showedFilms.map((filmData) => filmData.setDefaultView());
  }
}


export {renderFilmCards};
