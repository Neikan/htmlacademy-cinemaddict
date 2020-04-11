import {createComment} from "./comments/comment-item";
import {createEmojiList} from "./comments/emoji-list";
import {CommentEmojies} from "../../../consts";


/**
 * Создание разметки блока комментирования о фильме
 * @param {*} film фильм
 * @return {string} разметка блока комментирования
 */
export const createCommentBlock = (film) => {
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
          ${createEmojiList(CommentEmojies)}
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


const createComments = (comments) => {
  return comments.map((comment) => createComment(comment)).join(`\n`);
};
