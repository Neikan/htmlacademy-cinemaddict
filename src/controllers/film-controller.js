import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import Comment from "../components/film-details/comment";
import {encode} from "he";
import {
  KeyCode, Position, DetailsElement, CardElement, Flag,
  FilmAttribute, FilterType, ClassMarkup, FilmsBlock, Mode
} from "../consts";
import {render, remove, replace, getItem} from "../utils/components";
import {generateId, getIndex} from "../utils/common";


const NODE_MAIN = `main`;

const changeDataRules = {
  'isWatch': (filmData) => Object.assign({}, filmData, {isWatch: !filmData.isWatch}),
  'isWatched': (filmData) => Object.assign({}, filmData, {isWatched: !filmData.isWatched}),
  'isFavorite': (filmData) => Object.assign({}, filmData, {isFavorite: !filmData.isFavorite})
};

let filmsBlockInitiator = FilmsBlock.DEFAULT;


/**
 * Создание контроллера, управляющего отображением карточек фильмов
 */
export default class FilmController {
  constructor(container, viewChangeHandler, dataChangeHandler,
      pageUpdateHandler, filterType, filmsBlock
  ) {
    this._container = container;

    this._mode = Mode.DEFAULT;
    this._filmData = null;
    this._filmCard = null;
    this._filmDetails = null;
    this._viewChangeHandler = viewChangeHandler;
    this._dataChangeHandler = dataChangeHandler;
    this._pageUpdateHandler = pageUpdateHandler;
    this._filterType = filterType;
    this._filmsBlock = filmsBlock;

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
    this._filmCard = new FilmCard(filmData, this._filmsBlock);
    this._filmDetails = new FilmDetails(filmData);

    this._setCardHandlers(filmData, mainSection);
    this._replaceOldFilm(oldFilmCard, oldFilmDetails);
  }


  /**
   * Метод, устанавливающий отображение карточки по умолчанию
   */
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeDetails();
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
    const emojiAddBlock = getItem(container, DetailsElement.EMOJI_ADD_BLOCK);
    const textArea = getItem(container, DetailsElement.COMMENT_INPUT);

    if (!emojiAddBlock.childNodes.length) {
      emojiAddBlock.classList.add(DetailsElement.ERROR);
      return;
    }

    if (textArea.value === ``) {
      textArea.classList.add(DetailsElement.ERROR);
      return;
    }

