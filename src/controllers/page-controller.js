import {CountFilm, ExtraName, Position, Sorting} from "../consts";
import {render, remove} from "../utils/components";
import {sortingArray, getIndex} from "../utils/common";
import FilmsComponent from "../components/films";
import {ShowMoreBtn} from "../components/show-more-button";
import FilmsExtraComponent from "../components/films-extra";
import NoFilmsComponent from "../components/no-films";
import {SortComponent, sortRules} from "../components/sorting";
import MenuComponent from "../components/menu";
import {FilmController} from "./film-controller";


const FILM_LIST_CLASS = `.films-list__container`;

/**
 * Создание контроллера, обеспечивающего отрисовку фильмов
 * @param {Object} filmsList список фильмов
 * @param {Array} filmsData данные фильмов
 * @param {Function} viewChangeHandler метод контроллера страницы,
 *  обеспечивающий установку отображения контроллера фильма в режим по умолчанию
 * @param {Function} dataChangeHandler метод контроллера страницы,
 *  обеспечивающий изменение данных фильма и перерисовку карточки фильма
 * @return {Array} массив контроллеров карточек фильмов
 */
const renderFilmControllers = (filmsList, filmsData, viewChangeHandler, dataChangeHandler) => {
  return filmsData.map((filmData) => {
    const filmController = new FilmController(filmsList, viewChangeHandler, dataChangeHandler);
    filmController.render(filmData);

    return filmController;
  });
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
    this._showMoreBtn = new ShowMoreBtn();
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortComponent();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._showMoreClickHandler = this._showMoreClickHandler.bind(this);
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
    this._renderSorting(container);
    this._renderFilms(container);
  }


  /**
   * Метод, обеспечивающий создание и отрисовку компонента меню
   * @param {Object} container контейнер контроллера
   */
  _renderMenu(container) {
    this._menu = new MenuComponent(this._filmsData);
    render[Position.BEFORE_BEGIN](container, this._menu);
  }


  /**
   * Метод, обеспечивающий отрисовку компонента сортировки и добавление слушателей на него
   * @param {Object} container контейнер контроллера
   */
  _renderSorting(container) {
    render[Position.BEFORE_BEGIN](container, this._sorting);
    this._sorting.setSortTypeChangeHandler(this._sortTypeChangeHandler(container));
  }


  /**
   * Метод, обеспечивающий отрисовку компонентов-контейнеров фильмов
   * @param {Object} container контейнер контроллера
   */
  _renderFilms(container) {
    this._renderFilmsComponent(container, this._filmsCommented,
        sortingArray(this._filmsData, Sorting.BY_COMMENTS),
        this._showedFilmCommentedContollers, 0, CountFilm.EXTRA
    );
    this._renderFilmsComponent(container, this._filmsRated,
        sortingArray(this._filmsData, Sorting.BY_RATING),
        this._showedFilmRatedContollers, 0, CountFilm.EXTRA
    );
    this._renderFilmsComponent(container, this._films, this._filmsData,
        this._showedFilmContollers, 0, CountFilm.START
    );
  }


  /**
   * Метод, обеспечивающий отрисовку компонента-контейнера фильмов
   * @param {Object} container контейнер контроллера
   * @param {Object} filmsComponent компонент-контейнер фильмов
   * @param {Array} filmsData данные фильмов
   * @param {Array} filmsContollers контроллеры отрисованных фильмов
   * @param {Number} countPrevFilms предыдущее количество отрисованных фильмов
   * @param {Number} countFilms текущее количество отрисованных фильмов
   * @param {Object} showMoreBtn компонент-кнопка показа скрытых фильмов
   */
  _renderFilmsComponent(container, filmsComponent, filmsData,
      filmsContollers, countPrevFilms, countFilms
  ) {
    render[Position.AFTER_BEGIN](container, filmsComponent);
    this._renderFilmsList(filmsComponent, filmsData, filmsContollers,
        countPrevFilms, countFilms);
  }


  /**
   * Метод, обеспечивающий отрисовку содержимого компонента-контейнера фильмов
   * @param {Object} filmsComponent компонент-контейнер фильмов
   * @param {Array} filmsData данные фильмов
   * @param {Array} filmsContollers контроллеры отрисованных фильмов
   * @param {Number} countPrevFilms предыдущее количество отрисованных фильмов
   * @param {Number} countFilms текущее количество отрисованных фильмов
   * @param {Object} showMoreBtn компонент-кнопка показа скрытых фильмов
   */
  _renderFilmsList(filmsComponent, filmsData, filmsContollers, countPrevFilms, countFilms) {
    const filmsList = filmsComponent.getElement().querySelector(FILM_LIST_CLASS);
    this._renderFilmControllers(filmsData, filmsContollers, countPrevFilms, countFilms, filmsList);

    if (countFilms < filmsData.length) {
      this._renderShowMoreBtn(filmsComponent, filmsData, filmsContollers, countFilms, filmsList);
    }
  }


  /**
   * Метод, обеспечивающий создание и отрисовку контроллеров фильмов
   * @param {Array} filmsData данные фильмов
   * @param {Array} filmsContollers контроллеры отрисованных фильмов
   * @param {Number} countPrevFilms предыдущее количество отрисованных фильмов
   * @param {Number} countFilms текущее количество отрисованных фильмов
   * @param {Object} filmsList список фильмов в компоненте-контейнере фильмов
   */
  _renderFilmControllers(filmsData, filmsContollers, countPrevFilms, countFilms, filmsList) {
    filmsContollers.concat(renderFilmControllers(
        filmsList, filmsData.slice(countPrevFilms, countFilms),
        this._viewChangeHandler, this._dataChangeHandler
    ));
  }


  /**
   * Метод, обеспечивающий отрисовку компонента-кнопки показа скрытых фильмов
   * @param {Object} filmsComponent компонент-контейнер фильмов
   * @param {Array} filmsData данные фильмов
   * @param {Array} filmsContollers контроллеры отрисованных фильмов
   * @param {Number} countFilms текущее количество отрисованных фильмов
   * @param {Object} filmsList список фильмов в компоненте-контейнере фильмов
   */
  _renderShowMoreBtn(filmsComponent, filmsData, filmsContollers, countFilms, filmsList) {
    render[Position.BEFORE_END](filmsComponent.getElement(), this._showMoreBtn);
    this._showMoreBtn.setClickHandler(this._showMoreClickHandler(filmsData, filmsContollers, countFilms, filmsList));
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
   * Метод, обеспечивающий создание помощника для отображения скрытых фильмов
   * @param {Array} filmsData данные фильмов
   * @param {Array} filmsContollers контроллеры отрисованных фильмов
   * @param {Number} countFilms текущее количество отрисованных фильмов
   * @param {Object} filmsList список фильмов в компоненте-контейнере фильмов
   * @return {Function} созданный помощник
   */
  _showMoreClickHandler(filmsData, filmsContollers, countFilms, filmsList) {
    return () => {
      const prevFilmsCount = countFilms;
      countFilms += CountFilm.BY_BUTTON;
      this._renderFilmControllers(filmsData, filmsContollers, prevFilmsCount, countFilms, filmsList);

      if (countFilms >= filmsData.length) {
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
      this._renderFilmsComponent(container, this._films, sortRules[sortType](this._filmsData),
          this._showedFilmContollers, 0, CountFilm.START, this._showMoreBtn
      );
    };
  }
}


export {PageController};
