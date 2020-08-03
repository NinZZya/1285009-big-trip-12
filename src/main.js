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
import {createDaysTemplate} from './components/days/days';
import {createDayTemplate} from './components/day/day';
import {createPointsListTemplate} from './components/points-list/points-list';
import {createPointsItemTemplate} from './components/points-item/points-item';
import {createPointTemplate} from './components/point/point';
import {createOfferTemplate} from './components/point/templates';
import {createAddPointButtonTemplate} from './components/add-point-button/add-point-button';
/* eslint-disable-next-line  */
import {createPointMessageTemplate} from './components/point-message/point-message';
/* eslint-disable-next-line  */
import {createStatisticsTemplate} from './components/statistics/statistics';

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

const addPointButtonElement = createElement(createAddPointButtonTemplate());
render(tripMainElement, addPointButtonElement, BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);
const sortElement = createElement(createSortTemplate());
render(tripEventsElement, sortElement, BEFOREEND);

const daysElement = createElement(createDaysTemplate());
render(tripEventsElement, daysElement, BEFOREEND);

for (let i = 0; i < 3; i++) {
  const dayElement = createElement(createDayTemplate());
  render(daysElement, dayElement, BEFOREEND);
  const pointsListElement = createElement(createPointsListTemplate());
  render(dayElement, pointsListElement, BEFOREEND);
  for (let j = 0; j < 3; j++) {
    const pointsItemElement = createElement(createPointsItemTemplate());
    render(pointsListElement, pointsItemElement, BEFOREEND);
    if (i === 0 && j === 1) {
      const tripEditEventElement = createTripEventEditor();
      render(pointsItemElement, tripEditEventElement, BEFOREEND);
    } else {
      const pointElement = createElement(createPointTemplate());
      render(pointsListElement, pointElement, BEFOREEND);
      const offersElement = pointElement.querySelector(`.event__selected-offers`);
      const offerElement = createElement(createOfferTemplate());
      render(offersElement, offerElement, BEFOREEND);

    }
  }
}

