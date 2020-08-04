const TABS = [`Table`, `Stats`];

const FILTERS = [`Everything`, `Future`, `Past`];

const SORTS = [`Event`, `Time`, `Price`];

const PointGroup = {
  TRANSFER: `Transfer`,
  ACTIVITY: `Activity`,
};

const TRANSFERS = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const ACTVITIES = [`Check-in`, `Sightseeing`, `Restaurant`];

const pointGroupToTypes = {
  [PointGroup.TRANSFER]: TRANSFERS,
  [PointGroup.ACTIVITY]: ACTVITIES,
};

const pointGroupToPreposition = {
  [PointGroup.TRANSFER]: `to`,
  [PointGroup.ACTIVITY]: `in`,
};

const pointTypeToPreposition = new Map();
TRANSFERS
  .forEach((transfer) => (
    pointTypeToPreposition.set(
        transfer,
        pointGroupToPreposition[PointGroup.TRANSFER])
  ));

ACTVITIES
  .forEach((activity) => (
    pointTypeToPreposition.set(
        activity,
        pointGroupToPreposition[PointGroup.ACTIVITY])
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
