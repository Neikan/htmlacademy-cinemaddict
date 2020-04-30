import {CountFilm, ExtraName, Position, Sorting} from "../consts";
import {render} from "../utils/components";
import {sortingArray, getIndex} from "../utils/common";
import {addShowMoreListener} from "../components/show-more-button";
import FilmsComponent from "../components/films";
import ShowMoreBtnComponent from "../components/show-more-button";
import FilmsExtraComponent from "../components/films-extra";
import NoFilmsComponent from "../components/no-films";
import {SortComponent, sortRules} from "../components/sorting";
import MenuComponent from "../components/menu";
import {FilmController} from "./film-controller";


const FILM_LIST_CLASS = `.films-list__container`;
let showingFilmsCount = CountFilm.START;

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
 * @param {Number} countShowingFilms новое количество фильмов
 * @param {Object} pageController контроллер страницы
 * @param {Array} showedFilmContollers
 */
const renderFilmsList = (filmsList, films, prevFilmsCount, countShowingFilms, pageController, showedFilmContollers) => {
  showedFilmContollers.concat(renderFilmControllers(
      filmsList, films.slice(prevFilmsCount, countShowingFilms),
      pageController._viewChangeHandler, pageController._dataChangeHandler
  ));
};


/**
 * Создание контроллера, обеспечивающего отрисовку компонентов на странице
 */
class PageController {
  constructor(container) {
    this._container = container;

    this._filmsData = [];
    this._showedFilmContollers = [];
    this._showedFilmRatedContollers = [];
    this._showedFilmCommentedContollers = [];
    this._menu = null;
    this._films = new FilmsComponent();
    this._filmsCommented = new FilmsExtraComponent(ExtraName.COMMENTED);
    this._filmsRated = new FilmsExtraComponent(ExtraName.RATED);
    this._showMoreBtn = new ShowMoreBtnComponent();
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortComponent();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий отрисовку данных фильмов
   * @param {Array} films данные фильмов
   */
  render(films) {
    this._filmsData = films;
    const container = this._container.getElement();
    this._renderMenu(container);

    if (!this._filmsData.length) {
      render[Position.BEFORE_END](container, this._noFilms);
      return;
    }
    this._renderFilms(container);
    this._sorting.setSortTypeChangeHandler(this._sortTypeChangeHandler());
  }


  /**
   * Метод, обеспечивающий создание и отрисовку компонента меню
   * @param {Object} container контейнер для отрисовки
   */
  _renderMenu(container) {
    this._menu = new MenuComponent(this._filmsData);
    render[Position.BEFORE_BEGIN](container, this._menu);
  }


  /**
   * Метод, обеспечивающий отрисовку компонентов-контейнеров фильмов
   * @param {Object} container контейнер для отрисовки
   */
  _renderFilms(container) {
    render[Position.BEFORE_BEGIN](container, this._sorting);
    render[Position.BEFORE_END](container, this._films);
    render[Position.BEFORE_END](container, this._filmsRated);
    render[Position.BEFORE_END](container, this._filmsCommented);
    this._renderFilmsComponent(this._films, this._filmsData,
        this._showedFilmContollers, 0, this._showMoreBtn
    );
    this._renderFilmsComponent(this._filmsRated,
        sortingArray(this._filmsData, Sorting.BY_RATING),
        this._showedFilmRatedContollers, 0
    );
    this._renderFilmsComponent(this._filmsCommented,
        sortingArray(this._filmsData, Sorting.BY_COMMENTS),
        this._showedFilmCommentedContollers, 0
    );
  }


  /**
   * Метод, обеспечивающий отрисовку компонентов-контейнеров фильмов
   * @param {Object} filmsComponent компонент-контейнер фильмов
   * @param {Array} filmsData данные фильмов
   * @param {Array} filmsContollers контроллеры отрисованных фильмов
   * @param {Number} prevFilmsCount предыдущее количество отрисованных фильмов
   * @param {Object} showMoreBtn компонент-кнопка показа скрытых фильмов
   */
  _renderFilmsComponent(filmsComponent, filmsData, filmsContollers, prevFilmsCount, showMoreBtn) {
    const filmsList = filmsComponent.getElement().querySelector(FILM_LIST_CLASS);
    renderFilmsList(filmsList, filmsData, prevFilmsCount, showingFilmsCount, this, filmsContollers);
    this._renderShowMoreBtn(filmsComponent, filmsData, filmsContollers, filmsList, showMoreBtn);
  }


  /**
   * Метод, обеспечивающий отрисовку компонента-кнопки показа скрытых фильмов
   * @param {Object} filmsComponent компонент-контейнер фильмов
   * @param {Array} filmsData данные фильмов
   * @param {Array} filmsContollers контроллеры отрисованных фильмов
   * @param {Object} filmsList список фильмов в компоненте-контейнере фильмов
   * @param {Object} showMoreBtn компонент-кнопка показа скрытых фильмов
   */
  _renderShowMoreBtn(filmsComponent, filmsData, filmsContollers, filmsList, showMoreBtn) {
    if (showMoreBtn && showingFilmsCount < filmsData.length) {
      render[Position.BEFORE_END](filmsComponent.getElement(), showMoreBtn);
      addShowMoreListener(filmsList, filmsData, this, filmsContollers, showingFilmsCount);
    }
  }


  /**
   * Метод, обеспечивающий обновление контроллера фильма на основе новых данных
   * @param {Object} filmContoller контроллер карточек фильма
   * @param {Object} oldData прежние данные фильма
   * @param {Object} newData обновленные данные фильма
   */
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


  /**
   * Метод, обеспечивающий отображение контроллера карточек фильма в режиме по умолчанию
   */
  _viewChangeHandler() {
    this._showedFilmContollers.map((showedFilmContoller) =>
      showedFilmContoller.setDefaultView());
  }


  /**
   * Метод, обеспечивающий сортировку и отображение отсортированных данных фильмов
   */
  _sortTypeChangeHandler() {
    showingFilmsCount = CountFilm.START;

    const filmsList = this._films.getElement().querySelector(FILM_LIST_CLASS);
    const sortClickHandler = (sortType) => {
      const sortedFilms = sortRules[sortType](this._filmsData, this._filmsData.length);

      filmsList.innerHTML = ``;
      const newFilmControllers = renderFilmControllers(
          filmsList, sortedFilms.slice(0, showingFilmsCount),
          this._viewChangeHandler, this._dataChangeHandler
      );
      this._showedFilmControllers = newFilmControllers;


      this._renderShowMoreBtn(this._films, sortedFilms,
          this._showedFilmControllers, filmsList, this._showMoreBtn
      );
    };

    this._sorting.setSortTypeChangeHandler(sortClickHandler);
  }
}


export {PageController, renderFilmsList};
