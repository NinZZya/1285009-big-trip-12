import {createInfoTemplate} from './view/info/info';
import {createTabsTemplate} from './view/tabs/tabs';
import {createControlsTemplate} from './view/controls/controls';
import {createFiltersTemplate} from './view/filters/filters';
import {createSortTemplate} from './view/sort/sort';
import {createPointEditorTemplate} from './view/point-editor/point-editor';
import {createTripEventEditorHeaderTemplate} from './view/point-editor/header';
import {createDetailsTemplate} from './view/point-editor/details';
/* eslint-disable-next-line */
import {createDestinationTemplate} from './view/point-editor/destination';
import {createDaysTemplate} from './view/days/days';
import {createDayTemplate} from './view/day/day';
import {createPointsListTemplate} from './view/points-list/points-list';
import {createPointsItemTemplate} from './view/points-item/points-item';
import {createPointTemplate} from './view/point/point';
import {createOfferTemplate} from './view/point/templates';
import {createAddPointButtonTemplate} from './view/add-point-button/add-point-button';
/* eslint-disable-next-line  */
import {createPointMessageTemplate} from './view/point-message/point-message';
/* eslint-disable-next-line  */
import {createStatisticsTemplate} from './view/statistics/statistics';

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

const {
  BEFOREBEGIN,
  AFTERBEGIN,
  BEFOREEND,
} = RenderPosition;

const createPointEditor = () => {
  const pointEditorElement = createElement(createPointEditorTemplate());
  const tripEventEditorHeaderElement = createElement(
      createTripEventEditorHeaderTemplate(DEFAULT_TYPE, DESTINATIONS)
  );
  render(pointEditorElement, tripEventEditorHeaderElement, BEFOREEND);
  const detailsElement = createElement(
      createDetailsTemplate(OFFERS)
  );
  render(pointEditorElement, detailsElement, BEFOREEND);

  return pointEditorElement;
};

const tripMainElement = document.querySelector(`.trip-main`);
const infoElement = createElement(createInfoTemplate());
render(tripMainElement, infoElement, AFTERBEGIN);

const controlsElement = createElement(createControlsTemplate());
render(tripMainElement, controlsElement, BEFOREEND);
const tripFilterEventsHeaderElement = controlsElement.querySelector(`#trip-filter-events`);
const tabsElement = createElement(createTabsTemplate());
render(tripFilterEventsHeaderElement, tabsElement, BEFOREBEGIN);
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
      const pointEditorElement = createPointEditor();
      render(pointsItemElement, pointEditorElement, BEFOREEND);
    } else {
      const pointElement = createElement(createPointTemplate());
      render(pointsListElement, pointElement, BEFOREEND);
      const offersElement = pointElement.querySelector(`.event__selected-offers`);
      const offerElement = createElement(createOfferTemplate());
      render(offersElement, offerElement, BEFOREEND);

    }
  }
}

