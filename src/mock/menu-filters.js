import {Count, MenuItems} from "../consts";

/**
 * Создание количества фильмов для фильтров меню
 * @return {Array}
 */
export const generateMenu = () => {
  return MenuItems.map((item) => ({
    name: item.name,
    link: item.link,
    isActive: item.isActive,
    count: Math.floor(Math.random() * Count.FILMS),
  }));
};
