import {createEmoji} from "./emoji-item";

/**
 * Создание разметки перечня смайлов
 * @param {Array} emojies смайлы
 * @return {string} разметка списка
 */
export const createEmojiList = (emojies) => {
  return (`
    <div class="film-details__emoji-list">
      ${createEmojies(emojies)}
    </div>
  `);
};

const createEmojies = (emojies) => {
  return emojies.map((emoji) => createEmoji(emoji)).join(`\n`);
};
