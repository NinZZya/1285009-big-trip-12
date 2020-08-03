const TABS = [`Table`, `Stats`];

const FILTERS = [`Everything`, `Future`, `Past`];

const SORTS = [`Event`, `Time`, `Price`];

const Type = {
  TRANSFER: `Transfer`,
  ACTIVITY: `Activity`,
};

const TRANSFERS = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const ACTVITIES = [`Check-in`, `Sightseeing`, `Restaurant`];

const pointGroupToTypes = {
  [Type.TRANSFER]: TRANSFERS,
  [Type.activity]: ACTVITIES,
};

const preposition = {
  [Type.TRANSFER]: `to`,
  [Type.ACTIVITY]: `in`,
};

const pointTypeToPreposition = new Map();
TRANSFERS
  .forEach((transfer) => (
    pointTypeToPreposition.set(
        transfer,
        preposition[[Type.TRANSFER]])
  ));

ACTVITIES
  .forEach((activity) => (
    pointTypeToPreposition.set(
        activity,
        preposition[[Type.ACTIVITY]])
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
