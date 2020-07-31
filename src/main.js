import {createTripInfoTemplate} from './components/trip-info';
import {createTripTabsTemplate} from './components/trip-tabs';
import {createTripControlsTemplate} from './components/trip-controls';
import {createTripFiltersTemplate} from './components/trip-filters';
import {createTripSortTemplate} from './components/trip-sort';
import {createEditEventTemplate} from './components/edit-event';
import {createEditEventHeaderTemplate} from './components/edit-event-header';
import {createEditEventDetailsTemplate} from './components/edit-event-details';
/* eslint-disable-next-line */
import {createAddEventDestinationTemplate} from './components/add-event-destination';
import {createDaysTemplate} from './components/days';
import {createDayTemplate} from './components/day';
import {createEventListTemplate} from './components/events';
import {createEventTemplate} from './components/event';
import {createHiddenHeaderTemplate} from './components/hidden-header';
import {createAddEventBtnTemplate} from './components/add-event-btn';
/* eslint-disable-next-line  */
import {createNoEventsTemplate} from './components/no-events';
/* eslint-disable-next-line  */
import {createLoadingTemplate} from './components/loading';
/* eslint-disable-next-line  */
import {createStatisticsTemplate} from './components/statistics';

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
const EDIT_EVENT_DAY = 0;
const EDIT_EVENT = 1;

const MAIN_SELECTOR = `.trip-main`;
const EVENTS_SELECTOR = `.trip-events`;

const createEditEvent = () => {
  const tripEditEventElement = createElement(createEditEventTemplate());
  const editEventHeaderElement = createElement(createEditEventHeaderTemplate(DEFAULT_EVENT));
  render(tripEditEventElement, editEventHeaderElement, BEFOREEND);
  const editEventDetailsElement = createElement(createEditEventDetailsTemplate());
  render(tripEditEventElement, editEventDetailsElement, BEFOREEND);

  return tripEditEventElement;
};

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

const addEventBtnElement = createElement(createAddEventBtnTemplate());
render(tripMainElement, addEventBtnElement, BEFOREEND);

const tripEventsElement = document.querySelector(EVENTS_SELECTOR);
const tripSortElement = createElement(createTripSortTemplate());
render(tripEventsElement, tripSortElement, BEFOREEND);


const daysElement = createElement(createDaysTemplate());
render(tripEventsElement, daysElement, BEFOREEND);
for (let i = 0; i < DAY_COUNT; i++) {
  const dayElement = createElement(createDayTemplate());
  render(daysElement, dayElement, BEFOREEND);
  const eventListElement = createElement(createEventListTemplate());
  render(dayElement, eventListElement, BEFOREEND);
  for (let j = 0; j < EVENT_COUNT; j++) {
    if (i === EDIT_EVENT_DAY && j === EDIT_EVENT) {
      // временный костыль
      const wrapper = createElement(`<li class="trip-events__item"></li>`);
      const tripEditEventElement = createEditEvent();
      render(wrapper, tripEditEventElement, BEFOREEND);
      render(eventListElement, wrapper, BEFOREEND);
    } else {
      const eventElement = createElement(createEventTemplate());
      render(eventListElement, eventElement, BEFOREEND);
    }
  }
}

