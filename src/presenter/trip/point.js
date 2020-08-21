import {
  Point as PointView,
  PointEdit as PointEditView,
} from '../../view/';

import {
} from '../../utils/date';

import {
  RenderPosition,
  render,
  replace,
} from '../../utils/dom';

import {
  isEscPressed,
} from '../../utils/utils';

const {
  BEFORE_END,
} = RenderPosition;

export default class Point {
  constructor(pointContainerElement) {
    this._pointContainerElement = pointContainerElement;
    this._destinations = null;
    this._pointView = null;
    this._pointEditView = null;
    this._point = null;
    this._rollupPointHandler = this._rollupPointHandler.bind(this);
    this._rollupPointEditHandler = this._rollupPointEditHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point, destinations) {
    this._point = point;
    this._destinations = destinations;

    this._pointView = new PointView(point);
    this._pointEditView = new PointEditView(point, this._destinations);

    this._pointView.setRollupButtonClickHandler(this._rollupPointHandler);
    this._pointEditView.setFormSubmitHandler(this._rollupPointEditHandler);
    this._pointEditView.setFormResetHandler(this._rollupPointEditHandler);
    this._pointEditView.setRollupButtonClickHandler(this._rollupPointEditHandler);

    render(this._pointContainerElement, this._pointView, BEFORE_END);
  }

  _replacePointToPointEdit() {
    replace(this._pointEditView, this._pointView);
  }

  _replacePointEditToPoint() {
    replace(this._pointView, this._pointEditView);
  }

  _rollupPointHandler() {
    this._replacePointToPointEdit();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _rollupPointEditHandler() {
    this._replacePointEditToPoint();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this._rollupPointEditHandler();
    }
  }
}
