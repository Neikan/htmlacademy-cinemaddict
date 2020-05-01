import {KeyCode, Position} from "../consts";
import {render, remove, replace} from "../utils/components";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";

const NODE_MAIN = `main`;

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};


/**
 * Создание контроллера, управляющего отображением карточек фильмов
 */
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


  /**
   * Метод, обеспечивабщий отрисовку карточек фильма
   * @param {Object} filmData
   */
  render(filmData) {
    const oldFilmCard = this._filmCard;
    const oldFilmDetails = this._filmDetails;
    const mainSection = document.querySelector(NODE_MAIN);

    this._filmCard = new FilmCardComponent(filmData);
    this._filmDetails = new FilmDetailsComponent(filmData);

    this._setCardHandlers(filmData, mainSection);
    this._replaceOldFilm(oldFilmCard, oldFilmDetails);
  }


  /**
   * Метод, устанавливающий отображение карточки по умолчанию
   */
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeDetails();
    }
  }


  /**
   * Метод, добавляющий слушателей событий к карточке краткой информации о фильме
   * @param {Object} filmData данные фильма
   * @param {Object} mainSection секция для отображения подробной карточки фильма
   */
  _setCardHandlers(filmData, mainSection) {
    this._filmCard.setClickHandler(this._showDetailsClickHandler(mainSection));

    this._filmCard.setBtnWatchlistClickHandler(this._btnWatchlistClickHandler());
    this._filmCard.setBtnWatchedClickHandler(this._btnWatchedClickHandler());
    this._filmCard.setBtnFavoriteClickHandler(this._btnFavoriteClickHandler());
  }


  /**
   * Метод, добавляющий слушателей событий к подробной карточке фильма
   */
  _setDetailsHandlers() {
    this._filmDetails.setBtnCloseClickHandler(() => {
      this._removeDetails();
    });

    this._filmDetails._subscribeOnEvents();
  }


  /**
   * Метод, обеспечивающий обновление карточек контроллера
   * @param {Object} oldFilmCard
   * @param {Object} oldFilmDetails
   */
  _replaceOldFilm(oldFilmCard, oldFilmDetails) {
    if (oldFilmCard && oldFilmDetails) {
      replace(this._filmCard, oldFilmCard);
      replace(this._filmDetails, oldFilmDetails);
    } else {
      render[Position.BEFORE_END](this._container, this._filmCard);
    }
  }


  /**
   * Метод, обеспечивающий удаление подробной карточки
   */
  _removeDetails() {
    remove(this._filmDetails);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }


  /**
   * Метод, обеспечивабщий создание помощника для отображение подробной карточки
   * @param {Object} mainSection секция для отображения подробной карточки фильма
   * @return {Function} созданный помощник
   */
  _showDetailsClickHandler(mainSection) {
    return () => {
      render[Position.BEFORE_END](mainSection, this._filmDetails);
      this._mode = Mode.DETAILS;
      document.addEventListener(`keydown`, this._escKeyDownHandler);

      this._setDetailsHandlers();
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для добавления/удаления фильма
   * из числа запланированных к просмотру
   * @param {Object} filmData данные фильма
   * @return {Function} созданный помощник
   */
  _btnWatchlistClickHandler(filmData) {
    return (evt) => {
      evt.preventDefault();
      this._dataChangeHandler(filmData, Object.assign({}, filmData, {
        isWatch: !filmData.isWatch
      }));
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для добавления/удаления фильма
   * из числа просмотренных
   * @param {Object} filmData данные фильма
   * @return {Function} созданный помощник
   */
  _btnWatchedClickHandler(filmData) {
    return (evt) => {
      evt.preventDefault();
      this._dataChangeHandler(filmData, Object.assign({}, filmData, {
        isWatched: !filmData.isWatched
      }));
    };
  }


  /**
   * Метод, создающий помощника для изменения св
   * @param {Object} filmData данные фильма
   * @return {Function} созданный помощник
   */
  _btnFavoriteClickHandler(filmData) {
    return (evt) => {
      evt.preventDefault();
      this._dataChangeHandler(filmData, Object.assign({}, filmData, {
        isFavorite: !filmData.isFavorite
      }));
    };
  }


  /**
   * Метод, обеспечивабщий закрытие подробной карточки по нажатии на клавишу Escape
   * @param {*} evt
   */
  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._removeDetails();
    }
  }
}


export {FilmController};
