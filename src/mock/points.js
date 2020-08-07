import {
  MoveDate,
  getRandomInt,
  getRandomArrayValue,
  getRandomArray,
  getRandomDate,
} from '../utils/randomizer';

import {extend} from '../utils/utils';

const moveDateConfig = {
  minute: 10,
  hour: 3,
  day: 7,
};

const POINT_TYPES = [
  `Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`,
  `Check-in`, `Sightseeng`, `Restaurant`
];
const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

const OFFERS = [
  {
    key: `luggage`,
    name: `Add luggage`,
    price: `30`,
  },
  {
    key: `comfort`,
    name: `Switch to comfort class`,
    price: `100`,
  },
  {
    key: `meal`,
    name: `Add meal`,
    price: `15`,
  },
  {
    key: `seats`,
    name: `Choose seats`,
    price: `5`,
  },
  {
    key: `train`,
    name: `Travel by train`,
    price: `40`,
  },
];

const DESTINATIONS = [
  `New York`,
  `Miami`,
  `San Francisco`,
  `Chicago`,
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
];

const PHOTOS = [
  `img/photo/1.jpg`,
  `img/photo/2.jpg`,
  `img/photo/3.jpg`,
  `img/photo/4.jpg`,
  `img/photo/5.jpg`,
];


const generatePoint = () => {
  const date = getRandomDate(moveDateConfig);
  return {
    type: getRandomArrayValue(POINT_TYPES),
    destination: getRandomArrayValue(DESTINATIONS),
    start: date,
    end: getRandomDate(extend(
        moveDateConfig,
        {
          date,
          move: MoveDate.FUTURE,
        }
    )),
    price: getRandomInt(15, 500),
    description: getRandomArray(
        DESCRIPTIONS, getRandomInt(1, DESCRIPTIONS.length)
    ).join(` `),
    photos: getRandomArray(PHOTOS, getRandomInt(1, 5)),
    offers: getRandomArray(OFFERS, getRandomInt(1, DESCRIPTIONS.length)),
  };
};

const generatePoints = (count) => new Array(count).fill().map(generatePoint);

export {
  generatePoints,
};
