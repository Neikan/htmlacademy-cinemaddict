import {CountFilm} from "../../../consts";

/**
 * Создание разметки кнопки показа фильмов
 * @return {string} разметка кнопки показа скрытых фильмов
 */
const createShowMore = () => `<button class="films-list__show-more">Show more</button>`;

export {createShowMore};

const addShowMoreListener = (filmsComponent, films, showingFilmsCount, renderFilmList) => {
  const showMore = filmsComponent.getElement().querySelector(`.films-list__show-more`);

  const showMoreClickHandler = () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += CountFilm.BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount).map(renderFilmList());

    if (showingFilmsCount >= films.length) {
      showMore.remove();
    }
  };

  showMore.addEventListener(`click`, showMoreClickHandler);
};

export {addShowMoreListener};
