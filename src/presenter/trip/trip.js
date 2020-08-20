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

import {PointMessage} from '../../const';


const {
  BEFORE_END,
} = RenderPosition;

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
    this._sortView = new SortView();
  }

  init(points, destinations) {
    this._points = points;
    this._destinations = destinations;

    this._renderEvents();
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

  _renderSort() {
    render(this._tripContainerElement, this._sortView, BEFORE_END);
  }

  _renderEvents() {
    const daysView = new DaysView();
    const days = groupPointsByDays(this._points);

    const dayViews = Object.entries(days)
    .map(([date, points], counter) => {
      const dayView = new DayView(
          {
            dayCount: counter + 1,
            isCountRender: this._points.length > 1,
            date,
          }
      );

      const pointsListView = new PointsListView();
      const pointsItemsViews = points.map((point) => this._createPointsItems(point));

      render(
          pointsListView,
          createRenderFragment(pointsItemsViews),
          BEFORE_END
      );

      render(dayView, pointsListView, BEFORE_END);

      return dayView;
    });

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
}
