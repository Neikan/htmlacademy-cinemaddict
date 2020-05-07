import AbstractSmartComponent from "./abstract/component-smart";
import {createDetailsInfo} from "./film-details/details-info";
import {createControls} from "./film-details/controls";
import {createCommentBlock} from "./film-details/comments";
import {DetailsElement} from "../consts";
import {getImageElement} from "../utils/components";


/**
 * Создание разметки блока подробной карточки фильма
 * @param {Object} filmData данные фильма
 * @return {string} разметка блока
 */
const createFilmDetails = (filmData) => {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${createDetailsInfo(filmData)}
          ${createControls(filmData)}
        </div>
        ${createCommentBlock(filmData)}
      </form>
    </section>`
  );
};


/**
 * Создание класса подробной карточки фильма
 */
export default class FilmDetails extends AbstractSmartComponent {
  constructor(filmData) {
    super();

    this._filmData = filmData;
    this._comments = filmData.comments;
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createFilmDetails(this._filmData);
  }


  /**
   * Метод, обеспечивающий восставновление слушателей
   */
  recoveryListeners() {
    this._subscribeOnEvents();
  }


  /**
   * Метод, обеспечивающий перерисовку карточки
   */
  rerender() {
    super.rerender();
  }


  /**
   * Метод, обспечивающий добавление помощника на кнопку закрытия карточки
   * @param {Function} handler
   */
  setBtnCloseClickHandler(handler) {
    this.getElement().querySelector(`.${DetailsElement.BTN_CLOSE}`)
      .addEventListener(`click`, handler);
  }


  /**
   * Метод, обеспечивающий подписку на события на карточке
   */
  _subscribeOnEvents() {
    const element = this.getElement();
    this._changeIsWatch(element);
    this._changeIsWatched(element);
    this._changeIsFavorite(element);
    this._setEmojiClickHandler();
    this._setTextAreaInputHandler();
  }


  /**
   * Метод, выполняющий установку смайла в форму комментария
   */
  _setEmojiClickHandler() {
    const emojiAddBlock = this.getElement().querySelector(`.${DetailsElement.EMOJI_ADD_BLOCK}`);

    [...this.getElement().querySelectorAll(`.${DetailsElement.EMOJI_ITEM}`)]
        .map(this._getEmojiClickHandler(emojiAddBlock));
  }


  /**
   * Метод, выполняющий проверку наличия класса ошибки на поле ввода комментария
   */
  _setTextAreaInputHandler() {
    const textArea = this.getElement().querySelector(`.${DetailsElement.COMMENT_INPUT}`);

    textArea.addEventListener(`input`, this._getTextAreaInputHandler(textArea));
  }


  /**
   * Метод, обеспечиваюющий создание помощника для добавления смайла в форму комментария
   * @param {Object} emojiAddBlock блок, для которого выполняется добавление смайла
   * @return {Function} созданный помощник
   */
  _getEmojiClickHandler(emojiAddBlock) {
    return (smile) => {
      smile.addEventListener(`click`, () => {
        if (emojiAddBlock.firstChild) {
          emojiAddBlock.removeChild(emojiAddBlock.firstChild);
        }
        emojiAddBlock.appendChild(getImageElement(smile.value));

        if (emojiAddBlock.classList.contains(DetailsElement.ERROR)) {
          emojiAddBlock.classList.remove(DetailsElement.ERROR);
        }

      });
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для удаления класса ошибки с поля ввода комментария
   * @param {Object} textArea поле ввода комментария
   * @return {Function} созданный помощник
   */
  _getTextAreaInputHandler(textArea) {
    return () => {
      if (textArea.classList.contains(DetailsElement.ERROR)) {
        textArea.classList.remove(DetailsElement.ERROR);
      }
    };
  }


  /**
   * Метод, обеспечивающий добавление/удаление фильма из запланированного к просмотру
   * @param {Object} element
   */
  _changeIsWatch(element) {
    element.querySelector(`.${DetailsElement.BTN_WATCHLIST}`)
      .addEventListener(`click`, () => {
        this._filmData.isWatch = !this._filmData.isWatch;
      });
  }


  /**
   * Метод, обеспечивающий добавление/удаление фильма из просмотренного
   * @param {Object} element
   */
  _changeIsWatched(element) {
    element.querySelector(`.${DetailsElement.BTN_HISTORY}`)
      .addEventListener(`click`, () => {
        this._filmData.isWatched = !this._filmData.isWatched;
      });
  }


  /**
   * Метод, обеспечивающий добавление/удаление фильма из избранного
   * @param {Object} element
   */
  _changeIsFavorite(element) {
    element.querySelector(`.${DetailsElement.BTN_FAVORITE}`)
      .addEventListener(`click`, () => {
        this._filmData.isFavorite = !this._filmData.isFavorite;
      });
  }
}
