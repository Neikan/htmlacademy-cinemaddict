import {KeyCode, Position} from "../consts";
import {render} from "../utils/components";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class FilmController {
  constructor(container, pageController) {
    this._container = container;

    this._mode = Mode.DEFAULT;
    this._pageController = pageController;
    this._viewChangeHandler = pageController._viewChangeHandler;
    this._dataChangeHandler = pageController._dataChangeHandler;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }
  render(filmData) {
    // const mainContainer = document.querySelector(`.main`);

    this._filmCardComponent = new FilmCardComponent(filmData);
    this._filmDetailsComponent = new FilmDetailsComponent(filmData);

    // const filmForm = {
    //   card: this._filmCardComponent,
    //   details: this._filmDetailsComponent
    // };

    // CARD_ELEMENTS.map(showDetails(filmForm, mainContainer, this._escKeyDownHandler));

    render[Position.BEFORE_END](this._container, this._filmCardComponent);
  }

  _showDetails() {}

  _closeDetails() {}


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeDetails();
    }
  }


  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._closeDetails();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }
}
