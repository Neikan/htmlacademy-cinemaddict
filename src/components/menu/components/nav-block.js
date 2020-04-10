/**
 * Создание шаблона главного меню (фильтры и статистика)
 * @param {Array} menuItems пункты меню
 * @return {string} разметка главное меню
 */
export const createNav = (menuItems) => {
  // main-navigation__item--active

  return (`
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${menuItems}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `);
};
