import {render} from "./utils";
import {createProfileRank} from "./components/profile/profile-rank";
import {createMenu} from "./components/menu/menu";
import {createSorting} from "./components/sorting/sorting";
import {createFilms} from "./components/films/films";
import {createFilmDetails} from "./components/films/film-details";
import {createStatistic} from "./components/statistic/stats";
import {Count} from "./consts";
import {generateFilms} from "./mock/film";
import {createFilmCard} from "./components/films/film-card";


const Nodes = {
  BODY: document.querySelector(`body`),
  HEADER: document.querySelector(`.header`),
  MAIN: document.querySelector(`.main`),
  FOOTER_STATS: document.querySelector(`.footer__statistics`)
};

const films = generateFilms(Count.FILMS);
let showingFilmsCount = Count.FILMS_ON_START;

const showMoreClickHandler = () => {
  const filmsContainer = document.querySelector(`.films .films-list__container`);
  const prevTasksCount = showingFilmsCount;
  showingFilmsCount += Count.FILMS_BY_BUTTON;

  films.slice(prevTasksCount, showingFilmsCount)
    .forEach((film) => render(filmsContainer, createFilmCard(film)));

  if (showingFilmsCount >= films.length) {
    document.querySelector(`.films-list__show-more`).remove();
  }
};


/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  render(Nodes.HEADER, createProfileRank(films));
  render(Nodes.MAIN, createMenu(films));
  render(Nodes.MAIN, createSorting());
  render(Nodes.MAIN, createFilms(films));
  render(Nodes.FOOTER_STATS, createStatistic());
  render(Nodes.BODY, createFilmDetails(films[0]));

  document.querySelector(`.films-list__show-more`).addEventListener(`click`, showMoreClickHandler);
};

init();
