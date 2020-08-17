const ESK_KEYCODE = 27;

export const toFirstUpperCase = (word) => word[0].toUpperCase() + word.slice(1);
export const extend = (a, ...b) => Object.assign({}, a, ...b);
export const isEscPressed = (evt) => evt.keyCode === ESK_KEYCODE;
