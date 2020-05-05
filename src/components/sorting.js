import AbstractComponent from "./abstract/component";
import {sortingArray} from "../utils/common";
import {SortType, SortClass, SortMethod} from "../consts";


/**
 * Правила сортировки
 */
const sortRules = {
  'default': (films) => films,
  'by-date': (films, count = films.length) => sortingArray(films, SortMethod.BY_DATE, count),
  'by-rating': (films, count = films.length) => sortingArray(films, SortMethod.BY_RATING, count),
};


/**
 * Создание разметки блока сортировки фильмов
 * @param {string} sortType примененная сортировка
 * @return {string} разметка блока
 */
const createSorting = (sortType) => {
  const classMarkup = {
    DEFAULT: sortType === SortType.DEFAULT ? ` ` + SortClass.BUTTON_ACTIVE : ``,
    BY_DATE: sortType === SortType.BY_DATE ? ` ` + SortClass.BUTTON_ACTIVE : ``,
    BY_RATING: sortType === SortType.BY_RATING ? ` ` + SortClass.BUTTON_ACTIVE : ``
  };

  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button${classMarkup.DEFAULT}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_DATE}" class="sort__button${classMarkup.BY_DATE}">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_RATING}" class="sort__button${classMarkup.BY_RATING}">Sort by rating</a></li>
    </ul>`
  );
};


/**
 * Создание класса типов сортировки
 */
class Sorting extends AbstractComponent {
  constructor(sortType) {
    super();
    this._currentSortType = sortType;

    this._clickHandler = this._clickHandler.bind(this);
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createSorting(this._currentSortType);
  }


  /**
   * Метод, обеспечивающий добавление слушателей на изменение текущего типа сортировки
   * @param {Function} handler помощник
   */
  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this._clickHandler(handler));
  }


  /**
   * Метод, обеспечивающий создание помощника для получения текущего типа сортировки
   * @param {Function} handler
   * @return {Function}
   */
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

      this._setActiveClassHandler(evt);
      this._currentSortType = sortType;
      handler(this._currentSortType);
    };
  }


  /**
   * Метод, обеспечивающий добавление/удаления активного класса с типа сортировки
   * @param {Object} evt
   */
  _setActiveClassHandler(evt) {
    [...this.getElement().querySelectorAll(`.${SortClass.BUTTON}`)].map((button) => {
      if (button === evt.target) {
        button.classList.add(SortClass.BUTTON_ACTIVE);
      } else {
        button.classList.remove(SortClass.BUTTON_ACTIVE);
      }
    });
  }
}


export {Sorting, sortRules};
