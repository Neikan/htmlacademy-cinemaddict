import Menu from "../components/menu";
import {Position} from "../consts";
import {render, replace, remove} from "../utils/components";


/**
 * Создание класса контроллера меню
 */
export default class MenuController {
  constructor(container, filmsModel, _filterTypeChangeHandler) {
    this._container = container;
    this._filmModel = filmsModel;
    this._filterTypeChangeHandler = _filterTypeChangeHandler;
    this._menu = null;
  }


  /**
   * Метод, обеспечивабщий отрисовку меню
   */
  render() {
    const oldMenu = this._menu;

    this._setMenu();
    this._replace(this._container, oldMenu);
  }


  /**
   * Метод, обеспечивающий создание компонента меню
   */
  _setMenu() {
    this._menu = new Menu(this._filmModel.getCountsFilmsByFilters(), this._filmModel.getFilterType());
    this._menu.setFilterChangeHandler(this._filterTypeChangeHandler);
  }


  /**
   * Метод, обеспечивающий обновление меню
   * @param {Object} container
   * @param {Object} oldMenu
   */
  _replace(container, oldMenu) {
    if (!oldMenu) {
      render[Position.AFTER_BEGIN](container, this._menu);
    } else {
      replace(this._menu, oldMenu);
    }
  }


  /**
   * Метод, обеспечивающий удаление текущего меню
   */
  remove() {
    remove(this._menu);
  }
}
