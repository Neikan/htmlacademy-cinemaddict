import {EMOJIES} from '../../consts.js';
import {getRandomElement, getRandomDate, getCommentDate} from '../../utils.js';
import {COMMENT_TEXTS, COMMENT_AUTHORS} from './comment-consts.js';

/**
 * Создание комментария
 * @return {Object} созданный комментарий
 */
const generateComment = () => {
  const randomDate = getRandomDate(new Date(), new Date(2020, 1, 1));

  return {
    text: getRandomElement(COMMENT_TEXTS),
    emoji: getRandomElement(EMOJIES),
    author: getRandomElement(COMMENT_AUTHORS),
    date: getCommentDate(randomDate),
    button: `Delete`,
  };
};

/**
 * Генерация массива комментариев
 * @param {Number} count количество комментариев
 * @return {Array} сгенерированный массив комментариев
 */
const generateComments = (count) => new Array(count).fill({}).map(generateComment);

export {generateComment, generateComments};