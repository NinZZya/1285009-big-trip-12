const Key = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

export const toFirstUpperCase = (word) => word[0].toUpperCase() + word.slice(1);
export const extend = (a, ...b) => Object.assign({}, a, ...b);
export const isEscPressed = (evt) => evt.key === Key.ESCAPE || evt.key === Key.ESC;
