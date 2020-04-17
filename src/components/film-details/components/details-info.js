import {createPromo} from "./promo";
import {createTitles} from "./titles";
import {createDetails} from "./details";


/**
 * Создание разметки блока подробной информации о фильме
 * @param {Object} {свойства фильма}
 * @return {string} разметка блока
 */
const createDetailsInfo = ({promo, titles, rating, details}) => {
  return (
    `<div class="film-details__info-wrap">
      ${createPromo(promo)}
      <div class="film-details__info">
        <div class="film-details__info-head">
          ${createTitles(titles)}
          <div class="film-details__rating">
            <p class="film-details__total-rating">${rating}</p>
          </div>
        </div>
        ${createDetails(details)}
      </div>
    </div>`
  );
};


export {createDetailsInfo};
