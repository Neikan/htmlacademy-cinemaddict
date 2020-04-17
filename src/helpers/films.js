import {CountFilm} from "../consts";
import {renderFilm} from "./film";


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


export {renderFilms};
