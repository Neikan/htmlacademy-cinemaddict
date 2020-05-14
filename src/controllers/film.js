import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import FilmData from "../models/film";
import Comment from "../components/film-details/comment";
import {encode} from "he";
import {
  KeyCode, Position, DetailsElement, CardElement, Flag, FilterType,
  ClassMarkup, FilmsBlock, Mode, SHAKE_ANIMATION, BtnName, BTN_ATTRIBUTE, FilmAttribute
} from "../consts";
import {render, remove, replace, changeDataRules} from "../utils/components";
import {getIndex} from "../utils/common";
import CommentData from "../models/comment";


const NODE_MAIN = `main`;

let filmsBlockInitiator = FilmsBlock.DEFAULT;

/**
 * Создание контроллера, управляющего отображением карточек фильмов
 */
export default class FilmController {
  constructor(container, viewChangeHandler, dataChangeHandler,
      pageUpdateHandler, filterType, filmsBlock, api
  ) {
    this._container = container;

    this._mode = Mode.DEFAULT;
    this._filmData = null;
    this._filmOldData = null;
    this._filmCard = null;
    this._filmDetails = null;
    this._viewChangeHandler = viewChangeHandler;
    this._dataChangeHandler = dataChangeHandler;
    this._pageUpdateHandler = pageUpdateHandler;
    this._filterType = filterType;
    this._filmsBlock = filmsBlock;
    this._api = api;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._ctrlKeyUpHandler = this._ctrlKeyUpHandler.bind(this);
    this._btnWatchlistClickHandler = this._btnWatchlistClickHandler.bind(this);
    this._btnWatchedClickHandler = this._btnWatchedClickHandler.bind(this);
    this._btnFavoriteClickHandler = this._btnFavoriteClickHandler.bind(this);
  }


  /**
   * Метод, обеспечивабщий отрисовку карточек фильма
   * @param {Object} filmData данные фильма
   */
  render(filmData) {
    const oldFilmCard = this._filmCard;
    const oldFilmDetails = this._filmDetails;
    const mainSection = document.querySelector(NODE_MAIN);

    this._filmData = filmData;
    this._filmCard = new FilmCard(filmData, this._filmsBlock);
    this._filmDetails = new FilmDetails(filmData, this._dataChangeHandler, this._api);

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
    this._filmOldData = this._filmData;
    this._filmDetails.setBtnCloseClickHandler(() => {
      this._removeDetails();
    });

    this._filmDetails._subscribeOnEvents();
  }


  /**
   * Метод, добавляющий дополнительные атрибуты для поля ввода комментария, если в процессе добавления произошла ошибка
   * @param {Object} textArea поле ввола комментария
   */
  _setTextAreaAttributesFailureAdding(textArea) {
    textArea.disabled = Flag.NO;
    textArea.classList.add(DetailsElement.ERROR);
    textArea.classList.add(SHAKE_ANIMATION);
  }


  /**
   * Метод, удаляющий дополнительные атрибуты с кнопки удаления комментария, если в процессе удаления произошла ошибка
   * @param {Object} btn кнопка удаления комментария
   */
  _setBtnDeleteAttributesFailureDeleting(btn) {
    btn.removeAttribute(BTN_ATTRIBUTE);
    btn.textContent = BtnName.DELETE;
  }


  /**
   * Метод, добавляющий дополнительные атрибуты для кнопки удаления комментария при запуске процесса удаления
   * @param {Object} btn кнопка удаления комментария
   */
  _setBtnDeleteAttributesForDeleting(btn) {
    btn.setAttribute(BTN_ATTRIBUTE, `${Flag.YES}`);
    btn.textContent = BtnName.DELETING;
  }


  /**
   * Метод, обеспечивающий добавление слушателей на документ
   */
  _setDocimentListeners() {
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    document.addEventListener(`keyup`, this._ctrlKeyUpHandler);
  }


  /**
   * Получение данных фильма для отправки на сервер для обновления
   * @param {string} changeDataRule правило изменения данных
   * @return {Object} обновляемые данные фильма
   */
  _getFilmDataForUpdating(changeDataRule) {
    return changeDataRules[changeDataRule](FilmData.clone(this._filmData));
  }


