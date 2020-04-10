import {createComment} from "./comment-item";

/**
 * Создание разметки списка комментариев
 * @param {Array} comments комментарии
 * @return {string} разметка списка
 */
export const createCommentList = (comments) => {
  return (`
    <ul class="film-details__comments-list">
      ${createComments(comments)}
    </ul>
  `);
};

const createComments = (comments) => {
  return comments.map((comment) => createComment(comment)).join(`\n`);
};
