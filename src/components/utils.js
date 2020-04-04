import {Position} from "./consts";

/**
 * Отрисовка элемента страницы ("компонента")
 * @param {Element} container контейнер, в который отрисосывается шаблон
 * @param {string} template отрисовываемый шаблон
 * @param {string} position место в контейнере для отрисовываемого шаблона
 * @return {void}
 */
export const render = (container, template, position = Position.BEFORE_END) =>
  void container.insertAdjacentHTML(position, template);

