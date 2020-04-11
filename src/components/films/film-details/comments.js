import {CommentEmojies} from "../../../consts";
import {createEmojiesBlock} from "./emojies";

/**
 * Создание разметки блока комментирования о фильме
 * @param {*} film фильм
 * @return {string} разметка блока комментирования
 */
const createCommentBlock = (film) => {
  const {commentsCount, comments} = film;

  return (`
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
        ${createCommentList(comments)}
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          ${createEmojiesBlock(CommentEmojies)}
        </div>
      </section>
    </div>
  `);
};

/**
 * Создание разметки списка комментариев
 * @param {Array} comments комментарии
 * @return {string} разметка списка
 */
const createCommentList = (comments) => {
  return (`
    <ul class="film-details__comments-list">
      ${createComments(comments)}
    </ul>
  `);
};

/**
 * Создание разметки комментариев
 * @param {Array} comments комментарии
 * @return {string} разметка
 */
const createComments = (comments) => comments.map((comment) => createComment(comment)).join(`\n`);

/**
 * Создание разметки комментария
 * @param {Object} comment комментарий
 * @return {string} разметка комментария
 */
const createComment = (comment) => {
  const {text, emoji, author, date, button} = comment;

  return (`
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">${button}</button>
        </p>
      </div>
    </li>
  `);
};

export {createCommentBlock};
