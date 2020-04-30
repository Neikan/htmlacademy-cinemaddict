import {createDetailsInfo} from "./film-details/details-info";
import {createControls} from "./film-details/controls";
import {createCommentBlock} from "./film-details/comments";
import {DetailsElement, ControlName, CONTROL_LABEL} from "../consts";
import AbstractSmartComponent from "./abstract/component-smart";


const EMOJI_LABEL_CLASS = `film-details__emoji-label`;
const ADD_EMOJI_CLASS = `film-details__add-emoji-label`;
const EMOJI_MARK = `emoji-`;

/**
 * Создание элемента картинки
 * @param {string} imageName
 * @return {Object} созданный элемент
 */
const getImageElement = (imageName) => {
  const imgElement = document.createElement(`img`);
  imgElement.src = `./images/emoji/${imageName}.png`;
  imgElement.style.width = `100%`;
  return imgElement;
};


/**
 * Создание помощника для добавления смайла в форму нового комментария
 * @param {Object} emojiAddBlock
 * @return {Function} созданный помощник
 */
const getEmojiClickhandler = (emojiAddBlock) => {
  return (smile) => {
    smile.addEventListener(`click`, () => {
      if (emojiAddBlock.firstChild) {
        emojiAddBlock.removeChild(emojiAddBlock.firstChild);
      }
      emojiAddBlock.appendChild(getImageElement(
          smile.getAttribute(`for`).replace(EMOJI_MARK, ``)));
    });
  };
};


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
export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._comments = film.comments;
  }


  getTemplate() {
    return createFilmDetails(this._film);
  }


  recoveryListeners() {
    this._subscribeOnEvents();
  }


  rerender() {
    super.rerender();
  }


  setBtnCloseClickHandler(handler) {
    this.getElement().querySelector(`.${DetailsElement.BTN_CLOSE}`)
      .addEventListener(`click`, handler);
  }


  _subscribeOnEvents() {
    const element = this.getElement();

    changeIsWatch(this, element);
    changeIsWatched(this, element);
    changeIsFavorite(this, element);
    this.setEmojiClickHandler();
  }

  setEmojiClickHandler() {
    const emojiAddBlock = this.getElement().querySelector(`.${ADD_EMOJI_CLASS}`);

    [...this.getElement().querySelectorAll(`.${EMOJI_LABEL_CLASS}`)]
        .map(getEmojiClickhandler(emojiAddBlock));
  }
}


/**
 * Функция, обеспечивающая добавление/удаление фильма из числа запланированных к просмотру
 * @param {Object} filmDetails
 * @param {Object} element
 */
const changeIsWatch = (filmDetails, element) => {
  element.querySelector(`.${CONTROL_LABEL}${ControlName.WATCHLIST}`)
    .addEventListener(`click`, () => {
      filmDetails._film.isWatch = !filmDetails._film.isWatch;
    });
};


/**
 * Функция, обеспечивающая добавление/удаление фильма из числа просмотренных
 * @param {Object} filmDetails
 * @param {Object} element
 */
const changeIsWatched = (filmDetails, element) => {
  element.querySelector(`.${CONTROL_LABEL}${ControlName.WATCHED}`)
    .addEventListener(`click`, () => {
      filmDetails._film.isWatched = !filmDetails._film.isWatched;
    });
};


/**
 * Функция, обеспечивающая добавление/удаление фильма из числа избранных
 * @param {Object} filmDetails
 * @param {Object} element
 */
const changeIsFavorite = (filmDetails, element) => {
  element.querySelector(`.${CONTROL_LABEL}${ControlName.FAVORITE}`)
    .addEventListener(`click`, () => {
      filmDetails._film.isFavorite = !filmDetails._film.isFavorite;
    });
};
