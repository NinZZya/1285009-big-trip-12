const toFirstUpperCase = (word) => word[0].toUpperCase() + word.slice(1);
const extend = (a, ...b) => Object.assign({}, a, ...b);

export {
  toFirstUpperCase,
  extend,
};
