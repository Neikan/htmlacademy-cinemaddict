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
 */
export const render = {
  'beforebegin': (container, component) =>
    container.before(component.getElement()),

  'beforeend': (container, component) =>
    container.append(component.getElement()),

  'afterend': (container, component) =>
    container.after(component.getElement()),

  'afterbegin': (container, component) =>
    container.prepend(component.getElement())
};


/**
 * Удаление компонента
 * @param {Object} component удаляемый компонент
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


/**
 * Создание элемента картинки
 * @param {string} imageName название
 * @return {Object} созданный элемент
 */
export const getImageElement = (imageName) => {
  const imgElement = document.createElement(`img`);
  imgElement.src = `./images/emoji/${imageName}.png`;
  imgElement.width = `55`;
  imgElement.height = `55`;
  imgElement.alt = `emoji-${imageName}`;
  return imgElement;
};

/**
 * Получение элемента по селектору класса
 * @param {Object} contaner
 * @param {string} selector
 * @return {Object} найденный элемент
 */
export const getItem = (contaner, selector) => contaner.querySelector(`.${selector}`);
