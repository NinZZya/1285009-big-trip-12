import {
  toFirstUpperCase,
} from './utils';

import {
  pointTypeToPreposition,
} from '../const.js';

const getPointTypeWithPreposition = (currentType) => {
  const printType = toFirstUpperCase(currentType);
  const preposition = pointTypeToPreposition[currentType];
  return preposition ? `${printType} ${preposition}` : ``;
};

export {
  getPointTypeWithPreposition,
};
