import {CountFilm, ExtraName, Position, Sorting} from "../consts";
import {render, remove} from "../utils/components";
import {sortingArray} from "../utils/common";
import FilmsComponent from "../components/films";
import {ShowMoreBtn} from "../components/show-more-button";
import FilmsExtraComponent from "../components/films-extra";
import NoFilmsComponent from "../components/no-films";
import {SortComponent, sortRules} from "../components/sorting";
import {FilmController} from "./film-controller";
import {MenuController} from "./menu-controller";


const FILM_LIST_CLASS = `.films-list__container`;

/**
 * Создание контроллера, обеспечивающего отрисовку фильмов
 * @param {Object} filmsList список фильмов
 * @param {Array} filmsData данные фильмов
 * @param {Function} viewChangeHandler метод контроллера страницы,
 *  обеспечивающий установку отображения контроллера фильма в режим по умолчанию
 * @param {Function} dataChangeHandler метод контроллера страницы,
 *  обеспечивающий изменение данных фильма и перерисовку карточки фильма
 * @param {Object} currentFilter
 * @return {Array} массив контроллеров карточек фильмов
 */
const renderFilmControllers = (filmsList, filmsData, viewChangeHandler, dataChangeHandler, currentFilter) => {
  return filmsData.map((filmData) => {
    const filmController = new FilmController(filmsList, viewChangeHandler, dataChangeHandler, currentFilter);
    filmController.render(filmData);

    return filmController;
  });
};


/**
 * Создание контроллера, обеспечивающего отрисовку компонентов на странице
 */
class PageController {
  constructor(container, filmsModel) {
    this._container = container;

    this._filmsData = [];
    this._showedFilmContollers = [];
    this._showedFilmRatedContollers = [];
    this._showedFilmCommentedContollers = [];
    this._films = new FilmsComponent();
    this._filmsCommented = new FilmsExtraComponent(ExtraName.COMMENTED);
    this._filmsRated = new FilmsExtraComponent(ExtraName.RATED);
    this._showMoreBtn = new ShowMoreBtn();
    this._noFilms = new NoFilmsComponent();
    this._sorting = null;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._showMoreClickHandler = this._showMoreClickHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);