  /**
   * Метод, обеспечивающий обновление карточек контроллера
   * @param {Object} oldFilmCard прежняя краткая карточка фильма
   * @param {Object} oldFilmDetails прежняя подробная карточка фильма
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
   * Метод, обеспечивающий получение данных с формы ввода комментария
   * @param {Object} container контейнер подробной карточки
   * @return {Object} данные для создания комментария
   */
  _getCommentData(container) {
    return {
      emotion: container.querySelector(`.${DetailsElement.EMOJI_ITEM_CHECKED}`).value,
      comment: encode(container.querySelector(`.${DetailsElement.COMMENT_INPUT}`).value),
      date: new Date()
    };
  }


  /**
   * Метод, обеспечивающий добавление нового комментария
   */
  _renderNewComment() {
    const container = this._filmDetails.getElement();
    const emojiAddBlock = container.querySelector(`.${DetailsElement.EMOJI_ADD_BLOCK}`);
    const textArea = container.querySelector(`.${DetailsElement.COMMENT_INPUT}`);

    if (!emojiAddBlock.childNodes.length) {
      emojiAddBlock.classList.add(DetailsElement.ERROR);
      return;
    }

    if (textArea.value === ``) {
      textArea.classList.add(DetailsElement.ERROR);
      return;
    }

    this._checkClassesTextArea(textArea);
    this._addNewComment(container, emojiAddBlock, textArea);
  }


  /**
   * Метод, обеспечивающий добавление нового комментария
   * @param {Object} container контейнер подробной карточки
   * @param {Object} emojiAddBlock блок, для которого выполняется добавление смайла
   * @param {Object} textArea поле ввода комментария
   */
  _addNewComment(container, emojiAddBlock, textArea) {
    if (emojiAddBlock.childNodes.length && textArea.value !== ``) {
      textArea.disabled = Flag.YES;

      this._addNewCommentSendingRequest(container,
          new CommentData(this._getCommentData(container)), textArea
      );
    }
  }


  /**
   * Метод, обеспечивающий отправку запроса на сервер с данными новыми комментария
   * @param {Object} container контейнер подробной карточки
   * @param {Object} commentData данные нового комментария
   * @param {Object} textArea поле ввода комментария
   */
  _addNewCommentSendingRequest(container, commentData, textArea) {
    this._api.sendCommentData(this._filmData.id, commentData)
      .then((commentsData) => {
        this._addNewCommentAfterResponse(container, commentsData, textArea);
      })
      .catch(() => {
        this._setTextAreaAttributesFailureAdding(textArea);
      });
  }


  /**
   * Метод, обеспечивающий добавление нового комментария после получения данных от сервера
   * @param {Object} container контейнер подробной карточки
   * @param {Object} commentsData данные комментариев
   * @param {Object} textArea поле ввода комментария
   */
  _addNewCommentAfterResponse(container, commentsData, textArea) {
    const newCommentData = commentsData[commentsData.length - 1];

    this._addNewCommentAndSetBtnDeleteListener(container,
        new Comment(newCommentData), newCommentData
    );
    this._addNewCommentDataForFilmData(newCommentData);
    this._updateCommentsCount(container);
    this._clearNewCommentForm(container, textArea);
  }


  /**
   * Метод, обеспечивающий добавление данных нового комментария в данные фильма
   * @param {Object} newCommentData данные нового комментария
   */
  _addNewCommentDataForFilmData(newCommentData) {
    this._filmData.comments.push(newCommentData);
    this._filmData.commentsIds.push(newCommentData.id);
  }


  /**
   * Метод, обеспечивающий отрисовку нового комментария на форме с слушателем на кнопке удаления
   * @param {Object} container контейнер подробной карточки
   * @param {Object} newCommentComponent блок нового комментария
   * @param {Object} newCommentData данные нового комментария
   */
  _addNewCommentAndSetBtnDeleteListener(container, newCommentComponent, newCommentData) {
    render[Position.BEFORE_END](
        container.querySelector(`.${DetailsElement.COMMENT_LIST}`), newCommentComponent
    );
    newCommentComponent.setBtnDeleteCommentClickHandler(
        this._setBtnDeleteCommentClickHandler(newCommentData.id)
    );
  }


