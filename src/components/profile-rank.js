import AbstractComponent from './abstract/component.js';


/**
 * Создание разметки блока ранга профиля пользователя
 * @param {string} rank ранг профиля пользователя
 * @return {string} разметка блока
 */
const createProfileRank = (rank) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


export default class ProfileRank extends AbstractComponent {
  constructor(rankDescription) {
    super();

    this._rankDescription = rankDescription;
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createProfileRank(this._rankDescription);
  }
}
