import {toFirstUpperCase} from './utils';
import {pointTypeToPreposition} from '../const.js';

export const getPointTypeWithPreposition = (currentType) => {
  const titleType = toFirstUpperCase(currentType);
  const preposition = pointTypeToPreposition[currentType];
  return preposition ? `${titleType} ${preposition}` : ``;
};

