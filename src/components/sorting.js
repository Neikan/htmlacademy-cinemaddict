import AbstractComponent from "./abstract/component";
import {sortingArray} from "../utils/common";
import {Sorting} from "../consts";


const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`
};


/**
 * Правила сортировки
 */
const sortRules = {
  'default': (films) => films,
  'by-date': (films, count) => sortingArray(films, Sorting.BY_DATE, count),
  'by-rating': (films, count) => sortingArray(films, Sorting.BY_RATING, count),
};


/**
 * Создание разметки блока сортировки фильмов
 * @return {string} разметка блока
 */
const createSorting = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};


/**
 * Создание класса типов сортировки
 */
class SortComponent extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;

    this._clickHandler = this._clickHandler.bind(this);
  }


  getTemplate() {
    return createSorting();
  }


  getSortType() {
    return this._currentSortType;
  }


  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this._clickHandler(handler));
  }


  _clickHandler(handler) {
    return (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;
      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    };
  }
}


export {SortComponent, sortRules};
