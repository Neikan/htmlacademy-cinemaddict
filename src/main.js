import {CountFilm, Position} from "./consts";
import {renderMarkup} from "./utils/common";
import {render} from "./utils/components";
import {createProfileRank} from "./components/profile-rank";
import {createStatistic} from "./components/stats";
import {generateFilms} from "./mock/films/film";
import PageComponent from "./components/page";
import PageController from "./controllers/page-controller";


const Nodes = {
  HEADER: document.querySelector(`.header`),
  MAIN: document.querySelector(`.main`),
  FOOTER_STATS: document.querySelector(`.footer__statistics`)
};


/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  const films = generateFilms(CountFilm.ALL);
  const pageComponent = new PageComponent();
  const pageController = new PageController(pageComponent, films);

  renderMarkup(Nodes.HEADER, createProfileRank(films));
  render[Position.BEFORE_END](Nodes.MAIN, pageComponent);
  pageController.render(films);
  renderMarkup(Nodes.FOOTER_STATS, createStatistic());
};


init();
