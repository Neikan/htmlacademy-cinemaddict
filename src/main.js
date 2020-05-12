import API from "./api";
import FilmsModel from "./models/films";
import Page from "./components/page";
import PageController from "./controllers/page";
import {Position} from "./consts";
import {renderMarkup, generateId} from "./utils/common";
import {render, remove} from "./utils/components";
import {createFooter} from "./components/footer";
import Loader from "./components/loader";


const AUTHORIZATION = `Basic ${generateId()}`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const Nodes = {
  MAIN: document.querySelector(`.main`),
  FOOTER_STATS: document.querySelector(`.footer__statistics`)
};


/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  const api = new API(AUTHORIZATION, END_POINT);
  const pageComponent = new Page();
  const loaderComponent = new Loader();

  render[Position.BEFORE_END](Nodes.MAIN, pageComponent);
  render[Position.BEFORE_END](Nodes.MAIN, loaderComponent);

  api.getFilmsData()
    .then((filmsData) => {
      const filmsModel = new FilmsModel(api);
      filmsModel.setFilmsData(filmsData);

      const promises = filmsData.map((filmData) => api
        .getCommentsData(filmData.id)
        .then((commentsData) => commentsData)
      );

      Promise.all(promises).then((commentsData) => {
        const pageController = new PageController(pageComponent, filmsModel);

        filmsModel.setCommentsData(commentsData);
        pageController.render();
        remove(loaderComponent);
        renderMarkup(Nodes.FOOTER_STATS, createFooter(filmsData.length));
      });
    });
};


init();