  /**
   * Метод, выполняющий обновление текущего количества комментариев после удаления добавленного комментария
   * @param {Object} container контейнер подробной карточки
   */
  _updateCommentsCount(container) {
    container.querySelector(`.${DetailsElement.COMMENT_COUNT}`)
      .textContent = this._filmData.comments.length;
  }


  /**
   * Метод, обеспечивающий очистку формы ввода комментария
   * @param {Object} container контейнер подробной карточки
   * @param {Object} textArea поле ввода комментария
   */
  _clearNewCommentForm(container, textArea) {
    const emojiAddBlock = container.querySelector(`.${DetailsElement.EMOJI_ADD_BLOCK}`);

    emojiAddBlock.removeChild(emojiAddBlock.firstChild);

    textArea.value = null;
    textArea.disabled = Flag.NO;

    container.querySelector(`.${DetailsElement.EMOJI_ITEM_CHECKED}`).checked = Flag.NO;
  }


  /**
   * Метод, выполняющий отправку обновленных данных на сервер с обновлением представления и модели данных фильмов
   * @param {Object} evt событие
   * @param {Object} newFilmData обновленные данные фильма
   * @param {Object} filterType примененный фильтр
   */
  _updatefilmDataAfterRequest(evt, newFilmData, filterType) {
    this._api.updateFilmData(newFilmData)
      .then((newData) => {
        this._filmData = this._dataChangeHandler(newData);
        this._updateFilmsBlockHandler(evt, filterType);
      })
      .catch(() => {
        this._filmCard.getElement().classList.add(`${SHAKE_ANIMATION}`);
      });
  }


  /**
   * Метод, обеспечивающий удаление слушателей с документа
   */
  _removeDocumentListeners() {
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    document.removeEventListener(`keyup`, this._ctrlKeyUpHandler);
  }


  /**
   * Метод, выполняющий запрос к серверу и удаление комментария
   * @param {Object} evt событие
   * @param {Object} btn кнопка удаления комментария
   * @param {Number} commentDataId идентификатор комментария
   * @param {Object} commentItem блок удаляемого комментария
   */
  _removeCommentAfterRequest(evt, btn, commentDataId, commentItem) {
    this._api.deleteCommentData(commentDataId, this._filmData)
      .then(() => {
        this._removeNewComment(evt.target.closest(`.${DetailsElement.COMMENT_ITEM}`));
        this._updateCommentsCount(this._filmDetails.getElement());
      })
      .catch(() => {
        this._setBtnDeleteAttributesFailureDeleting(btn);
        commentItem.classList.add(`${SHAKE_ANIMATION}`);
      });
  }


