import {CountFilm} from "./consts";
import {render, renderComponent} from "./utils";
import {createProfileRank} from "./components/profile/profile-rank";
import {createSorting} from "./components/films/components/sorting";
import {createStatistic} from "./components/stats/stats";
import {generateFilms} from "./mock/films/film";
import FilmsComponent, {renderFilms} from "./components/films/films";
import MenuComponent from "./components/menu/menu";

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
  const films = generateFilms(CountFilm.ALL);
  const filmsComponent = new FilmsComponent(films);

  render(Nodes.HEADER, createProfileRank(films));
  renderComponent(Nodes.MAIN, new MenuComponent(films).getElement());
  render(Nodes.MAIN, createSorting());
  renderComponent(Nodes.MAIN, filmsComponent.getElement());
  renderFilms(filmsComponent, films);
  render(Nodes.FOOTER_STATS, createStatistic());
};

init();
