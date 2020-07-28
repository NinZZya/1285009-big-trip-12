// Позиция вставки элемкнта для функции render
const RenderPosition = {
  AFTERBEGIN: `AFTERBEGIN`,
  BEFOREEND: `BEFOREEND`,
};

/**
 * Вставляет element в container на место place (значение RenderPosition)
 * @param {Object} container Место вставки элемента
 * @param {Object} element Элемент для вставки
 * @param {string} place Значение RenderPosition
 */

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

/**
 *  Создаёт элемент из шабдона
 * @param {string} template Шаблон элемента
 */

const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export {
  RenderPosition,
  render,
  createElement,
};
