const getRandomInt = (min, max) => min + Math.floor(Math.random() * (max - min));
const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomArray = (arr, length = arr.length) => arr
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, length);

export {
  getRandomInt,
  getRandomArrayValue,
  getRandomArray,
};
