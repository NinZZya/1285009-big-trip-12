import {
  InfoView,
  ControlsView,
  TabsView,
  FiltersView,
  NewPointButtonView,
  SortView,
  DaysView,
  DayView,
  PointsListView,
  PointItemView,
  PointView,
  PointEditorView,
  PointMessageView,
  /* eslint-disable-next-line */
  StatisticsView,
} from './view/';

import {
  RenderPosition,
  render,
} from './utils/dom';

import {
  formatDateYyyyMmDdWithDash,
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
  const daysView = new DaysView();
  render(tripEventsElement, daysView, BEFORE_END);

  let currentDay = null;
  let dayCount = 0;
  let dayElement = null;
  let pointsListView = null;

  points
    .sort((a, b) => a.start - b.start)
    .forEach((point, index) => {
      const pointDay = formatDateYyyyMmDdWithDash(point.start);

      if (currentDay !== pointDay) {
        currentDay = pointDay;
        dayCount++;
        dayElement = new DayView(
            {
              dayCount,
              date: point.start,
              dateTimeFormat: currentDay,
            }
        );
        render(daysView, dayElement, BEFORE_END);
        pointsListView = new PointsListView();
        render(dayElement, pointsListView, BEFORE_END);
      }

      const pointsItemView = new PointItemView();
      render(pointsListView, pointsItemView, BEFORE_END);

      if (index === 0) {
        const pointEditorView = new PointEditorView(point, DESTINATIONS);
        render(pointsItemView, pointEditorView, BEFORE_END);
      } else {
        const pointView = new PointView(point);
        render(pointsListView, pointView, BEFORE_END);
      }
    });
} else {
  const pointMessageNoEventsView = new PointMessageView(PointMessage.NO_EVENTS);
  render(tripEventsElement, pointMessageNoEventsView, BEFORE_END);
}
