import AbstractComponent from "../abstract/component";
import {encode} from "he";
import {formatDateFromNow} from "../../utils/common";
import {DetailsElement} from "../../consts";


/**
 * Создание разметки одного комментария
 * @param {Object} {свойства комментария}
 * @return {string} разметка одного комментария
 */
const createComment = ({id, text, emoji, author, date}) => {
  return (
    `<li class="film-details__comment" data-comment-id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${encode(text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatDateFromNow(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};


/**
 * Создание класса комментария
 */
export default class Comment extends AbstractComponent {
  constructor(commentData) {
    super();

    this._commentData = commentData;
    this._clickHandler = this._clickHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createComment(this._commentData);
  }


  /**
   * Метод, обеспечивающий добавление слушателей на кнопку удаления комментария
   * @param {Function} handler помощник
   */
  setBtnDeleteCommentClickHandler(handler) {
    this.getElement().querySelector(`.${DetailsElement.BTN_COMMENT_DELETE}`)
      .addEventListener(`click`, this._clickHandler(handler));
  }


  /**
   * Метод, обеспечивающий создание помощника для удаления комментария
   * @param {Function} handler помощник
   * @return {Function} созданный помощник
   */
  _clickHandler(handler) {
    return (evt) => {
      handler(evt);
    };
  }
}


export {createComment};
