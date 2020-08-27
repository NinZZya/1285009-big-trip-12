import {InfoView} from '../../view';

import {
  render,
  RenderPosition,
  replace, remove,
} from '../../utils/dom';

import {
  formatDateMmmDd,
} from '../../utils/date';

import {FilterType} from '../../const';
import {filter} from '../../utils/filter';

const {
  AFTER_BEGIN,
} = RenderPosition;

const getPeriodTitle = (date) => formatDateMmmDd(date).toLocaleUpperCase();
const calcCoast = (points) => points.reduce((sum, point) => sum + point.price, 0);

const getRoute = (points) => {
  const count = points.length;
  if (count === 0) {
    return ``;
  }

  if (count <= 3) {
    return points.map((point) => point.destination).join(` — `);
  }

  return `${points[0].destination} — ... — ${points[count - 1].destination}`;
};

const getPeriod = (points) => {
  const count = points.length;
  return count > 0
    ? `${
      getPeriodTitle(points[0].start)
    } — ${
      getPeriodTitle(points[points.length - 1].end)
    }`
    : ``;
};

export default class Info {
  constructor(infoContainer, tripModel, filterModel) {
    this._infoContainer = infoContainer;
    this._tripModel = tripModel;
    this._filterModel = filterModel;

    this._infoView = null;
    this._currentFilter = null;

    this._modelEventHandler = this._modelEventHandler.bind(this);

    this._tripModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);
  }

  init() {
    const points = this._tripModel.getPoints();
    const filterType = this._filterModel.getFilter();
    const filteredPoints = filterType === FilterType.EVERYTHING
      ? points
      : filter[filterType](points);

    const coast = calcCoast(filteredPoints);
    const route = getRoute(filteredPoints);
    const period = getPeriod(filteredPoints);

    const prevFilterInfoView = this._infoView;


    this._infoView = new InfoView(route, period, coast);

    if (prevFilterInfoView === null) {
      render(this._infoContainer, this._infoView, AFTER_BEGIN);
      return;
    }

    replace(this._infoView, prevFilterInfoView);
    remove(prevFilterInfoView);
  }

  _modelEventHandler() {
    this.init();
  }
}
