import {CountFilm, ExtraName, Position, Sorting} from "../consts";
import {renderFilm} from "../helpers/film";
import {remove, render} from "../utils/components";
import {sortingArray} from "../utils/common";
import FilmsComponent from "../components/films/films";
import ShowMoreBtnComponent from "../components/show-more-button";
import FilmsExtraComponent from "../components/films-extra/films-extra";
import NoFilmsComponent from "../components/no-films";
import SortingComponent from "../components/sorting";
import MenuComponent from "../components/menu/menu";


/**
 * Отрисовка блока фильмов
 * @param {Object} filmsComponent блок фильмов
 * @param {Array} films фильмы
 */
const renderFilms = (filmsComponent, films) => {
  if (films.length) {
    let showingFilmsCount = CountFilm.START;

    const renderFilmsList = () => (film) => renderFilm(filmsComponent, film);

    films.slice(0, showingFilmsCount).map(renderFilmsList());

    if (filmsComponent.getElement().querySelector(`.films-list__show-more`)) {
      addShowMoreListener(filmsComponent, films, showingFilmsCount, renderFilmsList);
    }
  }
};


/**
 * Добавление лисенера на кнопку показа скрытых фильмов
 * @param {Object} filmsComponent блок фильмов
 * @param {Array} films фильмы
 * @param {Number} showingFilmsCount количество фильмов, ранее отображенных
 * @param {Function} renderFilmList отрисовка списка фильмов
 */
const addShowMoreListener = (filmsComponent, films, showingFilmsCount, renderFilmList) => {
  const showMore = filmsComponent.getElement().querySelector(`.films-list__show-more`);

  const showMoreClickHandler = () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += CountFilm.BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount).map(renderFilmList());

    if (showingFilmsCount >= films.length) {
      showMore.remove();
    }
  };

  showMore.addEventListener(`click`, showMoreClickHandler);
};


/**
 * Создание контроллера, обеспечивающего отрисовку компонентов на странице
 */
export default class BoardController {
  constructor(container, films) {
    this._container = container;

    this._films = films;
    this._menu = new MenuComponent(films);
    this._films = new FilmsComponent();
    this._filmsCommented = new FilmsExtraComponent(ExtraName.COMMENTED);
    this._filmsRated = new FilmsExtraComponent(ExtraName.RATED);
    this._showMoreBtn = new ShowMoreBtnComponent();
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortingComponent();
  }

  render(films) {
    const container = this._container.getElement();

    if (films.length) {
      render(container, this._menu, Position.BEFORE_BEGIN);
      render(container, this._sorting, Position.BEFORE_BEGIN);
      render(container, this._films);
      render(container, this._filmsRated);
      render(container, this._filmsCommented);

      renderFilms(this._films, films);
      renderFilms(this._filmsRated, sortingArray(films, Sorting.BY_RATING));
      renderFilms(this._filmsCommented, sortingArray(films, Sorting.BY_COMMENTS));

    } else {
      render(container, this._menu, Position.BEFORE_BEGIN);
      render(container, this._noFilms);
    }
  }

  replace() {
    this.removeData();
    this.render();
  }

  removeData() {
    remove(this._filmsComponent);
  }
}
