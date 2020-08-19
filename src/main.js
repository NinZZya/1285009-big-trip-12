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
  PointsItemView,
  PointView,
  PointEditorView,
  PointMessageView,
  /* eslint-disable-next-line */
  StatisticsView,
} from './view/';

import {
  RenderPosition,
  render,
  replace,
} from './utils/dom';

import {
  formatDateISODdMmYyyyHhMm,
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
const tripPoints = generatePoints(POINTS_COUNT);

const reducePointByDay = (days, point) => {
  const date = point.start;
  const dayDate = formatDateISODdMmYyyyHhMm(date)
      .toString()
      .split(`T`)[0];

  if (Array.isArray(days[dayDate])) {
    days[dayDate].push(point);
  } else {
    days[dayDate] = [point];
  }

  return days;
};

const groupPointsByDays = (points) => points
  .sort((less, more) => less.start - more.start)
  .reduce(reducePointByDay, {});

const renderPointsItemsWithItems = (pointsListView, point) => {
  const pointsItemView = new PointsItemView();
  const pointView = new PointView(point);
  const pointEdidorView = new PointEditorView(point, DESTINATIONS);

  pointView.setEditClickHandler(() => {
    replace(pointEdidorView, pointView);
  });

  pointEdidorView.setFormSubmitHandler(() => {
    replace(pointView, pointEdidorView);
  });

  pointEdidorView.setFormResetHandler(() => {
    replace(pointView, pointEdidorView);
  });

  pointEdidorView.setRollupButtonClickHandler(() => {
    replace(pointView, pointEdidorView);
  });

  render(pointsListView, pointsItemView, BEFORE_END);
  render(pointsItemView, pointView, BEFORE_END);
};

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

if (tripPoints.length > 0) {
  const sortView = new SortView();
  render(tripEventsElement, sortView, BEFORE_END);
  const daysView = new DaysView();
  render(tripEventsElement, daysView, BEFORE_END);
  const days = groupPointsByDays(tripPoints);

  Object.entries(days)
    .forEach(([date, points], counter) => {
      const dayView = new DayView(
          {
            dayCount: counter + 1,
            isCountRender: tripPoints.length > 1,
            date,
          }
      );
      render(daysView, dayView, BEFORE_END);
      const pointsListView = new PointsListView();
      render(dayView, pointsListView, BEFORE_END);

      points.forEach((point) => {
        renderPointsItemsWithItems(pointsListView, point);
      });
    });
} else {
  const pointMessageNoEventsView = new PointMessageView(PointMessage.NO_EVENTS);
  render(tripEventsElement, pointMessageNoEventsView, BEFORE_END);
}
