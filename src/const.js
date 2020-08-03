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

const transfers = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const activities = [`Check-in`, `Sightseeing`, `Restaurant`];

const pointGroupToTypes = {
  Transfer: transfers,
  Activity: activities,
};

const pointTypePreposition = {
  to: transfers,
  in: activities,
};

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
