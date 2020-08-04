const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

const toFirstUpperCase = (word) => word[0].toUpperCase() + word.slice(1);

export {
  createElement,
  toFirstUpperCase,
};
