import {MenuController} from "./menu-controller";
import {FilmController} from "./film-controller";
import {Films} from "../components/films";
import {FilmsExtra} from "../components/films-extra";
import {NoFilms} from "../components/no-films";
import {ShowMoreBtn} from "../components/show-more-button";
import {Sorting} from "../components/sorting";
import {
  CountFilm, ExtraName, Position, Flag, FilmsBlock,
  SortType, Mode, FilmsElement
} from "../consts";
import {render, remove} from "../utils/components";


/**
 * Создание контроллера, обеспечивающего отрисовку фильмов
 * @param {Object} filmsList список фильмов
 * @param {Array} filmsData данные фильмов
 * @param {Function} viewChangeHandler метод контроллера страницы,
 *  обеспечивающий установку отображения контроллера фильма в режим по умолчанию
 * @param {Function} dataChangeHandler метод контроллера страницы,
 *  обеспечивающий изменение данных фильма и перерисовку карточки фильма
 * @param {Function} pageUpdateHandler метод котроллера страницы, обеспечивающий обновление меню
 * @param {Object} filterType примененный фильтр
 * @param {string} filmsBlock название блока фильмов
 * @return {Array} массив контроллеров карточек фильмов
 */
const renderFilmControllers = (
    filmsList, filmsData, viewChangeHandler,
    dataChangeHandler, pageUpdateHandler, filterType, filmsBlock
) => {
  return filmsData.map((filmData) => {
    const filmController = new FilmController(
        filmsList, viewChangeHandler, dataChangeHandler,
        pageUpdateHandler, filterType, filmsBlock
    );

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

    this._filmsModel = filmsModel;
    this._showedFilmControllers = [];
    this._showedFilmRatedContollers = [];
    this._showedFilmCommentedContollers = [];
    this._films = new Films();
    this._filmsCommented = new FilmsExtra(ExtraName.COMMENTED);
    this._filmsRated = new FilmsExtra(ExtraName.RATED);
    this._showMoreBtn = new ShowMoreBtn();
    this._noFilms = null;
    this._sorting = null;
    this._menuController = null;
    this._countFilms = CountFilm.START;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._showMoreClickHandler = this._showMoreClickHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._pageUpdateHandler = this._pageUpdateHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий отрисовку данных фильмов
   * @param {Array} films данные фильмов
   */
  render() {
    const container = this._container.getElement();

    this._renderMenu(container);

    if (!this._filmsModel.getFilmsData().length) {
      this._renderNoFilms(container, Flag.NO);
      return;
    }

    this._renderFilmsBlocks(container);
  }


  /**
   * Метод, обеспечивающий установку значений по умолчанию
   */
  _setDefaults() {
    this._countFilms = CountFilm.START;
  }


  /**
   * Метод, собирающий данные для отрисовки в единый объект
   * @param {Object} container контейнер контроллера
   * @param {Object} filmsComponent компонент-контейнер фильмов
   * @param {Array} filmsData данные фильмов
   * @param {Array} filmsContollers контроллеры отрисованных фильмов
   * @param {Number} countPrevFilms предыдущее количество отрисованных фильмов
   * @param {Number} countFilms текущее количество отрисованных фильмов
   * @param {string} filmsBlock название блока фильмов
   * @param {Object} filmList список фильмов в компоненте-контейнере фильмов
   * @return {Object} созданный объект с данными
   */
  _getDataSet(container, filmsComponent, filmsData, filmsContollers,
      countPrevFilms, countFilms, filmsBlock, filmList
  ) {
    return {
      container, filmsComponent, filmsData, filmsContollers,
      countPrevFilms, countFilms, filmsBlock, filmList
    };
  }


  /**
   * Метод, обеспечивающий создание и отрисовку компонента отсутствия соответствующих
   *  фильмов фильтру или вообще отсутствия фильмов в базе
   * @param {Object} container контейнер контроллера
   * @param {Boolean} isFilter флаг, определяющий применен ли фильтр
   */
  _renderNoFilms(container, isFilter) {
    this._noFilms = new NoFilms(isFilter);
    render[Position.BEFORE_BEGIN](container, this._noFilms);
  }


  /**
   * Метод, обеспечивающий обновление компонента меню
   * @param {Object} container контейнер контроллера
   */
  _renderMenu(container) {
    this._menuController = new MenuController(container.parentElement, this._filmsModel);
    this._menuController.render();
    this._menuController._menu.setFilterChangeHandler(this._filterTypeChangeHandler(container));
  }


  /**
   * Метод, обеспечивающий отрисовку компонентов-контейнеров фильмов
   * @param {Object} container контейнер контроллера
   */
  _renderFilmsBlocks(container) {
    this._renderFilmsCommented(container);
    this._renderFilmsRated(container);
    this._renderFilmsWithSorting(container);
  }


  /**
   * Метод, обеспечивающий отрисовку компонента самых обсуждаемых фильмов
   * @param {Object} container контейнер контроллера
   * @param {string} position позиция отрисовываемого блока
   */
  _renderFilmsCommented(container, position = Position.AFTER_BEGIN) {
    if (!this._filmsModel.getCommentedFilmsData().length) {
      return;
    }

    this._showedFilmCommentedContollers = this._renderFilmsComponent(
        this._getDataSet(
            container, this._filmsCommented, this._filmsModel.getSortedFilmsDataByComments(),
            this._showedFilmCommentedContollers, 0, CountFilm.EXTRA, FilmsBlock.COMMENTED
        ),
        position
    );
  }


  /**
   * Метод, обеспечивающий отрисовку компонента высокорейтинговых фильмов
   * @param {Object} container контейнер контроллера
   * @param {string} position позиция отрисовываемого блока
   */
  _renderFilmsRated(container, position = Position.AFTER_BEGIN) {
    if (!this._filmsModel.getRatedFilmsData().length) {
      return;
    }

    this._showedFilmRatedContollers = this._renderFilmsComponent(
        this._getDataSet(
            container, this._filmsRated, this._filmsModel.getSortedFilmsDataByRating(),
            this._showedFilmRatedContollers, 0, CountFilm.EXTRA, FilmsBlock.RATED
        ),
        position
    );
  }


  /**
   * Метод, обеспечивающий отрисовку компонента всех фильмов
   * @param {Object} container контейнер контроллера
   * @param {string} position позиция отрисовываемого блока
   */
  _renderFilms(container, position = Position.AFTER_BEGIN) {
    this._showedFilmControllers = this._renderFilmsComponent(
        this._getDataSet(
            container, this._films, this._filmsModel.getFilteringFilmsData(),
            this._showedFilmControllers, 0, this._countFilms, FilmsBlock.ALL
        ),
        position
    );
  }


  /**
   * Метод, обеспечивающий отрисовку компонента сортировки и добавление слушателей на него
   * @param {Object} container контейнер контроллера
   */
  _renderSorting(container) {
    this._sorting = new Sorting(this._filmsModel.getSortType());
    render[Position.BEFORE_BEGIN](container, this._sorting);
    this._sorting.setSortTypeChangeHandler(this._sortTypeChangeHandler(container));
  }


  /**
   * Метод, обеспечивающий отрисовку компонента _films вместе с сортировкой
   * @param {Object} container контейнер контроллера
   * @param {string} position позиция отрисовываемого блока
   */
  _renderFilmsWithSorting(container) {
    this._renderSorting(container);
    this._renderFilms(container);
  }


  /**
   * Метод, обеспечивающий отрисовку компонента-контейнера фильмов
   * @param {Object} dataset объект с данными
   * @param {string} position позиция отрисовываемого блока
   * @return {Array} массив контроллеров фильмов
   */
  _renderFilmsComponent(dataset, position) {
    render[position](dataset.container, dataset.filmsComponent);
    this._renderFilmsList(dataset);

    return dataset.filmsContollers;
  }


  /**
   * Метод, обеспечивающий отрисовку содержимого компонента-контейнера фильмов
   * @param {Object} dataset объект с данными
   */
  _renderFilmsList(dataset) {
    dataset.filmsList = dataset.filmsComponent.getElement().querySelector(FilmsElement.FILM_LIST);
    this._renderFilmControllers(dataset);

    if (dataset.countFilms < dataset.filmsData.length && dataset.filmsBlock === FilmsBlock.ALL) {
      this._renderShowMoreBtn(dataset);
    }
  }


  /**
   * Метод, обеспечивающий создание и отрисовку контроллеров фильмов
   * @param {Object} dataset объект с данными
   */
  _renderFilmControllers(dataset) {
    dataset.filmsContollers = dataset.filmsContollers.concat(renderFilmControllers(
        dataset.filmsList, dataset.filmsData.slice(dataset.countPrevFilms, dataset.countFilms),
        this._viewChangeHandler, this._dataChangeHandler,
        this._pageUpdateHandler, this._filmsModel.getFilterType(), dataset.filmsBlock
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
   * Метод, обеспечивающий отрисовку компонента-контейнера фильмов или компонента их отсутствия
   * @param {Object} container
   */
  _renderFilmsOrNoFilms(container) {
    if (!this._filmsModel.getFilteringFilmsData().length) {
      this._renderNoFilms(container, Flag.YES);
      this._resetSorting();
    } else {
      this._renderFilmsWithSorting(container);
    }
  }


  /**
   * Метод, обеспечивабщий обновление блоков фильмов при изменении фильма в другом блоке
   * @param {string} filmsBlockInitiator название блока, в котором произошло изменение фильма
   * @param {Object} container контейнер контроллера
   * @param {string} mode режим карточки, в которой были инициированы изменения
   */
  _updateFilmsBlocks(filmsBlockInitiator, container, mode) {
    const updateRules = {
      'all-films': () => this._updateFilmsIfTargetAllFilms(container),
      'top-rated': () => this._updateFilmsIfTargetRated(container),
      'most-commented': () => this._updateFilmsIfTargetCommented(container, mode)
    };

    updateRules[filmsBlockInitiator]();
  }


  /**
   * Метод, обеспечивабщий обновление блоков фильмов при изменении фильма в блоке высокорейтинговых фильмов
   * @param {Object} container контейнер контроллера
   */
  _updateFilmsIfTargetRated(container) {
    this._resetFilmsWithSorting();
    this._resetFilmsCommented();
    this._renderFilmsOrNoFilms(container);
    this._renderFilmsCommented(container, Position.BEFORE_END);
  }


  /**
   * Метод, обеспечивабщий обновление блоков фильмов при изменении фильма в блоке самыз комментируемых фильмов
   * @param {Object} container контейнер контроллера
   * @param {string} mode режим карточки, в которой были инициированы изменения
   */
  _updateFilmsIfTargetCommented(container, mode) {
    this._resetFilmsWithSorting();
    this._resetFilmsRated();
    this._renderFilmsRated(container, Position.AFTER_BEGIN);
    this._renderFilmsOrNoFilms(container);

    if (mode === Mode.DETAILS) {
      this._resetFilmsCommented();
      this._renderFilmsCommented(container, Position.BEFORE_END);
    }
  }


  /**
   * Метод, обеспечивабщий обновление блоков фильмов при изменении фильма в блоке всех фильмов
   * @param {Object} container контейнер контроллера
   */
  _updateFilmsIfTargetAllFilms(container) {
    this._resetFilmsRated();
    this._resetFilmsCommented();
    this._renderFilmsRated(container, Position.BEFORE_END);
    this._renderFilmsCommented(container, Position.BEFORE_END);
  }


  /**
   * Метод, обеспечивающий удаление данных для компонента _films
   */
  _resetFilms() {
    this._showedFilmControllers = [];
    remove(this._films);
    remove(this._showMoreBtn);
    this._resetNoFilms();
  }


  /**
   * Метод, обеспечивающий удаление данных для компонента _filmsCommented
   */
  _resetFilmsCommented() {
    if (!this._filmsModel.getCommentedFilmsData().length) {
      return;
    }

    this._showedFilmCommentedContollers = [];
    remove(this._filmsCommented);
  }


  /**
   * Метод, обеспечивающий удаление данных для компонента _filmsRated
   */
  _resetFilmsRated() {
    if (!this._filmsModel.getRatedFilmsData().length) {
      return;
    }

    this._showedFilmRatedContollers = [];
    remove(this._filmsRated);
  }


  /**
   * Метод, обеспечивающий сброс сортировки
   */
  _resetSorting() {
    remove(this._sorting);
    this._filmsModel.setSortType(SortType.DEFAULT);
  }


  /**
   * Метод, обеспечивающий удаление данных для компонента _films вместе с сортировкой
   */
  _resetFilmsWithSorting() {
    remove(this._sorting);
    this._resetFilms();
  }


  /**
   * Метод, обеспечивающий удаление данных для компонента _noiFilms
   */
  _resetNoFilms() {
    if (this._noFilms) {
      remove(this._noFilms);
    }
  }


  /**
   * Метод, обеспечивающий обновление страницы
   * @param {string} filmsBlockInitiator название блока, в котором произошло изменение фильма
   * @param {string} mode режим карточки, в которой были инициированы изменения
   */
  _pageUpdateHandler(filmsBlockInitiator, mode) {
    const container = this._container.getElement();

    remove(this._menuController._menu);
    this._renderMenu(container);
    this._updateFilmsBlocks(filmsBlockInitiator, container, mode);
  }


  /**
   * Метод, обеспечивающий обновление контроллера фильма на основе новых данных
   * @param {Object} oldData прежние данные фильма
   * @param {Object} newData обновленные данные фильма
   * @return {Object} обновленные данные фильма
   */
  _dataChangeHandler(oldData, newData) {
    return this._filmsModel.updateFilmData(oldData.id, newData);
  }


  /**
   * Метод, обеспечивающий отображение каждого контроллера карточек фильма в режиме по умолчанию
   * @param {Object} FilmsContollers
   */
  _viewChangeHandler() {
    let allFilmControllers = this._showedFilmControllers
        .concat(this._showedFilmRatedContollers)
        .concat(this._showedFilmCommentedContollers);

    allFilmControllers.map((filmContoller) => filmContoller.setDefaultView());
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
      this._countFilms = dataset.countFilms;
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
      this._setDefaults();
      this._filmsModel.setSortType(sortType);
      this._resetFilmsWithSorting();
      this._renderFilmsOrNoFilms(container);
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для изменения отображаемого списка фильмов
   *  в соответствии с выбранным фильтром
   * @param {Object} container
   * @return {Function} созданный помощник
   */
  _filterTypeChangeHandler(container) {
    return (filterType) => {
      this._setDefaults();
      this._filmsModel.setFilterType(filterType);
      this._filmsModel.setSortType(SortType.DEFAULT);
      this._resetFilmsWithSorting();
      this._renderFilmsOrNoFilms(container);
    };
  }
}


export {PageController};
