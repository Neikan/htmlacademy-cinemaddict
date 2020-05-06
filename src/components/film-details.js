import {AbstractSmartComponent} from "./abstract/component-smart";
import {createDetailsInfo} from "./film-details/details-info";
import {createControls} from "./film-details/controls";
import {createCommentBlock} from "./film-details/comments";
import {DetailsElement} from "../consts";
import {getImageElement} from "../utils/components";


/**
 * Создание разметки блока подробной карточки фильма
 * @param {Object} film фильм
 * @return {string} разметка блока
 */
const createFilmDetails = (film) => {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${createDetailsInfo(film)}
          ${createControls(film)}
        </div>
        ${createCommentBlock(film)}
      </form>
    </section>`
  );
};


/**
 * Создание класса подробной карточки фильма
 */
class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._comments = film.comments;
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createFilmDetails(this._film);
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
  }


  /**
   * Метод, обеспечиваюющий создание помощника для добавления смайла в форму комментария
   * @param {Object} emojiAddBlock
   * @return {Function} созданный помощник
   */
  _getEmojiClickhandler(emojiAddBlock) {
    return (smile) => {
      smile.addEventListener(`click`, () => {
        if (emojiAddBlock.firstChild) {
          emojiAddBlock.removeChild(emojiAddBlock.firstChild);
        }
        emojiAddBlock.appendChild(getImageElement(smile.value));
      });
    };
  }


  /**
   * Метод, выполняющий установку смайла в форму комментария
   */
  _setEmojiClickHandler() {
    const emojiAddBlock = this.getElement().querySelector(`.${DetailsElement.EMOJI_ADD_BLOCK}`);

    [...this.getElement().querySelectorAll(`.${DetailsElement.EMOJI_ITEM}`)]
        .map(this._getEmojiClickhandler(emojiAddBlock));
  }


  /**
   * Метод, обеспечивающий добавление/удаление фильма из запланированного к просмотру
   * @param {Object} element
   */
  _changeIsWatch(element) {
    element.querySelector(`.${DetailsElement.BTN_WATCHLIST}`)
    .addEventListener(`click`, () => {
      this._film.isWatch = !this._film.isWatch;
    });
  }


  /**
   * Метод, обеспечивающий добавление/удаление фильма из просмотренного
   * @param {Object} element
   */
  _changeIsWatched(element) {
    element.querySelector(`.${DetailsElement.BTN_HISTORY}`)
    .addEventListener(`click`, () => {
      this._film.isWatched = !this._film.isWatched;
    });
  }


  /**
   * Метод, обеспечивающий добавление/удаление фильма из избранного
   * @param {Object} element
   */
  _changeIsFavorite(element) {
    element.querySelector(`.${DetailsElement.BTN_FAVORITE}`)
    .addEventListener(`click`, () => {
      this._film.isFavorite = !this._film.isFavorite;
    });
  }
}


export {FilmDetails};
