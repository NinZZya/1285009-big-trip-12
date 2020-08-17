import {
  InfoView,
  ControlsView,
  TabsView,
  FiltersView,
  SortView,
  NewPointButtonView,
  createPointEditorTemplate,
  createDaysTemplate,
  createDayTemplate,
  createPointsListTemplate,
  createPointsItemTemplate,
  createPointTemplate,
  createPointMessageTemplate,
  /* eslint-disable-next-line */
  createStatisticsTemplate,
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
  DESTINATIONS,
} from './mock/points';

import {PointMessage} from './const';

const {
  BEFORE_BEGIN,
  AFTER_BEGIN,
  BEFORE_END,
} = RenderPosition;

const POINTS_COUNT = 20;
const points = generatePoints(POINTS_COUNT);

const tripMainElement = document.querySelector(`.trip-main`);
const infoView = new InfoView();
render(tripMainElement, infoView, AFTER_BEGIN);

const controlsView = new ControlsView();
render(tripMainElement, controlsView, BEFORE_END);
const tripFilterEventsHeaderElement = controlsView.getElement().querySelector(`#trip-filter-events`);
const tabsView = new TabsView();
render(tripFilterEventsHeaderElement, tabsView, BEFORE_BEGIN);
const filtersView = new FiltersView();
render(controlsView, filtersView, BEFORE_END);

const newPointButtonView = new NewPointButtonView();
render(tripMainElement, newPointButtonView, BEFORE_END);

const tripEventsElement = document.querySelector(`.trip-events`);

if (points.length > 0) {
  const sortView = new SortView();
  render(tripEventsElement, sortView, BEFORE_END);
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
        const pointEditorElement = createElement(createPointEditorTemplate(point, DESTINATIONS));
        render(pointsItemElement, pointEditorElement, BEFORE_END);
      } else {
        const pointElement = createElement(createPointTemplate(point));
        render(pointsListElement, pointElement, BEFORE_END);
      }
    });
} else {
  const pointMessageNoEventsElement = createElement(
      createPointMessageTemplate(PointMessage.NO_EVENTS)
  );
  render(tripEventsElement, pointMessageNoEventsElement, BEFORE_END);
}
