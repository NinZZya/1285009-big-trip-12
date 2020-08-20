export const PointMessage = {
  LOADING: `Loading...`,
  NO_EVENTS: `Click New Event to create your first point`,
};

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

const TRANSFERS = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const ACTVITIES = [`Check-in`, `Sightseeing`, `Restaurant`];

const PointGropType = {
  TRANSFER: `Transfer`,
  ACTVITY: `Activity`,
};

export const pointGroupToTypes = {
  [PointGropType.TRANSFER]: TRANSFERS,
  [PointGropType.ACTVITY]: ACTVITIES,
};

const pointGropTypeToPreposition = {
  [PointGropType.TRANSFER]: `to`,
  [PointGropType.ACTVITY]: `in`,
};

export const pointTypeToPreposition = {
  'taxi': pointGropTypeToPreposition[PointGropType.TRANSFER],
  'bus': pointGropTypeToPreposition[PointGropType.TRANSFER],
  'train': pointGropTypeToPreposition[PointGropType.TRANSFER],
  'ship': pointGropTypeToPreposition[PointGropType.TRANSFER],
  'transport': pointGropTypeToPreposition[PointGropType.TRANSFER],
  'drive': pointGropTypeToPreposition[PointGropType.TRANSFER],
  'flight': pointGropTypeToPreposition[PointGropType.TRANSFER],
  'check-in': pointGropTypeToPreposition[PointGropType.ACTVITY],
  'sightseeing': pointGropTypeToPreposition[PointGropType.ACTVITY],
  'restaurant': pointGropTypeToPreposition[PointGropType.ACTVITY],
};

