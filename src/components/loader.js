import AbstractComponent from "./abstract/component";


/**
 * Создание разметки блока загрузки данных
 * @return {string} разметка блока
 */
const createLoader = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">Loading... Please wait</h2>
      </section>
    </section>`
  );
};


/**
 * Создание класса сообщения о загрузке данных
 */
export default class Loader extends AbstractComponent {
  getTemplate() {
    return createLoader();
  }
}
