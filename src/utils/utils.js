const RenderPosition = {
  AFTERBEGIN: `AFTERBEGIN`,
  BEFOREEND: `BEFOREEND`,
};

const render = (container, element, place) => {
  if (place instanceof Object) {
    container.insertBefore(element, place);
    return;
  }

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

export {
  RenderPosition,
  render,
  createElement,
};
