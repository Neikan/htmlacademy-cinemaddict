/**
 * Создание разметки блока смайлов
 * @param {Array} emojies смайлы
 * @return {string} разметка блока
 */
const createEmojiesBlock = (emojies) => {
  return (`
    <div class="film-details__emoji-list">
      ${createEmojies(emojies)}
    </div>
  `);
};

/**
 * Создание разметки перечня смайлов
 * @param {Array} emojies смайлы
 * @return {string} разметка перечня
 */
const createEmojies = (emojies) => emojies.map((emoji) => createEmoji(emoji)).join(`\n`);

/**
 * Создание разметки смайла
 * @param {string} emoji смайл
 * @return {string} разметка элемента
 */
const createEmoji = (emoji) => {
  return (`
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji"
      type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>
  `);
};

export {createEmojiesBlock};
