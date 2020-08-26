import {
  SortView,
  DaysView,
  DayView,
  PointsListView,
  PointsItemView,
  PointMessageView,
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
  UpdateType,
  UserAction,
} from '../../const';

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
  constructor(tripContainerElement, tripModel) {
    this._tripContainerElement = tripContainerElement;
    this._tripModel = tripModel;
    this._sortView = null;
    this._currentSortType = DEFAULT_SORT_TYPE;
    this._pointPresenter = {};
    this._daysView = null;
    this._dayViews = [];
    this._pointMessageNoEventsView = null;

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
    this._pointChangeHandler = this._pointChangeHandler.bind(this);
    this._changeModeHandler = this._changeModeHandler.bind(this);
    this._viewActionHandler = this._viewActionHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);

    this._tripModel.addObserver(this._modelEventHandler);
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._tripModel.getPoints().sort(sortPointDurationDown);
      case SortType.PRICE:
        return this._tripModel.getPoints().sort(sortPointPriceDown);
      default:
        return this._tripModel.getPoints();
    }
  }

  _getDestinations() {
    return this._tripModel.getDestinations();
  }

  _sortChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearEvents();
    this._renderTrip();
  }

  _renderSort() {
    this._sortView = new SortView(this._currentSortType);
    render(this._tripContainerElement, this._sortView, BEFORE_END);
    this._sortView.setChangeSortHandler(this._sortChangeHandler);
  }

  _createPointsItem(point) {
    const destinations = this._getDestinations();
    const pointsItemView = new PointsItemView();
    const pointPresenter = new PointPresenter(
        pointsItemView,
        this._pointChangeHandler,
        this._changeModeHandler,
        this._viewActionHandler
    );

    pointPresenter.init(point, destinations);
    this._pointPresenter[point.id] = pointPresenter;

    return pointsItemView;
  }

  _createEventDays(tripPoints) {
    const days = groupPointsByDays(tripPoints);

    return Object.entries(days)
    .map(([date, points], counter) => {
      return this._createEventDay(points, date, counter);
    });
  }

  _createEventDay(points, date, counter) {
    const dayView = new DayView({
      dayCount: counter !== undefined ? counter + 1 : null,
      isCountRender: counter !== undefined && this._getPoints().length > 1,
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

  _renderEvents(points) {
    this._renderSort();
    this._daysView = this._daysView || new DaysView();
    this._dayViews = this._currentSortType === SortType.EVENT
      ? this._createEventDays(points)
      : [this._createEventDay(points)];

    render(
        this._daysView,
        createRenderFragment(this._dayViews),
        BEFORE_END
    );

    render(this._tripContainerElement, this._daysView, BEFORE_END);
  }

  _renderNoEvents() {
    this._pointMessageNoEventsView = new PointMessageView(PointMessage.NO_EVENTS);
    render(this._tripContainerElement, this._pointMessageNoEventsView, BEFORE_END);
  }

  _renderTrip() {
    const points = this._getPoints();
    if (points.length > 0) {
      this._renderEvents(points);
      return;
    }

    if (this._daysView) {
      remove(this._daysView);
    }

    this._renderNoEvents();
  }

  _updateTrip({isResetSortType} = {isResetSortType: false}) {
    if (isResetSortType) {
      this._resetSortType();
    }

    this._clearEvents();
    this._renderTrip();
  }

  _pointChangeHandler(updatedPoint) {
    this._pointPresenter[updatedPoint.id].init(updatedPoint, this._getDestinations());
  }

  _clearEvents() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    this._dayViews.forEach((dayView) => remove(dayView));
    this._dayViews = [];
    remove(this._sortView);
    this._sortView = null;
  }

  _clearNoEventsMessage() {
    if (this._pointMessageNoEventsView) {
      remove(this._clearNoEventsMessage);
      this._pointMessageNoEventsView = null;
    }
  }

  _resetSortType() {
    this._currentSortType = DEFAULT_SORT_TYPE;
  }

  _changeModeHandler() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _viewActionHandler(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._tripModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._tripModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._tripModel.deletePoint(updateType, update);
        break;
    }
  }

  _modelEventHandler(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data, this._getDestinations());
        break;
      case UpdateType.MINOR:
        this._updateTrip();
        break;
      case UpdateType.MAJOR:
        this._updateTrip({isResetSortType: true});
        break;
    }
  }
}
