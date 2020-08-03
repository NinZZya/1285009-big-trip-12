const TABS = [`Table`, `Stats`];

const FILTERS = new Map([
  [`everything`, `Everything`],
  [`future`, `Future`],
  [`past`, `Past`],
]);

const SORTS = new Map([
  [`event`, `Event`],
  [`time`, `Time`],
  [`price`, `Price`],
]);

type = {
  transfer: `Transfer`,
  activity: `Activity`,
}

const transfers = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const activities = [`Check-in`, `Sightseeing`, `Restaurant`];

const pointGroupToTypes = {
  [type.transfer]: transfers,
  [type.activity]: activities,
};

preposition = {
  [type.transfer]: `to`,
  [type.activity]: `in`,
};

const pointTypeToPreposition = new Map();

const PointMessage = {
  LOADING: `Loading...`,
  NO_EVENTS: `Click New Event to create your first point`,
};

export {
  TABS,
  FILTERS,
  SORTS,
  eventGroupToTypes,
  eventTypePreposition,
  TripEventMessage,
};
