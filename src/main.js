import {
  createInfoTemplate,
  createTabsTemplate,
  createControlsTemplate,
  createFiltersTemplate,
  createSortTemplate,
  createPointEditorTemplate,
  createDaysTemplate,
  createDayTemplate,
  createPointsListTemplate,
  createPointsItemTemplate,
  createPointTemplate,
  createNewPointButtonTemplate,
  createPointMessageTemplate,
  /* eslint-disable-next-line */
  createStatisticsTemplate,
  PointMessage,
} from './view/';

import {
  RenderPosition,
  render,
  createElement,
} from './utils/dom';

import {
  convertToShortDateWithDash,
} from './utils/date';

import {
  generatePoints,
} from './mock/points';

const {
  BEFORE_BEGIN,
  AFTER_BEGIN,
  BEFORE_END,
} = RenderPosition;

const POINTS_COUNT = 20;
const points = generatePoints(POINTS_COUNT);

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

const newPointButtonElement = createElement(createNewPointButtonTemplate());
render(tripMainElement, newPointButtonElement, BEFORE_END);

const tripEventsElement = document.querySelector(`.trip-events`);

if (points.length) {
  const sortElement = createElement(createSortTemplate());
  render(tripEventsElement, sortElement, BEFORE_END);
  const daysElement = createElement(createDaysTemplate());
  render(tripEventsElement, daysElement, BEFORE_END);

  let currentDay = null;
  let dayCount = 0;
  let dayElement = null;
  let pointsListElement = null;

  points
    .sort((a, b) => a.start - b.start)
    .forEach((point, index) => {
      const pointDay = convertToShortDateWithDash(point.start);

      if (currentDay !== pointDay) {
        currentDay = pointDay;
        dayCount++;
        dayElement = createElement(createDayTemplate(
            {
              dayCount,
              date: point.start,
              dateTimeFormat: currentDay,
            }
        ));
        render(daysElement, dayElement, BEFORE_END);
        pointsListElement = createElement(createPointsListTemplate());
        render(dayElement, pointsListElement, BEFORE_END);
      }

      const pointsItemElement = createElement(createPointsItemTemplate());
      render(pointsListElement, pointsItemElement, BEFORE_END);

      if (index === 0) {
        const pointEditorElement = createElement(createPointEditorTemplate(point));
        render(pointsItemElement, pointEditorElement, BEFORE_END);
      } else {
        const pointElement = createElement(createPointTemplate(point));
        render(pointsListElement, pointElement, BEFORE_END);
      }
    });
} else {
  const pointMessageNoEvents = createElement(
      createPointMessageTemplate(PointMessage.NO_EVENTS)
  );
  render(tripEventsElement, pointMessageNoEvents, BEFORE_END);
}
