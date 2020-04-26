import {CountFilm, ExtraName, Position, Sorting} from "../consts";
import {renderFilm} from "../helpers/film";
import {render} from "../utils/components";
import {sortingArray} from "../utils/common";
import {addShowMoreListener} from "../components/show-more-button";
import FilmsComponent from "../components/films";
import ShowMoreBtnComponent from "../components/show-more-button";
import FilmsExtraComponent from "../components/films-extra";
import NoFilmsComponent from "../components/no-films";
import SortingComponent from "../components/sorting";
import MenuComponent from "../components/menu";


/**
 * Отрисовка блока фильмов
 * @param {Object} filmsComponent блок фильмов
 * @param {Array} films фильмы
 * @param {Object} showMoreBtnComponent кнопка показа скрытых фильмов
 */
const renderFilms = (filmsComponent, films, showMoreBtnComponent) => {
  if (films.length) {
    let showingFilmsCount = CountFilm.START;

    const renderFilmsList = () => (film) => renderFilm(filmsComponent, film);

    films.slice(0, showingFilmsCount).map(renderFilmsList());

    if (showMoreBtnComponent) {
      render(filmsComponent.getElement(), showMoreBtnComponent);
      addShowMoreListener(showMoreBtnComponent, films, showingFilmsCount, renderFilmsList);
    }
  }
};


/**
 * Создание контроллера, обеспечивающего отрисовку компонентов на странице
 */
export default class BoardController {
  constructor(container) {
    this._container = container;

    this._menu = null;
    this._films = new FilmsComponent();
    this._filmsCommented = new FilmsExtraComponent(ExtraName.COMMENTED);
    this._filmsRated = new FilmsExtraComponent(ExtraName.RATED);
    this._showMoreBtn = new ShowMoreBtnComponent();
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortingComponent();
  }

  render(films) {
    this._menu = new MenuComponent(films);
    const container = this._container.getElement();
    render(container, this._menu, Position.BEFORE_BEGIN);

    if (films.length) {
      render(container, this._sorting, Position.BEFORE_BEGIN);
      render(container, this._films);
      render(container, this._filmsRated);
      render(container, this._filmsCommented);

      renderFilms(this._films, films, this._showMoreBtn);
      renderFilms(this._filmsRated, sortingArray(films, Sorting.BY_RATING));
      renderFilms(this._filmsCommented, sortingArray(films, Sorting.BY_COMMENTS));

    } else {
      render(container, this._noFilms);
    }
  }
}
