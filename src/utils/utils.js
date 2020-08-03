const RenderPosition = {
  BEFOREBEGIN: `BEFOREBEGIN`,
  AFTERBEGIN: `AFTERBEGIN`,
  BEFOREEND: `BEFOREEND`,
  AFTEREND: `AFTEREND`,
};

const render = (element1, element2, place) => {
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      element1.before(element2);
      break;
    case RenderPosition.AFTERBEGIN:
      element1.prepend(element2);
      break;
    case RenderPosition.BEFOREEND:
      element1.append(element2);
      break;
    case RenderPosition.AFTEREND:
      element1.after(element2);
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
