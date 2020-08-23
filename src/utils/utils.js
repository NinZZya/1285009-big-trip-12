const Key = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

export const toFirstUpperCase = (word) => word[0].toUpperCase() + word.slice(1);
export const extend = (a, ...b) => Object.assign({}, a, ...b);
export const isEscPressed = (evt) => evt.key === Key.ESCAPE || evt.key === Key.ESC;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
