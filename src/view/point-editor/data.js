const TRANSFERS = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const ACTVITIES = [`Check-in`, `Sightseeing`, `Restaurant`];

const PREPOSITION_TRANSFER = `to`;
const PREPOSITION_ACTIVITY = `in`;

const pointGroupToTypes = {
  Transfer: TRANSFERS,
  Activity: ACTVITIES,
};

const pointTypeToPreposition = {
  'taxi': PREPOSITION_TRANSFER,
  'bus': PREPOSITION_TRANSFER,
  'train': PREPOSITION_TRANSFER,
  'ship': PREPOSITION_TRANSFER,
  'transport': PREPOSITION_TRANSFER,
  'drive': PREPOSITION_TRANSFER,
  'flight': PREPOSITION_TRANSFER,
  'check-in': PREPOSITION_ACTIVITY,
  'sightseeing': PREPOSITION_ACTIVITY,
  'restaurant': PREPOSITION_ACTIVITY,
};

export {
  pointGroupToTypes,
  pointTypeToPreposition,
};
