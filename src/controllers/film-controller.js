import {KeyCode, Position, CARD_ELEMENTS} from "../consts";
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
    this._filmCardComponent = new FilmCardComponent(filmData);
    this._filmDetailsComponent = new FilmDetailsComponent(filmData);

    CARD_ELEMENTS.map((cardElement) => this._showDetails(cardElement));
    this._filmDetailsComponent.setBtnCloseClickHandler(this._closeDetailsClickHandler());

    render[Position.BEFORE_END](this._container, this._filmCardComponent);
  }


  _closeDetails() {
    document.querySelector(`.film-details`).remove();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }


  _closeDetailsClickHandler() {
    return () => {
      if (document.querySelector(`.film-details`)) {
        this._closeDetails();
      }
    };
  }


  _showDetails(cardElement) {
    this._filmCardComponent.setClickHandler(this._showDetailsClickHandler(), cardElement);
  }


  _showDetailsClickHandler() {
    return () => {
      render[Position.AFTER_END](
          this._pageController._container.getElement(), this._filmDetailsComponent);
      document.addEventListener(`keydown`, this._escKeyDownHandler);
    };
  }


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeDetails();
    }
  }


  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      document.querySelector(`.film-details`).remove();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }
}
