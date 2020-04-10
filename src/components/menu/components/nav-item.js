/**
 * Создание разметки пункта меню
 * @param {Object} menuItem пункт меню
 * @return {string} разметка пункта
 */
export const createNavItem = (menuItem) => {
  const {name, link, isActive, count} = menuItem;

  const active = isActive ? ` main-navigation__item--active` : ``;

  return (`
    <a href="${link}" class="main-navigation__item${active}">${name}<span class="main-navigation__item-count">${count}</span></a>
  `);
};
