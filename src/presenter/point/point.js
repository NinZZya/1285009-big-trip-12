import {
  Point as PointView,
  PointEdit as PointEditView,
} from '../../view';

import {
} from '../../utils/date';

import {
  RenderPosition,
  render,
  replace,
  remove,
} from '../../utils/dom';

import {
  isEscPressed,
} from '../../utils/utils';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

const {
  BEFORE_END,
} = RenderPosition;

export default class Point {
  constructor(pointContainerView, changePoint, changeMode) {
    this._pointContainerView = pointContainerView;
    this._changePoint = changePoint;
    this._changeMode = changeMode;
    this._destinations = null;
    this._pointView = null;
    this._pointEditView = null;
    this._point = null;
    this._mode = Mode.DEFAULT;

    this._rollupPointHandler = this._rollupPointHandler.bind(this);
    this._rollupPointEditHandler = this._rollupPointEditHandler.bind(this);
    this._submitPointEditHandler = this._submitPointEditHandler.bind(this);
    this._resetPointEditHandler = this._resetPointEditHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point, destinations) {
    this._point = point;
    this._destinations = destinations;

    const prevPointView = this._pointView;
    const prevPointEditView = this._pointEditView;

    this._pointView = new PointView(point);
    this._pointEditView = new PointEditView(point, this._destinations);

    this._pointView.setRollupButtonClickHandler(this._rollupPointHandler);
    this._pointEditView.setFormSubmitHandler(this._submitPointEditHandler);
    this._pointEditView.setFormResetHandler(this._resetPointEditHandler);
    this._pointEditView.setRollupButtonClickHandler(this._resetPointEditHandler);

    if (prevPointView === null || prevPointEditView === null) {
      render(this._pointContainerView, this._pointView, BEFORE_END);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointView, prevPointView);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditView, prevPointEditView);
    }

    remove(prevPointView);
    remove(prevPointEditView);
  }

  destroy() {
    remove(this._pointView);
    remove(this._pointEditView);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replacePointEditToPoint();
    }
  }

  _replacePointToPointEdit() {
    replace(this._pointEditView, this._pointView);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replacePointEditToPoint() {
    replace(this._pointView, this._pointEditView);
    this._mode = Mode.DEFAULT;
  }

  _rollupPointHandler() {
    this._replacePointToPointEdit();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _rollupPointEditHandler() {
    this._replacePointEditToPoint();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _submitPointEditHandler(point) {
    this._changePoint(point);
    this._rollupPointEditHandler();
  }

  _resetPointEditHandler() {
    this._pointEditView.reset(this._point);
    this._rollupPointEditHandler();
  }

  _escKeyDownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this._resetPointEditHandler();
    }
  }
}
