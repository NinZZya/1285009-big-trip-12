import {
  toFirstUpperCase,
} from '../../utils/utils';

import {
  pointTypeToPreposition,
} from './data';

const getPointTypeWithPreposition = (currentType) => {
  const printType = toFirstUpperCase(currentType);
  const preposition = pointTypeToPreposition[currentType];
  return preposition ? `${printType} ${preposition}` : ``;
};

export {
  getPointTypeWithPreposition,
};
