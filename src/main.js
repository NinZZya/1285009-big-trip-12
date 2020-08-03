import {createInfoTemplate} from './components/info/info';
import {createTabsTemplate} from './components/tabs/tabs';
import {createControlsTemplate} from './components/controls/controls';
import {createFiltersTemplate} from './components/filters/filters';
import {createSortTemplate} from './components/sort/sort';
import {createTripEventEditorTemplate} from './components/trip-event-editor';
import {createTripEventEditorHeaderTemplate} from './components/trip-event-editor-header';
import {createTripEventEditorDetailsTemplate} from './components/trip-event-editor-details';
/* eslint-disable-next-line */
import {createTripEventEditorDestinationTemplate} from './components/trip-event-editor-destination';
import {createTripDaysListTemplate} from './components/trip-days-list';
import {createDayTemplate} from './components/day/day';
import {createTripEventsListTemplate} from './components/trip-events-list';
import {createTripEventTemplate} from './components/trip-event';
import {createAddTripEventButtonTemplate} from './components/add-trip-event-button';
/* eslint-disable-next-line  */
import {createTripEventMessageTemplate} from './components/trip-event-message';
/* eslint-disable-next-line  */
import {createStatisticsTemplate} from './components/trip-statistics';

import {
  RenderPosition,
  render,
  createElement,
} from './utils/utils';

import {
  DEFAULT_TYPE,
  OFFERS,
  DESTINATIONS,
} from './data';

const {AFTERBEGIN, BEFOREEND} = RenderPosition;

const createTripEventEditor = () => {
  const tripEventEditorElement = createElement(createTripEventEditorTemplate());
  const tripEventEditorHeaderElement = createElement(
      createTripEventEditorHeaderTemplate(DEFAULT_TYPE, DESTINATIONS)
  );
  render(tripEventEditorElement, tripEventEditorHeaderElement, BEFOREEND);
  const tripEventEditorDetailsElement = createElement(
      createTripEventEditorDetailsTemplate(OFFERS)
  );
  render(tripEventEditorElement, tripEventEditorDetailsElement, BEFOREEND);

  return tripEventEditorElement;
};

const tripMainElement = document.querySelector(`.trip-main`);
const infoElement = createElement(createInfoTemplate());
render(tripMainElement, infoElement, AFTERBEGIN);

const controlsElement = createElement(createControlsTemplate());
render(tripMainElement, controlsElement, BEFOREEND);
const tripFilterEventsHeaderElement = controlsElement.querySelector(`#trip-filter-events`);
const tabsElement = createElement(createTabsTemplate());
render(controlsElement, tabsElement, tripFilterEventsHeaderElement);
const filtersElement = createElement(createFiltersTemplate());
render(controlsElement, filtersElement, BEFOREEND);

const addEventButtonElement = createElement(createAddTripEventButtonTemplate());
render(tripMainElement, addEventButtonElement, BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);
const sortElement = createElement(createSortTemplate());
render(tripEventsElement, sortElement, BEFOREEND);

const tripDaysListElement = createElement(createTripDaysListTemplate());
render(tripEventsElement, tripDaysListElement, BEFOREEND);

for (let i = 0; i < 3; i++) {
  const dayElement = createElement(createDayTemplate());
  render(tripDaysListElement, dayElement, BEFOREEND);
  const tripEventsListElement = createElement(createTripEventsListTemplate());
  render(dayElement, tripEventsListElement, BEFOREEND);
  for (let j = 0; j < 3; j++) {
    if (i === 0 && j === 1) {
      const wrapper = createElement(`<li class="trip-events__item"></li>`);
      const tripEditEventElement = createTripEventEditor();
      render(wrapper, tripEditEventElement, BEFOREEND);
      render(tripEventsListElement, wrapper, BEFOREEND);
    } else {
      const tripEventElement = createElement(createTripEventTemplate());
      render(tripEventsListElement, tripEventElement, BEFOREEND);
    }
  }
}

