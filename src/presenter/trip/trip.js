import {
  Sort as SortView,
  Days as DaysView,
  Day as DayView,
  PointsList as PointsListView,
  PointsItem as PointsItemView,
  PointMessage as PointMessageView,
} from '../../view/';

import PointPresenter from '../point/point';

import {
  formatDateISODdMmYyyyHhMm,
} from '../../utils/date';

import {
  RenderPosition,
  render,
  createRenderFragment,
  remove,
} from '../../utils/dom';

import {
  sortPointDurationDown,
  sortPointPriceDown,
} from '../../utils/sort';

import {
  PointMessage,
  SortType,
} from '../../const';

import {updateItem} from '../../utils/utils';


const {
  BEFORE_END,
} = RenderPosition;

const DEFAULT_SORT_TYPE = SortType.EVENT;

const reducePointByDay = (days, point) => {
  const dayDate = formatDateISODdMmYyyyHhMm(point.start)
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
  .sort((pointA, pointB) => pointA.start - pointB.start)
  .reduce(reducePointByDay, {});


export default class Trip {
  constructor(tripContainerElement) {
    this._tripContainerElement = tripContainerElement;
    this._points = [];
    this._destinations = [];
    this._sortView = new SortView(DEFAULT_SORT_TYPE);
    this._currentSortType = DEFAULT_SORT_TYPE;
    this._pointPresenter = {};
    this._daysView = null;
    this._dayViews = [];

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
    this._pointChangeHandler = this._pointChangeHandler.bind(this);
  }

  init(points, destinations) {
    this._points = points.slice();
    this._destinations = destinations;

    this._renderEvents();
  }

  _sortPoints(sortType) {
    this._currentSortType = sortType;

    switch (sortType) {
      case SortType.TIME:
        this._points.sort(sortPointDurationDown);
        break;
      case SortType.PRICE:
        this._points.sort(sortPointPriceDown);
        break;
      default:
        return;
    }
  }

  _sortChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearEvents();
    this._renderEvents();
  }

  _renderSort() {
    render(this._tripContainerElement, this._sortView, BEFORE_END);
    this._sortView.setChangeSortHandler(this._sortChangeHandler);
  }

  _createPointsItem(point) {
    const pointsItemView = new PointsItemView();
    const pointPresenter = new PointPresenter(pointsItemView, this._pointChangeHandler);
    pointPresenter.init(point, this._destinations);
    this._pointPresenter[point.id] = pointPresenter;

    return pointsItemView;
  }

  _createEventDays() {
    const days = groupPointsByDays(this._points);

    return Object.entries(days)
    .map(([date, points], counter) => {
      return this._createEventDay(points, date, counter);
    });
  }

  _createEventDay(points, date, counter) {
    const dayView = new DayView({
      dayCount: counter !== undefined ? counter + 1 : null,
      isCountRender: this._points.length > 1 && counter !== undefined,
      date: date !== undefined ? date : null,
    });

    const pointsListView = new PointsListView();
    const pointsItemsViews = points.map((point) => this._createPointsItem(point));

    render(
        pointsListView,
        createRenderFragment(pointsItemsViews),
        BEFORE_END
    );

    render(dayView, pointsListView, BEFORE_END);

    return dayView;
  }

  _renderEvents() {
    this._renderSort();
    this._daysView = this._daysView || new DaysView();
    this._dayViews = this._currentSortType === SortType.EVENT
      ? this._createEventDays()
      : [this._createEventDay(this._points)];

    render(
        this._daysView,
        createRenderFragment(this._dayViews),
        BEFORE_END
    );

    render(this._tripContainerElement, this._daysView, BEFORE_END);
  }

  _renderNoEvents() {
    const pointMessageNoEventsView = new PointMessageView(PointMessage.NO_EVENTS);
    render(this._tripContainerElement, pointMessageNoEventsView, BEFORE_END);
  }

  _renderTrip() {
    if (this._points.length > 0) {
      this._renderEvents();
      return;
    }

    if (this._daysView) {
      remove(this._daysView);
    }

    this._renderNoEvents();
  }

  _pointChangeHandler(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint, this._destinations);
  }

  _clearEvents() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    this._dayViews.forEach((dayView) => remove(dayView));
    this._dayViews = [];
  }
}
