import {createTripInfoTemplate} from './components/trip-info';
import {createTripTabsTemplate} from './components/trip-tabs';
import {createTripFiltersTemplate} from './components/trip-filters';
import {createTripSortTemplate} from './components/trip-sort';
import {createEditEventTemplate} from './components/edit-event/edit-event';
import {createDaysTemplate} from './components/days';
import {createDayTemplate} from './components/day';
import {createEventListTemplate} from './components/events';
import {createEventTemplate} from './components/event';
import {
  RenderPosition,
  render,
  createElement,
} from './utils/utils';

const DEFAULT_EVENT = `flight`;
const DAYS_COUNT = 3;
const EVENTS_COUNT = 5;

// Рендер информации о путешествии
const tripMain = document.querySelector(`.trip-main`);
const tripInfo = createElement(createTripInfoTemplate());
render(tripMain, tripInfo, RenderPosition.AFTERBEGIN);

// Рендер контролов (табов и фильтров)
const tripControlsElement = tripMain.querySelector(`.trip-controls`);
const tripTabsElement = createElement(createTripTabsTemplate());
const tripTabsPlaceElement = tripMain.querySelectorAll(`h2`)[1];
render(tripControlsElement, tripTabsElement, tripTabsPlaceElement);
const tripFiltersElement = createElement(createTripFiltersTemplate());
render(tripControlsElement, tripFiltersElement, RenderPosition.BEFOREEND);

// Рендер сортировки и изменеие события
const tripEventsElement = document.querySelector(`.trip-events`);
const tripSortElement = createElement(createTripSortTemplate());
render(tripEventsElement, tripSortElement, RenderPosition.BEFOREEND);
const tripEditEventElement = createElement(createEditEventTemplate(DEFAULT_EVENT));
render(tripEventsElement, tripEditEventElement, RenderPosition.BEFOREEND);

// Рендер контента
const days = createElement(createDaysTemplate());
render(tripEventsElement, days, RenderPosition.BEFOREEND);
for (let i = 0; i < DAYS_COUNT; i++) {
  const day = createElement(createDayTemplate());
  render(days, day, RenderPosition.BEFOREEND);
  const eventList = createElement(createEventListTemplate());
  render(day, eventList, RenderPosition.BEFOREEND);
  for (let j = 0; j < EVENTS_COUNT; j++) {
    const event = createElement(createEventTemplate());
    render(eventList, event, RenderPosition.BEFOREEND);
  }
}

