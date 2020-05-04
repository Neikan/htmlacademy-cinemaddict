import {KeyCode, Position, DetailsElement, Flag, Attribute, ACTIVE_CLASS, CLASS_FILM_OPACITY, CARD_CLASS, FilterType} from "../consts";
import {render, remove, replace, getItem} from "../utils/components";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {Comment} from "../components/film-details/comments";


const NODE_MAIN = `main`;

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};


const changeDataRules = {
  'isWatch': (filmData) => Object.assign({}, filmData, {isWatch: !filmData.isWatch}),
  'isWatched': (filmData) => Object.assign({}, filmData, {isWatched: !filmData.isWatched}),
  'isFavorite': (filmData) => Object.assign({}, filmData, {isFavorite: !filmData.isFavorite})
};


/**
 * Создание контроллера, управляющего отображением карточек фильмов
 */
class FilmController {
  constructor(container, viewChangeHandler, dataChangeHandler, currentFilter) {
    this._container = container;

    this._mode = Mode.DEFAULT;
    this._filmData = null;
    this._filmCard = null;
    this._filmDetails = null;
    this._viewChangeHandler = viewChangeHandler;
    this._dataChangeHandler = dataChangeHandler;
    this._currentFilter = currentFilter;


    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._ctrlKeyUpHandler = this._ctrlKeyUpHandler.bind(this);
    this._btnWatchlistClickHandler = this._btnWatchlistClickHandler.bind(this);
    this._btnWatchedClickHandler = this._btnWatchedClickHandler.bind(this);
    this._btnFavoriteClickHandler = this._btnFavoriteClickHandler.bind(this);
  }


  /**
   * Метод, обеспечивабщий отрисовку карточек фильма
   * @param {Object} filmData
   */
  render(filmData) {
    const oldFilmCard = this._filmCard;
    const oldFilmDetails = this._filmDetails;
    const mainSection = document.querySelector(NODE_MAIN);

    this._filmData = filmData;
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
    this._filmCard.setBtnWatchlistClickHandler(this._btnWatchlistClickHandler(filmData));
    this._filmCard.setBtnWatchedClickHandler(this._btnWatchedClickHandler(filmData));
    this._filmCard.setBtnFavoriteClickHandler(this._btnFavoriteClickHandler(filmData));
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
   * Метод, обеспечивающий добавление нового комментария
   */
  _renderNewComment() {
    const container = this._filmDetails.getElement();
    const commentData = this._getCommentData(container);

    this._filmData.comments.push(commentData); // переписать потом скорее всего надо будет
    render[Position.BEFORE_END](
        getItem(container, DetailsElement.COMMENT_LIST), new Comment(commentData)
    );
    this._clearNewCommentForm(container);
  }


  /**
   * Метод, обеспечивающий получение данных с формы ввода комментария
   * @param {Object} container
   * @return {Object} данные для создания комментария
   */
  _getCommentData(container) {
    return {
      emoji: getItem(container, DetailsElement.EMOJI_ITEM_CHECKED).value,
      text: getItem(container, DetailsElement.COMMENT_INPUT).value,
      author: `Batman`,
      date: new Date()
    };
  }


  /**
   * Метод, обеспечивающий очистку формы ввода комментария
   * @param {Object} container
   */
  _clearNewCommentForm(container) {
    const emojiAddBlock = getItem(container, DetailsElement.EMOJI_ADD_BLOCK);

    emojiAddBlock.removeChild(emojiAddBlock.firstChild);
    getItem(container, DetailsElement.COMMENT_INPUT).value = null;
    getItem(container, DetailsElement.EMOJI_ITEM_CHECKED).checked = Flag.NO;
  }


  /**
   * Метод, обеспечивающий удаление подробной карточки
   */
  _removeDetails() {
    remove(this._filmDetails);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    document.removeEventListener(`keyup`, this._ctrlKeyUpHandler);

    this._filmData = this._dataChangeHandler(this._filmData, this._filmData);
    this.render(this._filmData);
  }


  _updateBtnAndCardClass(btn, filterType) {
    if (this._currentFilter === filterType) {
      this._changeBtnAndCardClass(btn);
    } else {
      this._changeBtnClass(btn);
    }
  }


  _changeBtnClass(btn) {
    if (btn.classList.contains(ACTIVE_CLASS)) {
      btn.classList.remove(`${ACTIVE_CLASS}`);
    } else {
      btn.classList.add(`${ACTIVE_CLASS}`);
    }
  }

  _changeBtnAndCardClass(btn) {
    if (btn.classList.contains(ACTIVE_CLASS)) {
      btn.classList.remove(`${ACTIVE_CLASS}`);
      btn.closest(`.${CARD_CLASS}`).classList.add(CLASS_FILM_OPACITY);
    } else {
      btn.classList.add(`${ACTIVE_CLASS}`);
      btn.closest(`.${CARD_CLASS}`).classList.remove(CLASS_FILM_OPACITY);
    }
  }

  activeBtn(btn) {
    btn.classList.add(`${ACTIVE_CLASS}`);
  }

  _inactiveBtn(btn) {
    btn.classList.remove(`${ACTIVE_CLASS}`);
  }


  /**
   * Метод, обеспечивабщий создание помощника для отображение подробной карточки
   * @param {Object} mainSection секция для отображения подробной карточки фильма
   * @return {Function} созданный помощник
   */
  _showDetailsClickHandler(mainSection) {
    return () => {
      this.render(this._filmData);
      render[Position.BEFORE_END](mainSection, this._filmDetails);
      this._mode = Mode.DETAILS;
      document.addEventListener(`keydown`, this._escKeyDownHandler);
      document.addEventListener(`keyup`, this._ctrlKeyUpHandler);

      this._setDetailsHandlers();
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для добавления/удаления фильма
   * из запланированного к просмотру
   * @return {Function} созданный помощник
   */
  _btnWatchlistClickHandler() {
    return (evt) => {
      evt.preventDefault();
      this._filmData = this._dataChangeHandler(this._filmData, changeDataRules[Attribute.IS_WATCH](this._filmData));
      this._updateBtnAndCardClass(evt.target, FilterType.WATCHLIST);
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для добавления/удаления фильма из просмотренного
   * @return {Function} созданный помощник
   */
  _btnWatchedClickHandler() {
    return (evt) => {
      evt.preventDefault();
      this._filmData = this._dataChangeHandler(this._filmData, changeDataRules[Attribute.IS_WATCHED](this._filmData));
      this._updateBtnAndCardClass(evt.target, FilterType.HISTORY);
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для добавления/удаления фильма из избранного
   * @return {Function} созданный помощник
   */
  _btnFavoriteClickHandler() {
    return (evt) => {
      evt.preventDefault();
      this._filmData = this._dataChangeHandler(this._filmData, changeDataRules[Attribute.IS_FAVORITE](this._filmData));
      this._updateBtnAndCardClass(evt.target, FilterType.FAVORITES);
    };
  }


  /**
   * Метод, обеспечивающий закрытие подробной карточки по нажатию на клавишу Escape
   * @param {Object} evt
   */
  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._removeDetails();
    }
  }


  /**
   * Метод, обеспечивающий отправку комментария по нажатию комбинации клавиш Ctrl + Enter
   * @param {Object} evt
   * @param {Object} filmData
   */
  _ctrlKeyUpHandler(evt) {
    if (evt.keyCode === KeyCode.ENTER && evt.ctrlKey) {
      this._renderNewComment();
    }
  }
}


export {FilmController};