  /**
   * Метод, выполняющий удаление добавленного комментария
   * @param {Object} target
   */
  _removeNewComment(target) {
    this._filmData.comments.splice(
        getIndex(this._filmData.comments, target.dataset.commentId), 1
    );
    this._filmData.commentsIds.splice(
        getIndex(this._filmData.commentsIds, target.dataset.commentId), 1
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
    this._removeDocumentListeners();
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
   * @param {string} btn кнопка
   * @param {string} filterType примененный фильтр
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
   * Метод, обеспечивающий проверку наличия дополнительных классов на краткой карточке фильма
   */
  _checkClassesFilmCard() {
    if (this._filmCard.getElement().classList.contains(`${SHAKE_ANIMATION}`)) {
      this._filmCard.getElement().classList.remove(`${SHAKE_ANIMATION}`);
    }
  }


  /**
   * Метод, обеспечивающий проверку наличия дополнительных классов на блоке комментария
   * @param {Object} commentItem блок комментария
   */
  _checkClassesCommentItem(commentItem) {
    if (commentItem.classList.contains(`${SHAKE_ANIMATION}`)) {
      commentItem.classList.remove(`${SHAKE_ANIMATION}`);
    }
  }


  /**
   * Метод, выполняющий проверку наличия дополнительных классов на поле ввода комментария
   * @param {Object} textArea поле воода комментария
   */
  _checkClassesTextArea(textArea) {
    if (textArea.classList.contains(SHAKE_ANIMATION
      || textArea.classList.remove(DetailsElement.ERROR))) {
      textArea.classList.remove(DetailsElement.ERROR);
      textArea.classList.remove(SHAKE_ANIMATION);
    }
  }


  /**
   * Метод, выполняющий создание помошника для удаления добавленного комментария
   * @param {Number} commentDataId идентификатор комментария
   * @return {Function} созданный помощник
   */
  _setBtnDeleteCommentClickHandler(commentDataId) {
    return (evt) => {
      evt.preventDefault();
      const btn = evt.target;
      const commentItem = evt.target.closest(`.${DetailsElement.COMMENT_ITEM}`);

      this._checkClassesCommentItem(commentItem);
      this._setBtnDeleteAttributesForDeleting(btn);
      this._removeCommentAfterRequest(evt, btn, commentDataId, commentItem);
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для отображение подробной карточки
   * @param {Object} mainSection секция для отображения подробной карточки фильма
   * @return {Function} созданный помощник
   */
  _showDetailsClickHandler(mainSection) {
    return (evt) => {
      this._checkClassesFilmCard();
      this._viewChangeHandler();
      this._showDetailsAfterRequestComments(evt, mainSection);
    };
  }


  /**
   * Метод, обеспечивающий отправку запроса на сервер на получение данных комментариев
   * и отрисовку подробной карточки фильма
   * @param {Object} evt событие
   * @param {Object} mainSection секция для отображения подробной карточки фильма
   */
  _showDetailsAfterRequestComments(evt, mainSection) {
    this._api.getCommentsData(this._filmData.id)
      .then((commentData) => {
        this._filmData.comments = commentData;
        this.render(this._filmData);

        filmsBlockInitiator = evt.target.closest(`.${CardElement.CARD}`).dataset.filmsBlock;

        render[Position.BEFORE_END](mainSection, this._filmDetails);
        this._mode = Mode.DETAILS;

        this._setDocimentListeners();
        this._setDetailsHandlers();
      })
      .catch(() => {
        this._filmCard.getElement().classList.add(`${SHAKE_ANIMATION}`);
      });
  }


  /**
   * Метод, обеспечивающий создание помощника для добавления/удаления фильма
   * из запланированного к просмотру
   * @return {Function} созданный помощник
   */
  _btnWatchlistClickHandler() {
    return (evt) => {
      evt.preventDefault();
      this._checkClassesFilmCard();

      this._updatefilmDataAfterRequest(evt,
          this._getFilmDataForUpdating(FilmAttribute.IS_WATCH), FilterType.WATCHLIST
      );
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для добавления/удаления фильма из просмотренного
   * @return {Function} созданный помощник
   */
  _btnWatchedClickHandler() {
    return (evt) => {
      evt.preventDefault();
      this._checkClassesFilmCard();

      this._updatefilmDataAfterRequest(evt,
          this._getFilmDataForUpdating(FilmAttribute.IS_WATCHED), FilterType.HISTORY
      );
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для добавления/удаления фильма из избранного
   * @return {Function} созданный помощник
   */
  _btnFavoriteClickHandler() {
    return (evt) => {
      evt.preventDefault();
      this._checkClassesFilmCard();

      this._updatefilmDataAfterRequest(evt,
          this._getFilmDataForUpdating(FilmAttribute.IS_FAVORITE), FilterType.FAVORITES
      );
    };
  }


  /**
   * Метод, обеспечивающий обновление отображения данных
   * @param {Object} evt событие
   * @param {string} filterType примененный фильтр
   */
  _updateFilmsBlockHandler(evt, filterType) {
    filmsBlockInitiator = evt.target.closest(`.${CardElement.CARD}`).dataset.filmsBlock;
    this._pageUpdateHandler(filmsBlockInitiator);
    this._updateBtnAndCardClass(evt.target, filmsBlockInitiator, filterType);
  }


  /**
   * Метод, обеспечивающий закрытие подробной карточки по нажатию на клавишу Escape
   * @param {Object} evt событие
   */
  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._removeDetails();
    }
  }


  /**
   * Метод, обеспечивающий отправку комментария по нажатию комбинации клавиш Ctrl + Enter
   * @param {Object} evt событие
   * @param {Object} filmData данные фильма
   */
  _ctrlKeyUpHandler(evt) {
    if (evt.keyCode === KeyCode.ENTER && evt.ctrlKey) {
      this._renderNewComment();
    }
  }
}
