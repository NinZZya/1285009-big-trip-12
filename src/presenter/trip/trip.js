import {
  SortView,
  DaysView,
  DayView,
  PointsListView,
  PointsItemView,
  PointMessageView,
} from '../../view/';

import PointPresenter from '../point/point';
import PointNewPresenter from '../point-new/point-new';

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
  FilterType,
  PointMessage,
  SortType,
  UpdateType,
  UserAction,
} from '../../const';

import {filter} from '../../utils/filter';

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
  constructor(tripContainer, tripModel, filterModel) {
    this._tripContainer = tripContainer;
    this._tripModel = tripModel;
    this._filterModel = filterModel;
    this._isLoading = true;
    this._currentSortType = DEFAULT_SORT_TYPE;
    this._pointPresenter = {};

    this._sortView = null;
    this._daysView = null;
    this._dayViews = [];
    this._pointMessageNoEventsView = null;
    this._pointMessageLoadingView = null;
    this._pointMessageErrorView = null;

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
    this._pointChangeHandler = this._pointChangeHandler.bind(this);
    this._changeModeHandler = this._changeModeHandler.bind(this);
    this._viewActionHandler = this._viewActionHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._tripContainer, this._viewActionHandler);
  }

  init() {
    this._tripModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({isResetSortType: true});

    this._tripModel.removeObserver(this._modelEventHandler);
    this._filterModel.removeObserver(this._modelEventHandler);
  }

  createPoint(callback) {
    this._currentSortType = SortType.EVENT;
    this._filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    const destinations = this._tripModel.getDestinations();
    this._pointNewPresenter.init(destinations, callback);
  }

  _getPoints() {
    const points = this._tripModel.getPoints();
    const filterType = this._filterModel.getFilter();
    const filteredPoints = filterType === FilterType.EVERYTHING
      ? points
      : filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointDurationDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPriceDown);
      default:
        return filteredPoints;
    }
  }

  _getDestinations() {
    return this._tripModel.getDestinations();
  }

  _getOffers() {
    return this._tripModel.getOffers();
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
    render(this._tripContainer, this._sortView, BEFORE_END);
    this._sortView.setChangeSortHandler(this._sortChangeHandler);
  }

  _createPointsItem(point) {
    const destinations = this._getDestinations();
    const offers = this._getOffers();

    const pointsItemView = new PointsItemView();
    const pointPresenter = new PointPresenter(
        pointsItemView,
        this._pointChangeHandler,
        this._changeModeHandler,
        this._viewActionHandler
    );

    pointPresenter.init(point, destinations, offers);
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

    render(this._tripContainer, this._daysView, BEFORE_END);
  }

  _renderNoEvents() {
    this._pointMessageNoEventsView = new PointMessageView(PointMessage.NO_EVENTS);
    render(this._tripContainer, this._pointMessageNoEventsView, BEFORE_END);
  }

  _renderLoading() {
    this._pointMessageLoadingView = new PointMessageView(PointMessage.LOADING);
    render(this._tripContainer, this._pointMessageLoadingView, BEFORE_END);
  }

  _renderError() {
    this._pointMessageErrorView = new PointMessageView(PointMessage.ERROR);
    render(this._tripContainer, this._pointMessageErrorView, BEFORE_END);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
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

  _clearTrip({isResetSortType} = {isResetSortType: false}) {
    if (isResetSortType) {
      this._resetSortType();
    }

    this._pointNewPresenter.destroy();
    this._clearNoEvents();
    this._clearEvents();
  }

  _updateTrip({isResetSortType} = {isResetSortType: false}) {
    this._clearTrip({isResetSortType});
    this._renderTrip();
  }

  _pointUpdate(updatedPoint) {
    const destinations = this._getDestinations();
    const offers = this._getOffers();

    this._pointPresenter[updatedPoint.id].init(updatedPoint, destinations, offers);
  }

  _pointChangeHandler(updatedPoint) {
    this._pointUpdate(updatedPoint);
  }

  _clearSort() {
    if (this._sortView) {
      remove(this._sortView);
      this._sortView = null;
    }
  }

  _clearEvents() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    this._dayViews.forEach((dayView) => remove(dayView));
    this._dayViews = [];
    this._clearSort();
  }

  _clearNoEvents() {
    if (this._pointMessageNoEventsView) {
      remove(this._pointMessageNoEventsView);
      this._pointMessageNoEventsView = null;
    }
  }

  _clearLoading() {
    if (this._pointMessageLoadingView) {
      remove(this._pointMessageLoadingView);
      this._pointMessageLoadingView = null;
    }
  }

  _clearError() {
    if (this._pointMessageErrorView) {
      remove(this._pointMessageErrorView);
      this._pointMessageErrorView = null;
    }
  }

  _resetSortType() {
    this._currentSortType = DEFAULT_SORT_TYPE;
  }

  _changeModeHandler() {
    this._pointNewPresenter.destroy();

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
        this._pointUpdate(data);
        break;
      case UpdateType.MINOR:
        this._updateTrip();
        break;
      case UpdateType.MAJOR:
        this._updateTrip({isResetSortType: true});
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this._clearLoading();
        this._renderTrip();
        break;
      case UpdateType.ERROR:
        this._clearLoading();
        this._renderError();
        break;
    }
  }
}
