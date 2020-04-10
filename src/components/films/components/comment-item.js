/**
 * Создание разметки комментария
 * @param {Object} comment комментарий
 * @return {string} разметка комментария
 */
export const createComment = (comment) => {
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
