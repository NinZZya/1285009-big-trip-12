import {createTripInfoTemplate} from './components/trip-info';
import {createTripTabsTemplate} from './components/trip-tabs';
import {createTripControlsTemplate} from './components/trip-controls';
import {createTripFiltersTemplate} from './components/trip-filters';
import {createTripSortTemplate} from './components/trip-sort';
import {createEditEventTemplate} from './components/edit-event/edit-event';
import {createDaysTemplate} from './components/days';
import {createDayTemplate} from './components/day';
import {createEventListTemplate} from './components/events';
import {createEventTemplate} from './components/event';
import {createHiddenHeaderTemplate} from './components/hidden-header';
import {createAddNewEventTemplate} from './components/add-new-event';
import {
  RenderPosition,
  render,
  createElement,
} from './utils/utils';

const {AFTERBEGIN, BEFOREEND} = RenderPosition;
const DEFAULT_EVENT = `flight`;
const DAY_COUNT = 3;
const EVENT_COUNT = 5;
const TRIP_HEADER_LEVEL = 2;
const TRIP_TITLE = `Switch trip view`;
const FILTER_HEADER_LEVEL = 2;
const FILTER_TITLE = `Filter events`;

const MAIN_SELECTOR = `.trip-main`;
const EVENTS_SELECTOR = `.trip-events`;

const tripMainElement = document.querySelector(MAIN_SELECTOR);
const tripInfoElement = createElement(createTripInfoTemplate());
render(tripMainElement, tripInfoElement, AFTERBEGIN);

const tripControlsElement = createElement(createTripControlsTemplate());
render(tripMainElement, tripControlsElement, BEFOREEND);
const tripHiddenHeaderElement = createElement(
    createHiddenHeaderTemplate(TRIP_HEADER_LEVEL, TRIP_TITLE)
);
render(tripControlsElement, tripHiddenHeaderElement, AFTERBEGIN);
const tripTabsElement = createElement(createTripTabsTemplate());
render(tripControlsElement, tripTabsElement, BEFOREEND);
const tripFilterHiddenHeaderElement = createElement(
    createHiddenHeaderTemplate(FILTER_HEADER_LEVEL, FILTER_TITLE)
);
render(tripControlsElement, tripFilterHiddenHeaderElement, BEFOREEND);
const tripFiltersElement = createElement(createTripFiltersTemplate());
render(tripControlsElement, tripFiltersElement, BEFOREEND);

const addNewEventElement = createElement(createAddNewEventTemplate());
render(tripMainElement, addNewEventElement, BEFOREEND);

const tripEventsElement = document.querySelector(EVENTS_SELECTOR);
const tripSortElement = createElement(createTripSortTemplate());
render(tripEventsElement, tripSortElement, BEFOREEND);
const tripEditEventElement = createElement(createEditEventTemplate(DEFAULT_EVENT));
render(tripEventsElement, tripEditEventElement, BEFOREEND);

const daysElement = createElement(createDaysTemplate());
render(tripEventsElement, daysElement, BEFOREEND);
for (let i = 0; i < DAY_COUNT; i++) {
  const dayElement = createElement(createDayTemplate());
  render(daysElement, dayElement, BEFOREEND);
  const eventListElement = createElement(createEventListTemplate());
  render(dayElement, eventListElement, BEFOREEND);
  for (let j = 0; j < EVENT_COUNT; j++) {
    const eventElement = createElement(createEventTemplate());
    render(eventListElement, eventElement, BEFOREEND);
  }
}

