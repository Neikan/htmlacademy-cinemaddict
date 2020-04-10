import {render} from "./utils";
import {createProfileRank} from "./components/profile/profile-rank";
import {createMenu} from "./components/menu/menu";
import {createSorting} from "./components/sorting/sorting";
import {createFilms} from "./components/films/films";
import {createFilmDetails} from "./components/films/film-details";
import {createStatistic} from "./components/statistic/stats";


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
