import {Count, MenuItems} from "../consts";

export const generateMenu = () => {
  return MenuItems.map((item) => ({
    name: item.name,
    link: item.link,
    isActive: item.isActive,
    count: Math.floor(Math.random() * Count.FILMS),
  }));
};
