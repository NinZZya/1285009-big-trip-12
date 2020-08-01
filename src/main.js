import {createTripInfoTemplate} from './components/trip-info';
import {createTripTabsTemplate} from './components/trip-tabs';
import {createTripControlsTemplate} from './components/trip-controls';
import {createTripFiltersTemplate} from './components/trip-filters';
import {createTripSortTemplate} from './components/trip-sort';
import {createTripEventEditorTemplate} from './components/trip-event-editor';
import {createTripEventEditorHeaderTemplate} from './components/trip-event-editor-header';
import {createTripEventEditorDetailsTemplate} from './components/trip-event-editor-details';
/* eslint-disable-next-line */
import {createTripEventEditorDestinationTemplate} from './components/trip-event-editor-destination';
import {createTripDaysTemplate} from './components/trip-days';
import {createTripDayTemplate} from './components/trip-day';
import {createTripEventsTemplate} from './components/trip-events';
import {createTripEventTemplate} from './components/trip-event';
import {createHiddenHeaderTemplate} from './components/hidden-header';
import {createAddTripEventButtonTemplate} from './components/add-trip-event-button';
/* eslint-disable-next-line  */
import {createNoEventsTemplate} from './components/no-events';
/* eslint-disable-next-line  */
import {createLoadingTemplate} from './components/loading';
/* eslint-disable-next-line  */
import {createStatisticsTemplate} from './components/trip-statistics';

import {
  RenderPosition,
  render,
  createElement,
} from './utils/utils';

import {
  OFFERS,
  DESTINATIONS,
} from './data';

const {AFTERBEGIN, BEFOREEND} = RenderPosition;
const DEFAULT_EVENT = `Flight`;
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

const createTripEventEditor = () => {
  const tripEventEditorElement = createElement(createTripEventEditorTemplate());
  const tripEventEditorHeaderElement = createElement(
      createTripEventEditorHeaderTemplate(DEFAULT_EVENT, DESTINATIONS)
  );
  render(tripEventEditorElement, tripEventEditorHeaderElement, BEFOREEND);
  const tripEventEditorDetailsElement = createElement(
      createTripEventEditorDetailsTemplate(OFFERS)
  );
  render(tripEventEditorElement, tripEventEditorDetailsElement, BEFOREEND);

  return tripEventEditorElement;
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

const addEventButtonElement = createElement(createAddTripEventButtonTemplate());
render(tripMainElement, addEventButtonElement, BEFOREEND);

const tripEventsElement = document.querySelector(EVENTS_SELECTOR);
const tripSortElement = createElement(createTripSortTemplate());
render(tripEventsElement, tripSortElement, BEFOREEND);


const tripDaysElement = createElement(createTripDaysTemplate());
render(tripEventsElement, tripDaysElement, BEFOREEND);
for (let i = 0; i < DAY_COUNT; i++) {
  const tripDayElement = createElement(createTripDayTemplate());
  render(tripDaysElement, tripDayElement, BEFOREEND);
  const eventListElement = createElement(createTripEventsTemplate());
  render(tripDayElement, eventListElement, BEFOREEND);
  for (let j = 0; j < EVENT_COUNT; j++) {
    if (i === EDIT_EVENT_DAY && j === EDIT_EVENT) {
      const wrapper = createElement(`<li class="trip-events__item"></li>`);
      const tripEditEventElement = createTripEventEditor();
      render(wrapper, tripEditEventElement, BEFOREEND);
      render(eventListElement, wrapper, BEFOREEND);
    } else {
      const tripEventElement = createElement(createTripEventTemplate());
      render(eventListElement, tripEventElement, BEFOREEND);
    }
  }
}

