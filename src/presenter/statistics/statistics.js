import {StatisticsView} from '../../view';

import {
  render,
  RenderPosition,
  remove,
} from '../../utils/dom';

import {FilterType, TabItem} from '../../const';
import {filter} from '../../utils/filter';

const {
  BEFORE_END,
} = RenderPosition;

export default class Statistics {
  constructor(statisticsContainer, tripModel, filterModel, mode) {
    this._statisticsContainer = statisticsContainer;
    this._tripModel = tripModel;
    this._filterModel = filterModel;
    this._mode = mode;

    this._statisticsView = null;

    this._modelEventHandler = this._modelEventHandler.bind(this);
  }

  init() {
    this._tripModel.add(this._modelEventHandler);
    this._filterModel.add(this._modelEventHandler);

    if (this._mode === TabItem.STATS) {
      const points = this._tripModel.getPoints();
      const filterType = this._filterModel.get();

      const filteredPoints = filterType === FilterType.EVERYTHING
        ? points
        : filter[filterType](points);

      this._clear();
      this._statisticsView = new StatisticsView(filteredPoints);
      render(this._statisticsContainer, this._statisticsView, BEFORE_END);
    }
  }

  destroy() {
    this._clear();

    this._tripModel.remove(this._modelEventHandler);
    this._filterModel.remove(this._modelEventHandler);
  }

  changeMode(mode) {
    this._mode = mode;
  }

  _clear() {
    if (this._statisticsView !== null) {
      remove(this._statisticsView);
      this._statisticsView = null;
    }
  }

  _modelEventHandler() {
    this.init();
  }
}
