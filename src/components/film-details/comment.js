import AbstractComponent from "../abstract/component";
import {formatDateFromNow} from "../../utils/common";


/**
 * Создание разметки одного комментария
 * @param {Object} {свойства комментария}
 * @return {string} разметка одного комментария
 */
const createComment = ({commentId, text, emoji, author, date}) => {
  return (
    `<li class="film-details__comment" data-comment-id="${commentId}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatDateFromNow(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};


export default class Comment extends AbstractComponent {
  constructor(commentData) {
    super();

    this._commentData = commentData;
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createComment(this._commentData);
  }
}


export {createComment};
