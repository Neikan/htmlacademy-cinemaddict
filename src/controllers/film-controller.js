import {KeyCode, Position, Attribute} from "../consts";
import {render, remove, replace} from "../utils/components";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";

const NODE_MAIN = `main`;

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

/**
 * Получение помощника для изменения атрибутов фильма
 * @param {Object} filmController контроллер карточек фильма
 * @param {Object} filmData данные фильма
 * @param {string} attribute изменяемый атрибут фильма
 * @return {Function} созданный помощник
 */
const getHandler = (filmController, filmData, attribute) => {
  return (evt) => {
    evt.preventDefault();
    filmController._dataChangeHandler(filmController, filmData, Object.assign({}, filmData, {
      [attribute]: !filmData[attribute]
    }));
  };
};


class FilmController {
  constructor(container, viewChangeHandler, dataChangeHandler) {
    this._container = container;

    this._mode = Mode.DEFAULT;
    this._viewChangeHandler = viewChangeHandler;
    this._dataChangeHandler = dataChangeHandler;
    this._filmCard = null;
    this._filmDetails = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }


  render(filmData) {
    const oldFilmCard = this._filmCard;
    const oldFilmDetails = this._filmDetails;
    const mainSection = document.querySelector(NODE_MAIN);

    this._filmCard = new FilmCardComponent(filmData);
    this._filmDetails = new FilmDetailsComponent(filmData);

    this._setCardHandlers(filmData, mainSection);
    this._setDetailsHandlers();
    this._replaceOldFilm(oldFilmCard, oldFilmDetails);
  }


  _setCardHandlers(filmData, mainSection) {
    this._filmCard.setClickHandler(this._showDetailsClickHandler(mainSection));

    this._filmCard.setBtnWatchlistClickHandler(getHandler(this, filmData, Attribute.IS_WATCH));
    this._filmCard.setBtnWatchedClickHandler(getHandler(this, filmData, Attribute.IS_WATCHED));
    this._filmCard.setBtnFavoriteClickHandler(getHandler(this, filmData, Attribute.IS_FAVORITE));
  }


  _setDetailsHandlers() {
    this._filmDetails.setBtnCloseClickHandler(() => {
      this._removeDetails();
    });

    this._filmDetails._subscribeOnEvents();
  }


  _showDetailsClickHandler(mainSection) {
    return () => {
      render[Position.BEFORE_END](mainSection, this._filmDetails);
      this._mode = Mode.DETAILS;
      document.addEventListener(`keydown`, this._escKeyDownHandler);

      this._setDetailsHandlers();
    };
  }


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeDetails();
    }
  }


  _replaceOldFilm(oldFilmCard, oldFilmDetails) {
    if (oldFilmCard && oldFilmDetails) {
      replace(this._filmCard, oldFilmCard);
      replace(this._filmDetails, oldFilmDetails);
    } else {
      render[Position.BEFORE_END](this._container, this._filmCard);
    }
  }


  _removeDetails() {
    remove(this._filmDetails);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }


  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._removeDetails();
    }
  }
}


export {FilmController};
