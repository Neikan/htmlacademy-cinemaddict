import API from "./api/index";
import Store from "./api/store";
import Provider from "./api/provider";
import FilmsModel from "./models/films";
import Page from "./components/page";
import PageController from "./controllers/page";
import {Position, Flag} from "./consts";
import {renderMarkup, generateToken} from "./utils/common";
import {render, remove} from "./utils/components";
import {createFooter} from "./components/footer";
import Loader from "./components/loader";
import NoFilms from "./components/no-films";


const PAGE_STATUS = ` [offline]`;
const AUTHORIZATION = `Basic ${generateToken()}`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const Nodes = {
  MAIN: document.querySelector(`.main`),
  FOOTER_STATS: document.querySelector(`.footer__statistics`)
};

const StoreName = {
  FILMS: `cinemaddict-localstorage-filmsdata-v2`,
  COMMENTS: `cinemaddict-localstorage-commentsdata-v2`
};


/**
 * Отрисовка компонентов на странице
 */
const init = () => {
  const api = new API(AUTHORIZATION, END_POINT);
  const storeFilmsData = new Store(StoreName.FILMS, window.localStorage);
  const storeCommentsData = new Store(StoreName.COMMENTS, window.localStorage);
  const apiWithProvider = new Provider(api, storeFilmsData, storeCommentsData);

  const pageComponent = new Page();
  const loaderComponent = new Loader();

  render[Position.BEFORE_END](Nodes.MAIN, pageComponent);
  render[Position.BEFORE_END](Nodes.MAIN, loaderComponent);

  apiWithProvider.getFilmsData()
    .then((filmsData) => {
      const filmsModel = new FilmsModel();
      filmsModel.setFilmsData(filmsData);

      const pageController = new PageController(pageComponent, filmsModel, apiWithProvider);

      pageController.render();
      remove(loaderComponent);
      renderMarkup(Nodes.FOOTER_STATS, createFooter(filmsData.length));
    })
    .catch(() => {
      remove(loaderComponent);
      render[Position.BEFORE_END](Nodes.MAIN, new NoFilms(Flag.NO));
    });


  window.addEventListener(`load`, () => {
    navigator.serviceWorker.register(`/sw.js`)
      .then(() => {
      })
      .catch(() => {
      });
  });

  window.addEventListener(`online`, () => {
    document.title = document.title.replace(`${PAGE_STATUS}`, ``);

    if (!apiWithProvider.getIsSynchronized()) {
      apiWithProvider.sync()
        .then(() => {
        })
        .catch(() => {
        });
    }
  });

  window.addEventListener(`offline`, () => {
    document.title += `${PAGE_STATUS}`;
  });
};


init();
