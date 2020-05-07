import FilmsModel from "./models/films-model";
import Page from "./components/page";
import PageController from "./controllers/page-controller";
import {CountFilm, Position} from "./consts";
import {renderMarkup} from "./utils/common";
import {render} from "./utils/components";
import {createFooter} from "./components/footer";
import {generateFilms} from "./mock/films/film";


const Nodes = {
  MAIN: document.querySelector(`.main`),
  FOOTER_STATS: document.querySelector(`.footer__statistics`)
};


/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  const films = generateFilms(CountFilm.ALL);

  const filmsModel = new FilmsModel();
  filmsModel.setFilmsData(films);

  const pageComponent = new Page();
  const pageController = new PageController(pageComponent, filmsModel);

  render[Position.BEFORE_END](Nodes.MAIN, pageComponent);
  pageController.render();
  renderMarkup(Nodes.FOOTER_STATS, createFooter(films.length));
};


init();
