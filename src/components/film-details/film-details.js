import {createDetailsInfo} from "./components/details-info";
import {createControls} from "./components/controls";
import {createCommentBlock} from "./components/comments";
import AbstractComponent from "../abstract/abstract-component";


/**
 * Создание разметки блока подробной карточки фильма
 * @param {Object} film фильм
 * @return {string} разметка блока
 */
const createFilmDetails = (film) => {
  return (
    `<section class="film-details">
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
    </section>`
  );
};


/**
 * Создание класса подробной карточки фильма
 */
export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetails(this._film);
  }
}