    this._addNewComment(container, emojiAddBlock, textArea);
    this._clearNewCommentForm(container);
  }


  /**
   * Метод, обеспечивающий добавление нового комментария
   * @param {Object} container контейнер подробной карточки
   * @param {Object} emojiAddBlock блок, для которого выполняется добавление смайла
   * @param {Object} textArea поле ввода комментария
   */
  _addNewComment(container, emojiAddBlock, textArea) {
    if (emojiAddBlock.childNodes.length && textArea.value !== ``) {
      const commentData = this._getCommentData(container);

      const newComment = new Comment(commentData);

      render[Position.BEFORE_END](
          getItem(container, DetailsElement.COMMENT_LIST), newComment
      );

      newComment.setBtnDeleteCommentClickHandler(this._setBtnDeleteCommentClickHandler());

      this._filmData.comments.push(commentData);
      this._updateCommentsCount(container);
    }
  }


  /**
   * Метод, обеспечивающий получение данных с формы ввода комментария
   * @param {Object} container
   * @return {Object} данные для создания комментария
   */
  _getCommentData(container) {
    return {
      commentId: generateId(),
      emoji: getItem(container, DetailsElement.EMOJI_ITEM_CHECKED).value,
      text: encode(getItem(container, DetailsElement.COMMENT_INPUT).value),
      author: `Batman`,
      date: new Date()
    };
  }


  /**
   * Метод, выполняющий обновление текущего количества комментариев после удаления добавленного комментария
   * @param {Object} container
   */
  _updateCommentsCount(container) {
    container.querySelector(`.${DetailsElement.COMMENT_COUNT}`)
      .textContent = this._filmData.comments.length;
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
   * Метод, выполняющий удаление добавленного комментария
   * @param {Object} target
   */
  _removeNewComment(target) {
    this._filmData.comments.splice(
        getIndex(this._filmData.comments, target.dataset.commentId), 1
    );
    target.remove();
  }


  /**
   * Метод, обеспечивающий удаление подробной карточки при закрытии по кнопке
   * или по нажатию на клавишу Escape
   */
  _removeDetails() {
    this._pageUpdateHandler(filmsBlockInitiator, this._mode);
    this._closeDetails();
    filmsBlockInitiator = FilmsBlock.DEFAULT;
  }


  /**
   * Метод, обеспечивающий закрытие подробной карточки при клике на другую
   */
  _closeDetails() {
    remove(this._filmDetails);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    document.removeEventListener(`keyup`, this._ctrlKeyUpHandler);

    this.render(this._filmData);

    if (filmsBlockInitiator === FilmsBlock.ALL) {
      this._checkActivityCard();
    }

    this._mode = Mode.DEFAULT;
  }


  /**
   * Метод, обеспечивающий обновление классов самой карточки фильма и кнопки,
   *  добавляющей фильм в какой-либо список
   * @param {Object} btn кнопка
   * @param {string} filmsBlock название блока фильмов
   * @param {string} filterType примененный фильтр
   */
  _updateBtnAndCardClass(btn, filmsBlock, filterType) {
    if (this._filterType === filterType && filmsBlock === FilmsBlock.ALL) {
      this._changeBtnAndCardClass(btn);
    } else {
      this._changeBtnClass(btn);
    }
  }


  /**
   * Метод, обеспечивающий изменение классов кнопки
   * @param {Object} btn кнопка
   */
  _changeBtnClass(btn) {
    if (btn.classList.contains(CardElement.BTN_ACTIVE)) {
      this._inactiveBtn(btn);
    } else {
      this._activeBtn(btn);
    }
  }


  /**
   * Метод, обеспечивающий изменение классов кнопки и карточки
   * @param {Object} btn кнопка
   */
  _changeBtnAndCardClass(btn) {
    if (btn.classList.contains(CardElement.BTN_ACTIVE)) {
      this._inactiveBtn(btn);
      btn.closest(`.${CardElement.CARD}`).classList.add(ClassMarkup.OPACITY);
    } else {
      this._activeBtn(btn);
      btn.closest(`.${CardElement.CARD}`).classList.remove(ClassMarkup.OPACITY);
    }
  }


  /**
   * Метод, обеспечивающий добавление активного класса на кнопку
   * @param {Object} btn кнопка
   */
  _activeBtn(btn) {
    btn.classList.add(`${CardElement.BTN_ACTIVE}`);
  }


  /**
   * Метод, обеспечивающий удаление активного класса с кнопки
   * @param {Object} btn кнопка
   */
  _inactiveBtn(btn) {
    btn.classList.remove(`${CardElement.BTN_ACTIVE}`);
  }


  /**
   * метод, обеспечивающий отметку карточки, как несоответствующей примененному фильтру
   */
  _inactiveCard() {
    this._filmCard.getElement().classList.add(`${ClassMarkup.OPACITY}`);
  }


  /**
   * Метод, выполняющий проверку должна ли быть карточка активной в примененном фильтре
   * @param {string} btn
   * @param {string} filterType
   */
  _checkActivity(btn, filterType) {
    if (this._filterType === filterType
      && !this._filmCard.getElement().querySelector(`.${btn}`)
              .classList.contains(`${CardElement.BTN_ACTIVE}`)
    ) {
      this._inactiveCard();
    }
  }


  /**
   * Метод, обеспечивающий комплекс проверок должна ли быть карточка активной в примененном фильтре
   */
  _checkActivityCard() {
    this._checkActivity(CardElement.BTN_WATCHLIST, FilterType.WATCHLIST);
    this._checkActivity(CardElement.BTN_HISTORY, FilterType.HISTORY);
    this._checkActivity(CardElement.BTN_FAVORITE, FilterType.FAVORITES);
  }


  /**
   * Метод, выполняющий создание помошника для удаления добавленного комментария
   * @return {Function} созданный помощник
   */
  _setBtnDeleteCommentClickHandler() {
    return (evt) => {
      evt.preventDefault();

      this._removeNewComment(evt.target.closest(`.${DetailsElement.COMMENT_ITEM}`));
      this._updateCommentsCount(this._filmDetails.getElement());
    };
  }


  /**
   * Метод, обеспечивабщий создание помощника для отображение подробной карточки
   * @param {Object} mainSection секция для отображения подробной карточки фильма
   * @return {Function} созданный помощник
   */
  _showDetailsClickHandler(mainSection) {
    return (evt) => {
      this._viewChangeHandler();
      this.render(this._filmData);

      filmsBlockInitiator = evt.target.closest(`.${CardElement.CARD}`).dataset.filmsBlock;

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
      filmsBlockInitiator = evt.target.closest(`.${CardElement.CARD}`).dataset.filmsBlock;

      this._filmData = this._dataChangeHandler(this._filmData,
          changeDataRules[FilmAttribute.IS_WATCH](this._filmData)
      );

      this._pageUpdateHandler(filmsBlockInitiator);
      this._updateBtnAndCardClass(evt.target, filmsBlockInitiator, FilterType.WATCHLIST);
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для добавления/удаления фильма из просмотренного
   * @return {Function} созданный помощник
   */
  _btnWatchedClickHandler() {
    return (evt) => {
      evt.preventDefault();
      filmsBlockInitiator = evt.target.closest(`.${CardElement.CARD}`).dataset.filmsBlock;

      this._filmData = this._dataChangeHandler(this._filmData,
          changeDataRules[FilmAttribute.IS_WATCHED](this._filmData)
      );

      this._pageUpdateHandler(filmsBlockInitiator);
      this._updateBtnAndCardClass(evt.target, filmsBlockInitiator, FilterType.HISTORY);
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для добавления/удаления фильма из избранного
   * @return {Function} созданный помощник
   */
  _btnFavoriteClickHandler() {
    return (evt) => {
      evt.preventDefault();
      filmsBlockInitiator = evt.target.closest(`.${CardElement.CARD}`).dataset.filmsBlock;

      this._filmData = this._dataChangeHandler(this._filmData,
          changeDataRules[FilmAttribute.IS_FAVORITE](this._filmData)
      );

      this._pageUpdateHandler(filmsBlockInitiator);
      this._updateBtnAndCardClass(evt.target, filmsBlockInitiator, FilterType.FAVORITES);

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
