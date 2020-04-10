import {getRandomElement, getRandomDate, getCommentDate} from '../utils.js';
import {CommentTexts, CommentEmojis, CommentAutors, Dates} from '../consts.js';


/**
 * Создание комментария
 * @return {Object} созданный комментарий
 */
export const generateComment = () => {
  const randomDate = getRandomDate(new Date(), new Date(Dates.comment.year, Dates.comment.month, Dates.comment.day));

  return {
    text: getRandomElement(CommentTexts),
    emoji: getRandomElement(CommentEmojis),
    autor: getRandomElement(CommentAutors),
    date: getCommentDate(randomDate),
    deleteButton: ``,
  };
};

export const generateComments = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateComment);
};
