// Позиция вставки элемкнта для функции render
const RenderPosition = {
  AFTERBEGIN: `AFTERBEGIN`,
  BEFOREEND: `BEFOREEND`,
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    default:
      throw new Error(`Unknown render position: ${place}`);
  }
};

const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

const getByKey = (objectsArray, key, keyValue) => {
  return objectsArray.find((element) => {
    return element[key] === keyValue;
  });
};

const isEqual = (value1, value2) => value1 === value2;

export {
  RenderPosition,
  render,
  createElement,
  getByKey,
  isEqual,
};
