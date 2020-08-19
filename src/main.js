import {
  Info as InfoView,
  Controls as ControlsView,
  Tabs as TabsView,
  Filters as FiltersView,
  NewPointButton as NewPointButtonView,
  Sort as SortView,
  Days as DaysView,
  Day as DayView,
  PointsList as PointsListView,
  PointsItem as PointsItemView,
  Point as PointView,
  PointEdit as PointEditView,
  PointMessage as PointMessageView,
  /* eslint-disable-next-line */
  Statistics as StatisticsView,
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
  isEscPressed,
} from './utils/utils';

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
  const pointEditView = new PointEditView(point, DESTINATIONS);

  const replacePointToPointEdit = () => {
    replace(pointEditView, pointView);
  };

  const replacePointEditToPoint = () => {
    replace(pointView, pointEditView);
  };

  const onEscKeyDown = (evt) => {
    if (isEscPressed) {
      evt.preventDefault();
      replacePointEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointView.setRollupButtonClickHandler(() => {
    replacePointToPointEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditView.setFormSubmitHandler(() => {
    replacePointEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  pointEditView.setFormResetHandler(() => {
    replacePointEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  pointEditView.setRollupButtonClickHandler(() => {
    replacePointEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointsListView, pointsItemView, BEFORE_END);
  render(pointsItemView, pointView, BEFORE_END);
};

const tripMainElement = document.querySelector(`.trip-main`);
const infoView = new InfoView();
render(tripMainElement, infoView, AFTER_BEGIN);

const controlsView = new ControlsView();
render(tripMainElement, controlsView, BEFORE_END);
const tripFilterEventsHeaderElement = controlsView.getFilterEventsHeaderElement();
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
