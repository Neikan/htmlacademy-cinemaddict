import {CountFilm, ExtraName, Sorting, Position} from "./consts";
import {render, renderComponent, sortingArray} from "./utils";
import {createProfileRank} from "./components/profile/profile-rank";
import {createSorting} from "./components/films/components/sorting";
import {createStatistic} from "./components/stats/stats";
import {generateFilms} from "./mock/films/film";
import {renderFilms} from "./helpers/films";
import MenuComponent from "./components/menu/menu";
import FilmsComponent from "./components/films/films";
import FilmsExtraComponent from "./components/films-extra/films-extra";


const Nodes = {
  BODY: document.querySelector(`body`),
  HEADER: document.querySelector(`.header`),
  MAIN: document.querySelector(`.main`),
  FOOTER_STATS: document.querySelector(`.footer__statistics`)
};


/**
 * Создание контейнера фильмов
 * @param {Element} container
 * @param {Object} component
 * @param {Array} films
 * @param {string} position
 * @return {Object}
 */
export const createFilmsComponent = (container, component, films, position) => {
  const newComponent = component;
  renderComponent(container, newComponent.getElement(), position);
  renderFilms(newComponent, films);
  return newComponent;
};


/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  const films = generateFilms(CountFilm.ALL);

  render(Nodes.HEADER, createProfileRank(films));
  renderComponent(Nodes.MAIN, new MenuComponent(films).getElement());
  render(Nodes.MAIN, createSorting());

  const filmsComponent = createFilmsComponent(Nodes.MAIN, new FilmsComponent(), films);
  const endFilmList = filmsComponent.getElement().querySelector(`.films-list`);

  createFilmsComponent(
      endFilmList,
      new FilmsExtraComponent(ExtraName.COMMENTED),
      sortingArray(films, Sorting.BY_COMMENTS),
      Position.AFTER_END
  );

  createFilmsComponent(
      endFilmList,
      new FilmsExtraComponent(ExtraName.RATED),
      sortingArray(films, Sorting.BY_RATING),
      Position.AFTER_END
  );

  render(Nodes.FOOTER_STATS, createStatistic());
};


init();
