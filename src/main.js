import {createProfileRank} from "./components/profile-rank";
import {createMenu} from "./components/menu";
import {createSorting} from "./components/sorting";
import {createFilms} from "./components/films";
import {createFilmDetails} from "./components/film-details";
import {createStatistic} from "./components/stats";
import {render} from "./components/utils";

const Nodes = {
  BODY: document.querySelector(`body`),
  HEADER: document.querySelector(`.header`),
  MAIN: document.querySelector(`.main`),
  FOOTER_STATS: document.querySelector(`.footer__statistics`)
};

/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  render(Nodes.HEADER, createProfileRank());
  render(Nodes.MAIN, createMenu());
  render(Nodes.MAIN, createSorting());
  render(Nodes.MAIN, createFilms());
  render(Nodes.FOOTER_STATS, createStatistic());
  render(Nodes.BODY, createFilmDetails());
};

init();
