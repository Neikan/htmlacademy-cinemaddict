import {createDetailsInfo} from "./film-details/details-info";
import {createControls} from "./film-details/controls";
import {createCommentBlock} from "./film-details/comments";

/**
 * Создание разметки подробной карточки фильма
 * @param {Object} film фильм
 * @return {string} разметка подробной карточки фильма
 */
const createFilmDetails = (film) => {
  return (`
    <section class="film-details visually-hidden">
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

export {createFilmDetails};
