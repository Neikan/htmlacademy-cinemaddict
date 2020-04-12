import {EMOJIES} from "../../../consts";
import {createEmojiesBlock} from "./comments/emojies";

/**
 * Создание разметки блока комментирования о фильме
 * @param {Object} {свойства фильма}
 * @return {string} разметка блока
 */
const createCommentBlock = ({comments}) => {
  return (`
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        ${createCommentList(comments)}
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          ${createEmojiesBlock(EMOJIES)}
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
 * Создание разметки нескольких комментариев
 * @param {Array} comments комментарии
 * @return {string} разметка комментария
 */
const createComments = (comments) => comments.map((comment) => createComment(comment)).join(`\n`);

/**
 * Создание разметки одного комментария
 * @param {Object} {свойства комментария}
 * @return {string} разметка одного комментария
 */
const createComment = ({text, emoji, author, date, button}) => {
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
