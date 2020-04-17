import {KeyCode, CLASS_POINTER} from "../consts";
import {renderComponent} from "../utils";
import FilmCardComponent from "../components/film-card/film-card";
import FilmDetailsComponent from "../components/film-details/film-details";


/**
 * Удаление детальной карточки фильма
 * @param {Object} mainContainer контейнер, в который добавляется карточка
 * @param {Object} {формы фильма}
 */
const removeDetails = (mainContainer, {details}) => {
  const detailsForm = details.getElement().querySelector(`form`);

  const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    mainContainer.removeChild(details.getElement());
  };

  detailsForm.addEventListener(`submit`, editFormSubmitHandler);
};


/**
 * Добавление курсора-указателя для элементов
 * @param {Object} poster изображение фильма
 * @param {Object} title название фильма
 */
const addClassMarkup = (poster, title) => {
  poster.classList.add(CLASS_POINTER);
  title.classList.add(CLASS_POINTER);
};


/**
 * Отображение детальной карточки фильма
 * @param {Object} mainContainer контейнер, в который добавляется карточка
 * @param {Object} {формы фильма}
 * @param {Function} escKeyDownHandler помощник
 */
const showDetails = (mainContainer, {card, details}) => {
  const poster = card.getElement().querySelector(`.film-card__poster`);
  const title = card.getElement().querySelector(`.film-card__title`);
  const comments = card.getElement().querySelector(`.film-card__comments`);
  const btnCloseDetails = details.getElement().querySelector(`.film-details__close-btn`);

  addClassMarkup(poster, title);

  const removeCardDetails = () => {
    mainContainer.removeChild(details.getElement());
    document.removeEventListener(`keydown`, btnCloseDetailsKeyDownHandler);
  };

  const btnCloseDetailsClickHandler = () => {
    if (document.querySelector(`.film-details`)) {
      removeCardDetails();
    }
  };

  const cardClickHandler = () => {
    mainContainer.appendChild(details.getElement());
    btnCloseDetails.addEventListener(`click`, btnCloseDetailsClickHandler);
    document.addEventListener(`keydown`, btnCloseDetailsKeyDownHandler);
  };

  const btnCloseDetailsKeyDownHandler = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      removeCardDetails();
    }
  };

  poster.addEventListener(`click`, cardClickHandler);
  title.addEventListener(`click`, cardClickHandler);
  comments.addEventListener(`click`, cardClickHandler);
};


/**
 * Отрисовка фильма в блок
 * @param {Object} filmsComponent блок фильмов
 * @param {Object} film фильм
 */
const renderFilm = (filmsComponent, film) => {
  const filmsContainer = filmsComponent.getElement().querySelector(`.films-list__container`);
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

  showDetails(mainContainer, filmForm, escKeyDownHandler);
  removeDetails(mainContainer, filmForm);

  renderComponent(filmsContainer, filmForm.card.getElement());
};


export {renderFilm};
