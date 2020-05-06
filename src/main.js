import {CountFilm, Position} from "./consts";
import {renderMarkup} from "./utils/common";
import {render} from "./utils/components";
import {createProfileRank} from "./components/profile-rank";
import {createFooter} from "./components/footer";
import {generateFilms} from "./mock/films/film";
import {FilmsModel} from "./models/films-model";
import {Page} from "./components/page";
import {PageController} from "./controllers/page-controller";


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

  const filmsModel = new FilmsModel();
  filmsModel.setFilmsData(films);

  const pageComponent = new Page();
  const pageController = new PageController(pageComponent, filmsModel);

  renderMarkup(Nodes.HEADER, createProfileRank(filmsModel.getWatchedFilms()));
  render[Position.BEFORE_END](Nodes.MAIN, pageComponent);
  pageController.render();
  renderMarkup(Nodes.FOOTER_STATS, createFooter(films.length));
};


init();
