const TABS = [`Table`, `Stats`];

const FILTERS = [`Everything`, `Future`, `Past`];

const SORTS = [`Event`, `Time`, `Price`];

const PointType = {
  TRANSFER: `Transfer`,
  ACTIVITY: `Activity`,
};

const TRANSFERS = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const ACTVITIES = [`Check-in`, `Sightseeing`, `Restaurant`];

const pointGroupToTypes = {
  [PointType.TRANSFER]: TRANSFERS,
  [PointType.ACTIVITY]: ACTVITIES,
};

const preposition = {
  [PointType.TRANSFER]: `to`,
  [PointType.ACTIVITY]: `in`,
};

const pointTypeToPreposition = new Map();
TRANSFERS
  .forEach((transfer) => (
    pointTypeToPreposition.set(
        transfer,
        preposition[PointType.TRANSFER])
  ));

ACTVITIES
  .forEach((activity) => (
    pointTypeToPreposition.set(
        activity,
        preposition[PointType.ACTIVITY])
  ));

const PointMessage = {
  LOADING: `Loading...`,
  NO_EVENTS: `Click New Event to create your first point`,
};

export {
  TABS,
  FILTERS,
  SORTS,
  pointGroupToTypes,
  pointTypeToPreposition,
  PointMessage,
};
