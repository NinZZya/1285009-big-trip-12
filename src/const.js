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

const eventGroupToTypes = {
  Transfer: transfers,
  Activity: activities,
};

const eventTypePreposition = {
  to: transfers,
  in: activities,
};

export {
  FILTERS,
  SORTS,
  eventGroupToTypes,
  eventTypePreposition,
};
