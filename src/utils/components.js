import {Position} from "../consts";


/**
 * Создание DOM-элемента
 * @param {string} template шаблон-разметка для создания элемента
 * @return {string} разметка созданного элемента
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


/**
 * Замена компонента
 * @param {Object} newComponent новый компонент
 * @param {Object} oldComponent заменяемый заменяемый
 */
export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


/**
 * Отрисовка компонента на странице
 * @param {Element} container контейнер, в который отрисосывается шаблон
 * @param {string} component отрисовываемый компонент
 * @param {string} position место в контейнере для отрисовываемого шаблона
 * @return {void}
 */
export const render = (container, component, position = Position.BEFORE_END) => {
  switch (position) {
    case Position.AFTER_BEGIN:
      container.prepend(component.getElement());
      break;
    case Position.AFTER_END:
      container.after(component.getElement());
      break;
    case Position.BEFORE_BEGIN:
      container.before(component.getElement());
      break;
    case Position.BEFORE_END:
      container.append(component.getElement());
      break;
  }
};


/**
 * Удаление компонента
 * @param {Object} component удаляемый компонент
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
