import {
  toFirstUpperCase,
} from './utils';

import {
  pointTypeToPreposition,
} from '../const.js';

export const getPointTypeWithPreposition = (currentType) => {
  const printType = toFirstUpperCase(currentType);
  const preposition = pointTypeToPreposition[currentType];
  return preposition ? `${printType} ${preposition}` : ``;
};

