import {CountFilm, KeyCode} from "./consts";
import {render} from "./utils";
import {createProfileRank} from "./components/profile-rank";
import {createMenu} from "./components/menu";
import {createSorting} from "./components/films/sorting";
import {createFilms} from "./components/films";
import {createStatistic} from "./components/stats";
import {createFilmDetails} from "./components/films/film-details";
import {createFilmCard} from "./components/films/film-card";
import {generateFilms} from "./mock/films/film";

const Nodes = {
  BODY: document.querySelector(`body`),
  HEADER: document.querySelector(`.header`),
  MAIN: document.querySelector(`.main`),
  FOOTER_STATS: document.querySelector(`.footer__statistics`)
};

const films = generateFilms(CountFilm.ALL);
let showingFilmsCount = CountFilm.START;

const showMoreClickHandler = () => {
  const filmsContainer = document.querySelector(`.films .films-list__container`);
  const prevTasksCount = showingFilmsCount;
  showingFilmsCount += CountFilm.BY_BUTTON;

  films.slice(prevTasksCount, showingFilmsCount)
    .forEach((film) => render(filmsContainer, createFilmCard(film)));

  if (showingFilmsCount >= films.length) {
    document.querySelector(`.films-list__show-more`).remove();
  }
};

const btnCloseDetailsClickHandler = () => {
  document.querySelector(`.film-details`).remove();
};

const btnCloseDetailsKeyDownHandler = function (evt) {
  if (evt.keyCode === KeyCode.ESC) {
    document.querySelector(`.film-details`).remove();
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
  document.querySelector(`.film-details__close-btn`).addEventListener(`click`, btnCloseDetailsClickHandler);
  document.addEventListener(`keydown`, btnCloseDetailsKeyDownHandler);
};

init();
