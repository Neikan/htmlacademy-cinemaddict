import {MenuItems} from "../../consts";
import {createNav} from "./components/nav-block";
import {createNavItem} from "./components/nav-item";
import {generateMenu} from "../../mock/menu-filters";

/**
 * Создание разметки главного меню
 * @return {string} разметка главного меню
 */
export const createMenu = () => {
  return createNav(generateMenu(MenuItems).map((it) => createNavItem(it)).join(`\n`));
};
