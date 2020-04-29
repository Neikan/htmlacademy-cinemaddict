import {KeyCode, CARD_ELEMENTS, Position} from "../consts";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {render} from "../utils/components";


/**
 * Закрытие подробной карточки фильма
 * @param {Object} mainContainer
 * @param {Object} details
 */
const closeDetails = (mainContainer, details) => {
  const removeCardDetails = () => {
    mainContainer.removeChild(details.getElement());
    document.removeEventListener(`keydown`, btnCloseDetailsKeyDownHandler);
  };

  const btnCloseDetailsClickHandler = () => {
    if (document.querySelector(`.film-details`)) {
      removeCardDetails();
    }
  };

  const btnCloseDetailsKeyDownHandler = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      removeCardDetails();
    }
  };

  details.setBtnCloseClickHandler(btnCloseDetailsClickHandler);
  document.addEventListener(`keydown`, btnCloseDetailsKeyDownHandler);
};


/**
 * Получение помощника для отображения детальной карточки фильма
 * @param {Object} mainContainer контейнер, в который добавляется карточка
 * @param {Object} details подробная карточка фильма
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие подробной карточки
 * @return {Function} созданный помощник
 */
const getShowDetailsHandler = (mainContainer, details) => {
  return () => {
    mainContainer.appendChild(details.getElement());
    closeDetails(mainContainer, details);
  };
};


/**
 * Добавление открытия подробной карточки фильма
 * @param {Object} {формы фильма}
 * @param {Object} mainContainer контейнер
 * @param {Function} escKeyDownHandler помощник, отвечащий за закрытие подробной карточки
 * @return {Function} созданная функция
 */
const showDetails = ({card, details}, mainContainer, escKeyDownHandler) => {
  return (cardElement) => card.setClickHandler(getShowDetailsHandler(mainContainer, details, escKeyDownHandler), cardElement);
};


/**
 * Отрисовка фильма в блок
 * @param {Object} filmsComponent компонент блока фильмов
 * @param {Object} film фильм
 */
const renderFilm = (filmsComponent, film) => {
  const mainContainer = document.querySelector(`.main`);

  const filmForm = {
    card: new FilmCardComponent(film),
    details: new FilmDetailsComponent(film)
  };

  const escKeyDownHandler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      mainContainer.removeChild(filmForm.details.getElement());
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  CARD_ELEMENTS.map(showDetails(filmForm, mainContainer, escKeyDownHandler));

  render[Position.BEFORE_END](
      filmsComponent.getElement().querySelector(`.films-list__container`),
      filmForm.card
  );
};


export {renderFilm};
