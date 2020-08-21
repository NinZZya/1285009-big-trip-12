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
  extend,
} from '../../utils/utils';

const {
  BEFORE_END,
} = RenderPosition;

export default class Point {
  constructor(pointContainerView, changePoint) {
    this._pointContainerView = pointContainerView;
    this._changePoint = changePoint;
    this._destinations = null;
    this._pointView = null;
    this._pointEditView = null;
    this._point = null;
    this._rollupPointHandler = this._rollupPointHandler.bind(this);
    this._rollupPointEditHandler = this._rollupPointEditHandler.bind(this);
    this._submitPointEsitHandler = this._submitPointEsitHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  init(point, destinations) {
    this._point = point;
    this._destinations = destinations;

    const prevPointView = this._pointView;
    const prevPointEditView = this._pointEditView;

    this._pointView = new PointView(point);
    this._pointEditView = new PointEditView(point, this._destinations);

    this._pointView.setRollupButtonClickHandler(this._rollupPointHandler);
    this._pointEditView.setFormSubmitHandler(this._rollupPointEditHandler);
    this._pointEditView.setFormResetHandler(this._rollupPointEditHandler);
    this._pointEditView.setRollupButtonClickHandler(this._rollupPointEditHandler);
    this._pointEditView.setFavoriteClickHandler(this._favoriteClickHandler);

    if (prevPointView === null || prevPointEditView === null) {
      render(this._pointContainerView, this._pointView, BEFORE_END);
      return;
    }

    if (this._pointContainerView.getElement().contains(prevPointView.getElement())) {
      replace(this._pointView, prevPointView);
    }

    if (this._pointContainerView.getElement().contains(prevPointEditView.getElement())) {
      replace(this._pointEditView, prevPointEditView);
    }

    remove(prevPointView);
    remove(prevPointEditView);
  }

  destroy() {
    remove(this._pointView);
    remove(this._pointEditView);
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

  _submitPointEsitHandler(point) {
    this._changePoint(point);
    this._rollupPointEditHandler();
  }

  _escKeyDownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this._rollupPointEditHandler();
    }
  }

  _favoriteClickHandler() {
    this._changePoint(
        extend(
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }
}
