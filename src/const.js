export const PointMessage = {
  LOADING: `Loading...`,
  NO_EVENTS: `Click New Event to create your first point`,
};

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

const TRANSFERS = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const ACTVITIES = [`Check-in`, `Sightseeing`, `Restaurant`];

const PointGroupType = {
  TRANSFER: `Transfer`,
  ACTVITY: `Activity`,
};

export const pointGroupToTypes = {
  [PointGroupType.TRANSFER]: TRANSFERS,
  [PointGroupType.ACTVITY]: ACTVITIES,
};

const pointGropTypeToPreposition = {
  [PointGroupType.TRANSFER]: `to`,
  [PointGroupType.ACTVITY]: `in`,
};

export const pointTypeToPreposition = {
  'taxi': pointGropTypeToPreposition[PointGroupType.TRANSFER],
  'bus': pointGropTypeToPreposition[PointGroupType.TRANSFER],
  'train': pointGropTypeToPreposition[PointGroupType.TRANSFER],
  'ship': pointGropTypeToPreposition[PointGroupType.TRANSFER],
  'transport': pointGropTypeToPreposition[PointGroupType.TRANSFER],
  'drive': pointGropTypeToPreposition[PointGroupType.TRANSFER],
  'flight': pointGropTypeToPreposition[PointGroupType.TRANSFER],
  'check-in': pointGropTypeToPreposition[PointGroupType.ACTVITY],
  'sightseeing': pointGropTypeToPreposition[PointGroupType.ACTVITY],
  'restaurant': pointGropTypeToPreposition[PointGroupType.ACTVITY],
};

export const SortType = {
  EVENT: `Event`,
  TIME: `Time`,
  PRICE: `Price`,
};

export const UserAction = {
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};
