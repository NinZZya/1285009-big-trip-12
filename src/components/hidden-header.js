const createHiddenHeaderTemplate = (levelHeader, title) => {
  return `<h${levelHeader} class="visually-hidden">${title}</h${levelHeader}>`;
};

export {createHiddenHeaderTemplate};
