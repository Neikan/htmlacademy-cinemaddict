import AbstractComponent from "./abstract/abstract-component";


/**
 * Создание разметки блока сортировки фильмов
 * @return {string} разметка блока
 */
const createSorting = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};


/**
 * Создание класса для типов сортировки
 */
export default class Sorting extends AbstractComponent {
  getTemplate() {
    return createSorting();
  }
}
