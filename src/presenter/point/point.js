import {
  PointView,
  PointEditView,
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

import {
  UpdateType,
  UserAction,
} from '../../const';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

const {
  BEFORE_END,
} = RenderPosition;

export default class Point {
  constructor(pointContainerView, changePoint, changeMode, changeData) {
    this._pointContainerView = pointContainerView;
    this._changePoint = changePoint;
    this._changeMode = changeMode;
    this._changeData = changeData;
    this._destinations = null;
    this._pointView = null;
    this._pointEditView = null;
    this._point = null;
    this._mode = Mode.DEFAULT;
    this._isShouldUpdateTrip = null;

    this._rollupPointHandler = this._rollupPointHandler.bind(this);
    this._rollupPointEditHandler = this._rollupPointEditHandler.bind(this);
    this._submitPointEditHandler = this._submitPointEditHandler.bind(this);
    this._deletePointEditHandler = this._deletePointEditHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point, destinations, offers) {
    this._point = point;
    this._destinations = destinations;
    this._offers = offers;

    const prevPointView = this._pointView;
    const prevPointEditView = this._pointEditView;

    this._pointView = new PointView(point);

    this._pointEditView = new PointEditView({
      point,
      destinations: this._destinations,
      offers: this._offers,
    });

    this._pointView.setRollupButtonClickHandler(this._rollupPointHandler);
    this._pointEditView.setFormSubmitHandler(this._submitPointEditHandler);
    this._pointEditView.setFormResetHandler(this._deletePointEditHandler);
    this._pointEditView.setRollupButtonClickHandler(this._rollupPointEditHandler);
    this._pointEditView.setFavoriteClickHandler(this._favoriteClickHandler);

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

  _rollupPointEdit() {
    this._replacePointEditToPoint();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _rollupPointHandler() {
    this._replacePointToPointEdit();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _rollupPointEditHandler() {
    this._pointEditView.reset(this._point);
    this._rollupPointEdit();
  }

  _submitPointEditHandler(point) {
    const updateType = this._pointEditView.isStartDateUpdate
      ? UpdateType.MINOR
      : UpdateType.PATCH;

    this._changeData(
        UserAction.UPDATE_POINT,
        updateType,
        point
    );

    this._rollupPointEdit();
  }

  _favoriteClickHandler(point) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        point
    );
  }

  // Use as delede in view
  _deletePointEditHandler(point) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MAJOR,
        point
    );

    this._rollupPointEdit();
  }

  _escKeyDownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this._resetPointEdit();
    }
  }
}
