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
import {createAddPointButtonTemplate} from './view/add-point-button/add-point-button';
/* eslint-disable-next-line  */
import {createPointMessageTemplate} from './view/point-message/point-message';
/* eslint-disable-next-line  */
import {createStatisticsTemplate} from './view/statistics/statistics';

import {
  RenderPosition,
  render,
  createElement,
} from './utils/';

import {
  DEFAULT_TYPE,
  OFFERS,
  DESTINATIONS,
} from './data';

const {
  BEFORE_BEGIN,
  AFTER_BEGIN,
  BEFORE_END,
} = RenderPosition;

const createPointEditor = () => {
  const pointEditorElement = createElement(createPointEditorTemplate());
  const tripEventEditorHeaderElement = createElement(
      createTripEventEditorHeaderTemplate(DEFAULT_TYPE, DESTINATIONS)
  );
  render(pointEditorElement, tripEventEditorHeaderElement, BEFORE_END);
  const detailsElement = createElement(
      createDetailsTemplate(OFFERS)
  );
  render(pointEditorElement, detailsElement, BEFORE_END);

  return pointEditorElement;
};

const tripMainElement = document.querySelector(`.trip-main`);
const infoElement = createElement(createInfoTemplate());
render(tripMainElement, infoElement, AFTER_BEGIN);

const controlsElement = createElement(createControlsTemplate());
render(tripMainElement, controlsElement, BEFORE_END);
const tripFilterEventsHeaderElement = controlsElement.querySelector(`#trip-filter-events`);
const tabsElement = createElement(createTabsTemplate());
render(tripFilterEventsHeaderElement, tabsElement, BEFORE_BEGIN);
const filtersElement = createElement(createFiltersTemplate());
render(controlsElement, filtersElement, BEFORE_END);

const addPointButtonElement = createElement(createAddPointButtonTemplate());
render(tripMainElement, addPointButtonElement, BEFORE_END);

const tripEventsElement = document.querySelector(`.trip-events`);
const sortElement = createElement(createSortTemplate());
render(tripEventsElement, sortElement, BEFORE_END);

const daysElement = createElement(createDaysTemplate());
render(tripEventsElement, daysElement, BEFORE_END);

for (let i = 0; i < 3; i++) {
  const dayElement = createElement(createDayTemplate());
  render(daysElement, dayElement, BEFORE_END);
  const pointsListElement = createElement(createPointsListTemplate());
  render(dayElement, pointsListElement, BEFORE_END);
  for (let j = 0; j < 3; j++) {
    const pointsItemElement = createElement(createPointsItemTemplate());
    render(pointsListElement, pointsItemElement, BEFORE_END);
    if (i === 0 && j === 1) {
      const pointEditorElement = createPointEditor();
      render(pointsItemElement, pointEditorElement, BEFORE_END);
    } else {
      const pointElement = createElement(createPointTemplate());
      render(pointsListElement, pointElement, BEFORE_END);
    }
  }
}

