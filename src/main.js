import {createTripInfoTemplate} from './components/trip-info';
import {createTripTabsTemplate} from './components/trip-tabs';
import {createTripFiltersTemplate} from './components/trip-filters';
import {createTripSortTemplate} from './components/trip-sort';
import {createEditEventTemplate} from './components/edit-event/edit-event';
import {createDaysTemplate} from './components/days';
import {createDayTemplate} from './components/day';
import {createEventListTemplate} from './components/events';
import {createEventTemplate} from './components/event';
import {createHiddenHeaderTemplate} from './components/hidden-header';
import {
  RenderPosition,
  render,
  createElement,
} from './utils/utils';

const DEFAULT_EVENT = `flight`;
const DAY_COUNT = 3;
const EVENT_COUNT = 5;
const TRIP_HEADER_LEVEL = 2;
const TRIP_TITLE = `Switch trip view`;
const FILTER_HEADER_LEVEL = 2;
const FILTER_TITLE = `Filter events`;

const TripSelector = {
  MAIN: `.trip-main`,
  CONTROLS: `.trip-controls`,
  EVENTS: `.trip-events`,
};

// Рендер информации о путешествии
const tripMain = document.querySelector(TripSelector.MAIN);
const tripInfo = createElement(createTripInfoTemplate());
render(tripMain, tripInfo, RenderPosition.AFTERBEGIN);

// Рендер контролов (табов и фильтров)
const tripControlsElement = tripMain.querySelector(TripSelector.CONTROLS);
const tripHiddenHeaderElement = createElement(
    createHiddenHeaderTemplate(TRIP_HEADER_LEVEL, TRIP_TITLE)
);
render(tripControlsElement, tripHiddenHeaderElement, RenderPosition.AFTERBEGIN);
const tripTabsElement = createElement(createTripTabsTemplate());
render(tripControlsElement, tripTabsElement, RenderPosition.BEFOREEND);
const tripFilterHiddenHeaderElement = createElement(
    createHiddenHeaderTemplate(FILTER_HEADER_LEVEL, FILTER_TITLE)
);
render(tripControlsElement, tripFilterHiddenHeaderElement, RenderPosition.BEFOREEND);
const tripFiltersElement = createElement(createTripFiltersTemplate());
render(tripControlsElement, tripFiltersElement, RenderPosition.BEFOREEND);

// Рендер сортировки и изменеие события
const tripEventsElement = document.querySelector(TripSelector.EVENTS);
const tripSortElement = createElement(createTripSortTemplate());
render(tripEventsElement, tripSortElement, RenderPosition.BEFOREEND);
const tripEditEventElement = createElement(createEditEventTemplate(DEFAULT_EVENT));
render(tripEventsElement, tripEditEventElement, RenderPosition.BEFOREEND);

// Рендер контента
const daysElement = createElement(createDaysTemplate());
render(tripEventsElement, daysElement, RenderPosition.BEFOREEND);
for (let i = 0; i < DAY_COUNT; i++) {
  const dayElement = createElement(createDayTemplate());
  render(daysElement, dayElement, RenderPosition.BEFOREEND);
  const eventListElement = createElement(createEventListTemplate());
  render(dayElement, eventListElement, RenderPosition.BEFOREEND);
  for (let j = 0; j < EVENT_COUNT; j++) {
    const eventElement = createElement(createEventTemplate());
    render(eventListElement, eventElement, RenderPosition.BEFOREEND);
  }
}

