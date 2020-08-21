import {
  Sort as SortView,
  Days as DaysView,
  Day as DayView,
  PointsList as PointsListView,
  PointsItem as PointsItemView,
  Point as PointView,
  PointEdit as PointEditView,
  PointMessage as PointMessageView,
} from '../../view/';

import {
  formatDateISODdMmYyyyHhMm,
} from '../../utils/date';

import {
  RenderPosition,
  render,
  replace,
  createRenderFragment,
} from '../../utils/dom';

import {
  isEscPressed,
} from '../../utils/utils';

import {
  sortPointDurationDown,
  sortPointPriceDown,
} from '../../utils/sort';

import {
  PointMessage,
  SortType,
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
  .sort((less, more) => less.start - more.start)
  .reduce(reducePointByDay, {});


export default class Trip {
  constructor(tripContainerElement) {
    this._tripContainerElement = tripContainerElement;
    this._points = [];
    this._destinations = [];
    this._sortView = new SortView(DEFAULT_SORT_TYPE);
    this._currentSortType = DEFAULT_SORT_TYPE;
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
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

  _createPointsItems(point) {
    const pointsItemView = new PointsItemView();
    const pointView = new PointView(point);
    const pointEditView = new PointEditView(point, this._destinations);

    const replacePointToPointEdit = () => {
      replace(pointEditView, pointView);
    };

    const replacePointEditToPoint = () => {
      replace(pointView, pointEditView);
    };

    const rollupPointEdit = () => {
      replacePointEditToPoint();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    };

    const escKeyDownHandler = (evt) => {
      if (isEscPressed(evt)) {
        evt.preventDefault();
        rollupPointEdit();
      }
    };

    pointView.setRollupButtonClickHandler(() => {
      replacePointToPointEdit();
      document.addEventListener(`keydown`, escKeyDownHandler);
    });

    pointEditView.setFormSubmitHandler(() => {
      rollupPointEdit();
    });

    pointEditView.setFormResetHandler(() => {
      rollupPointEdit();
    });

    pointEditView.setRollupButtonClickHandler(() => {
      rollupPointEdit();
    });

    render(pointsItemView, pointView, BEFORE_END);
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
    const pointsItemsViews = points.map((point) => this._createPointsItems(point));

    render(
        pointsListView,
        createRenderFragment(pointsItemsViews),
        BEFORE_END
    );

    render(dayView, pointsListView, BEFORE_END);

    return dayView;
  }

  _renderEvents() {
    const daysView = new DaysView();
    const dayViews = this._currentSortType === SortType.EVENT
      ? this._createEventDays()
      : this._createEventDay(this._points);

    render(
        daysView,
        createRenderFragment(dayViews),
        BEFORE_END
    );

    this._renderSort();
    render(this._tripContainerElement, daysView, BEFORE_END);
  }

  _renderNoEvents() {
    const pointMessageNoEventsView = new PointMessageView(PointMessage.NO_EVENTS);
    render(this._tripContainerElement, pointMessageNoEventsView, BEFORE_END);
  }

  _renderTrip() {
    if (this._points.length > 0) {
      this._renderEvents();
    } else {
      this._renderNoEvents();
    }
  }

  _clearEvents() {
    this._tripContainerElement.innerHTML = ``;
  }
}
