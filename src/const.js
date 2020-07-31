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

const EventType = {
  TRANSFER: `Transfer`,
  ACTIVITY: `Activity`,
};

const TRANSFERS = [
  {
    key: `taxi`,
    name: `Taxi`,
    type: EventType.TRANSFER
  },
  {
    key: `bus`,
    name: `Bus`,
    type: EventType.TRANSFER
  },
  {
    key: `train`,
    name: `Train`,
    type: EventType.TRANSFER
  },
  {
    key: `ship`,
    name: `Ship`,
    type: EventType.TRANSFER
  },
  {
    key: `transport`,
    name: `Transport`,
    type: EventType.TRANSFER
  },
  {
    key: `drive`,
    name: `Drive`,
    type: EventType.TRANSFER
  },
  {
    key: `flight`,
    name: `Flight`,
    type: EventType.TRANSFER
  },
];

const ACTIVITIES = [
  {
    key: `check-in`,
    name: `Check-in`,
    type: EventType.ACTIVITY,
  },
  {
    key: `sightseeing`,
    name: `Sightseeing`,
    type: EventType.ACTIVITY,
  },
  {
    key: `restaurant`,
    name: `Restaurant`,
    type: EventType.ACTIVITY,
  },
];

const EVENTS = [
  ...TRANSFERS,
  ...ACTIVITIES,
];

export {
  FILTERS,
  SORTS,
  EventType,
  EVENTS,
};