    this._filmsModel = filmsModel;
    this._menuController = null;
  }


  /**
   * Метод, обеспечивающий отрисовку данных фильмов
   * @param {Array} films данные фильмов
   */
  render() {
    this._filmsData = this._filmsModel.getFilteringFilmsData();
    const container = this._container.getElement();

    this._renderMenu(container);

    if (!this._filmsData.length) {
      render[Position.BEFORE_END](container, this._noFilms);
      return;
    }

    this._renderFilms(container);
  }


  /**
   * Метод, собирающий данные для отрисовки в единый объект
   * @param {Object} container контейнер контроллера
   * @param {Object} filmsComponent компонент-контейнер фильмов
   * @param {Array} filmsData данные фильмов
   * @param {Array} filmsContollers контроллеры отрисованных фильмов
   * @param {Number} countPrevFilms предыдущее количество отрисованных фильмов
   * @param {Number} countFilms текущее количество отрисованных фильмов
   * @param {Object} filmList список фильмов в компоненте-контейнере фильмов
   * @return {Object} созданный объект с данными
   */
  _getDataSet(container, filmsComponent, filmsData,
      filmsContollers, countPrevFilms, countFilms, filmList
  ) {
    return {
      container, filmsComponent, filmsData, filmsContollers, countPrevFilms, countFilms, filmList
    };
  }


  /**
   * Метод, обеспечивающий обновление компонента меню
   * @param {Object} container контейнер контроллера
   */
  _renderMenu(container) {
    this._menuController = new MenuController(container.parentElement, this._filmsModel);
    this._menuController.render();
    this._menuController._menu.setFilterChangeHandler(this._filterChangeHandler(container));
  }


  /**
   * Метод, обеспечивающий отрисовку компонентов-контейнеров фильмов
   * @param {Object} container контейнер контроллера
   */
  _renderFilms(container) {
    this._renderFilmsCommented(container);
    this._renderFilmsRated(container);
    this._renderFilmsWithSorting(container);
  }


  /**
   * Метод, обеспечивающий отрисовку компонента самых обсуждаемых фильмов
   * @param {Object} container контейнер контроллера
   */
  _renderFilmsCommented(container) {
    this._renderFilmsComponent(this._getDataSet(container, this._filmsCommented,
        sortingArray(this._filmsData, Sorting.BY_COMMENTS),
        this._showedFilmCommentedContollers, 0, CountFilm.EXTRA)
    );
  }


  /**
   * Метод, обеспечивающий отрисовку компонента высокорейтинговых фильмов
   * @param {Object} container контейнер контроллера
   */
  _renderFilmsRated(container) {
    this._renderFilmsComponent(this._getDataSet(container, this._filmsRated,
        sortingArray(this._filmsData, Sorting.BY_RATING),
        this._showedFilmRatedContollers, 0, CountFilm.EXTRA)
    );
  }


  /**
   * Метод, обеспечивающий отрисовку компонента сортировки и добавление слушателей на него
   * @param {Object} container контейнер контроллера
   */
  _renderSorting(container) {
    this._sorting = new SortComponent();
    render[Position.BEFORE_BEGIN](container, this._sorting);
    this._sorting.setSortTypeChangeHandler(this._sortTypeChangeHandler(container));
  }


  /**
   * Метод, обеспечивающий отрисовку компонента _films вместе с сортировкой
   * @param {Object} container контейнер контроллера
   */
  _renderFilmsWithSorting(container) {
    this._renderSorting(container);
    this._renderFilmsComponent(this._getDataSet(container, this._films,
        this._filmsData, this._showedFilmContollers, 0, CountFilm.START)
    );
  }


  /**
   * Метод, обеспечивающий отрисовку компонента-контейнера фильмов
   * @param {Object} dataset объект с данными
   */
  _renderFilmsComponent(dataset) {
    render[Position.AFTER_BEGIN](dataset.container, dataset.filmsComponent);
    this._renderFilmsList(dataset);
  }


  /**
   * Метод, обеспечивающий отрисовку содержимого компонента-контейнера фильмов
   * @param {Object} dataset объект с данными
   */
  _renderFilmsList(dataset) {
    dataset.filmsList = dataset.filmsComponent.getElement().querySelector(FILM_LIST_CLASS);
    this._renderFilmControllers(dataset);

    if (dataset.countFilms < dataset.filmsData.length) {
      this._renderShowMoreBtn(dataset);
    }
  }


  /**
   * Метод, обеспечивающий создание и отрисовку контроллеров фильмов
   * @param {Object} dataset объект с данными
   */
  _renderFilmControllers(dataset) {
    dataset.filmsContollers.concat(renderFilmControllers(
        dataset.filmsList, dataset.filmsData.slice(dataset.countPrevFilms, dataset.countFilms),
        this._viewChangeHandler, this._dataChangeHandler, this._filmsModel.getFilter()
    ));
  }


  /**
   * Метод, обеспечивающий отрисовку компонента-кнопки показа скрытых фильмов
   * @param {Object} dataset объект с данными
   */
  _renderShowMoreBtn(dataset) {
    render[Position.BEFORE_END](dataset.filmsComponent.getElement(), this._showMoreBtn);
    this._showMoreBtn.setClickHandler(this._showMoreClickHandler(dataset));
  }


  /**
   * Метод, опеспечивающий обновление меню
   */
  _updateMenu() {
    remove(this._menuController._menu);
    this._renderMenu(this._container.getElement());
  }


  /**
   * Метод, обеспечивающий обновление контроллера фильма на основе новых данных
   * @param {Object} filmContoller контроллер карточек фильма
   * @param {Object} oldData прежние данные фильма
   * @param {Object} newData обновленные данные фильма
   * @return {Object}
   */
  _dataChangeHandler(filmContoller, oldData, newData) {
    const result = this._filmsModel.updateFilmData(oldData.id, newData);

    if (result.isUpdated) {
      this._updateMenu();
    }

    return result.filmData;
  }


  /**
   * Метод, обеспечивающий отображение каждого контроллера карточек фильма в режиме по умолчанию
   * @param {Object} FilmsContollers
   */
  _viewChangeHandler(FilmsContollers) {
    FilmsContollers.map((filmContoller) => filmContoller.setDefaultView());
  }


  /**
   * Метод, обеспечивающий удаление данных для компонента _films
   */
  _resetFilms() {
    this._showedFilmControllers = [];
    remove(this._films);
    remove(this._showMoreBtn);
  }


  /**
   * Метод, обеспечивающий удаление данных для компонента _films вместе с текущей выбранной сортировкой
   */
  _resetFilmsWithSorting() {
    remove(this._sorting);
    this._resetFilms();
  }


  /**
   * Метод, обеспечивающий создание помощника для отображения скрытых фильмов
   * @param {Object} dataset объект с данными
   * @return {Function} созданный помощник
   */
  _showMoreClickHandler(dataset) {
    return () => {
      dataset.countPrevFilms = dataset.countFilms;
      dataset.countFilms += CountFilm.BY_BUTTON;
      this._renderFilmControllers(dataset);

      if (dataset.countFilms >= dataset.filmsData.length) {
        remove(this._showMoreBtn);
      }
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для отображения отсортированных данных фильмов
   * @param {Object} container контейнер контроллера
   * @return {Function} созданный помощник
   */
  _sortTypeChangeHandler(container) {
    return (sortType) => {
      this._resetFilms();
      this._renderFilmsComponent(this._getDataSet(container,
          this._films, sortRules[sortType](this._filmsData),
          this._showedFilmContollers, 0, CountFilm.START, this._showMoreBtn)
      );
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для изменения отображаемого списка фильмов
   *  в соответствии с выбранным фильтром
   * @param {Object} container
   * @return {Function} созданный помощник
   */
  _filterChangeHandler(container) {
    return (filterType) => {

      this._filmsModel.setFilter(filterType);
      this._filmsData = this._filmsModel.getFilteringFilmsData();

      this._resetFilmsWithSorting();
      this._renderFilmsWithSorting(container);
    };
  }
}


export {PageController};
