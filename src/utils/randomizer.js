import {
  MINUTE,
  HOUR,
  DAY,
} from '../const';

const MoveDate = {
  PAST: `past`,
  FUTURE: `future`,
  RANDOM: `random`,
};

const getRandomBool = () => Math.random() > 0.5;
const getRandomInt = (min, max) => min + Math.floor(Math.random() * (max - min));
const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomArray = (arr, length = arr.length) => arr
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, length);

const getRandomDate = ({date = new Date(), minute = 59, hour = 24, day = 365, move = MoveDate.RANDOM}) => {
  let sign = null;
  switch (move) {
    case MoveDate.PAST:
      sign = -1;
      break;
    case MoveDate.FUTURE:
      sign = 1;
      break;
    case MoveDate.RANDOM:
      sign = getRandomBool ? 1 : -1;
      break;

    default: throw new Error(`Bad move date value`);
  }

  return (
    +date
    + sign * (
      getRandomInt(0 * MINUTE, minute * MINUTE)
      + getRandomInt(0, hour * HOUR)
      + getRandomInt(0, day * DAY)
    )
  );
};

export {
  getRandomBool,
  getRandomInt,
  getRandomArrayValue,
  getRandomArray,
  getRandomDate,
  MoveDate,
};
