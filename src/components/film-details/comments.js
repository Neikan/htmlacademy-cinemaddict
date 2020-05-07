import {EMOJIES, SortMethod} from "../../consts";
import {sortingArray} from "../../utils/common";
import {createEmojiesBlock} from "./emojies";
import {createComment} from "./comment";


/**
 * Создание разметки блока комментирования о фильме
 * @param {Object} {свойства фильма}
 * @return {string} разметка блока
 */
const createCommentBlock = ({comments}) => {
  return (
    `<div class="form-details__bottom-container">
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
    </div>`
  );
};


/**
 * Создание разметки списка комментариев
 * @param {Array} comments комментарии
 * @return {string} разметка списка
 */
const createCommentList = (comments) => {
  return (
    `<ul class="film-details__comments-list">
      ${createComments(comments)}
    </ul>`
  );
};


/**
 * Создание разметки нескольких комментариев
 * @param {Array} comments комментарии
 * @return {string} разметка комментария
 */
const createComments = (comments) =>
  sortingArray(comments, SortMethod.BY_COMMENT_DATE, comments.length).map(createComment).join(`\n`);


export {createCommentBlock};
