import {nanoid} from 'nanoid';
import {
  MoveDate,
  getRandomBool,
  getRandomInt,
  getRandomArrayValue,
  getRandomArray,
  getRandomDate,
} from '../utils/randomizer';

import {extend} from '../utils/utils';
import {diffDate} from '../utils/date';

const moveDateConfig = {
  minute: 10,
  hour: 3,
  day: 7,
};

const POINT_TYPES = [
  `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`,
  `check-in`, `sightseeing`, `restaurant`
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
    isActivated: getRandomBool(),
  },
  {
    key: `comfort`,
    name: `Switch to comfort class`,
    price: `100`,
    isActivated: getRandomBool(),
  },
  {
    key: `meal`,
    name: `Add meal`,
    price: `15`,
    isActivated: getRandomBool(),
  },
  {
    key: `seats`,
    name: `Choose seats`,
    price: `5`,
    isActivated: getRandomBool(),
  },
  {
    key: `train`,
    name: `Travel by train`,
    price: `40`,
    isActivated: getRandomBool(),
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

const generateOffers = () => {
  const offers = getRandomArray(OFFERS, getRandomInt(1, DESCRIPTIONS.length));
  offers.forEach((offer) => {
    offer.isActivated = getRandomBool();
  });

  return offers;
};


const generatePoint = () => {
  const dateStart = new Date(getRandomDate(moveDateConfig));
  const dateEnd = new Date(getRandomDate(extend(
      moveDateConfig,
      {
        dateStart,
        move: MoveDate.FUTURE,
      }
  )));

  return {
    id: nanoid(),
    type: getRandomArrayValue(POINT_TYPES),
    destination: getRandomArrayValue(DESTINATIONS),
    start: dateStart,
    end: dateEnd,
    duration: diffDate(dateEnd, dateStart),
    price: getRandomInt(15, 500),
    description: getRandomArray(
        DESCRIPTIONS, getRandomInt(1, DESCRIPTIONS.length)
    ).join(` `),
    photos: getRandomArray(PHOTOS, getRandomInt(1, 5)),
    offers: generateOffers(),
    isFavorite: getRandomBool(),
  };
};

const generatePoints = (count) => new Array(count).fill().map(generatePoint);

export {
  generatePoints,
  DESTINATIONS,
};
