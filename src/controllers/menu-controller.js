import {Menu} from "../components/menu";
import {Position} from "../consts";
import {render, replace} from "../utils/components";


/**
 * Создание класса контроллера меню
 */
class MenuController {
  constructor(container, filmModel) {
    this._container = container;
    this._filmModel = filmModel;
    this._activeMenuItem = filmModel._activeFilter;
    this._menu = null;
  }


  /**
   * Метод, обеспечивабщий отрисовку меню
   */
  render() {
    const oldMenu = this._menu;

    this._menu = new Menu(
        this._filmModel.getWatchlistFilms(),
        this._filmModel.getWatchedFilms(),
        this._filmModel.getFavoriteFilms(),
        this._activeMenuItem);

    this._replace(this._container, oldMenu);
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
}


export {MenuController};
