import {FiltersView} from '../../view/';

import {
  render,
  RenderPosition,
  replace, remove,
} from '../../utils/dom';

import {UpdateType} from '../../const';

const {
  BEFORE_END,
} = RenderPosition;

export default class Filter {
  constructor(filterContainer, tripModel, filterModel) {
    this._filterContainer = filterContainer;
    this._tripModel = tripModel;
    this._filterModel = filterModel;
    this._currentFilter = null;

    this._filterView = null;

    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._tripModel.addObserver(this._modelEventHandler);
    this._filterModel.addObserver(this._modelEventHandler);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const prevFilterView = this._filterView;

    this._filterView = new FiltersView(this._currentFilter);
    this._filterView.setFilterTypeChangeHandler(this._filterTypeChangeHandler);

    if (prevFilterView === null) {
      render(this._filterContainer, this._filterView, BEFORE_END);
      return;
    }

    replace(this._filterView, prevFilterView);
    remove(prevFilterView);
  }

  _modelEventHandler() {
    this.init();
  }

  _filterTypeChangeHandler(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
