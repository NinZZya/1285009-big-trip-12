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
  createAddPointButtonTemplate,
  /* eslint-disable-next-line */
  createPointMessageTemplate,
  /* eslint-disable-next-line */
  createStatisticsTemplate,
} from './view/';

import {
  RenderPosition,
  render,
  createElement,
} from './utils/dom';

const {
  BEFORE_BEGIN,
  AFTER_BEGIN,
  BEFORE_END,
} = RenderPosition;

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
      const pointEditorElement = createElement(createPointEditorTemplate());
      render(pointsItemElement, pointEditorElement, BEFORE_END);
    } else {
      const pointElement = createElement(createPointTemplate());
      render(pointsListElement, pointElement, BEFORE_END);
    }
  }
}
