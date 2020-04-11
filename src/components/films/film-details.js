import {createDetailsInfo} from "./components/details-info";
import {createControls} from "./components/controls";
import {createCommentBlock} from "./components/comments";


/**
 * Создание разметки подробной карточки фильма
 * @param {Object} film фильм
 * @return {string} разметка подробной карточки фильма
 */
export const createFilmDetails = (film) => {
  return (`
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${createDetailsInfo(film)}
          ${createControls(film)}
        </div>
        ${createCommentBlock(film)}
      </form>
    </section>
  `);
};
