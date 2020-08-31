import {AbstractView, PointEditView} from '../../view';
import {remove, render, RenderPosition} from '../../utils/dom';
import {UserAction, UpdateType} from '../../const';
import {isEscPressed} from '../../utils/utils';

const {
  AFTER_BEGIN,
  AFTER_END,
} = RenderPosition;

export default class PointNew {
  constructor(tripContainer, changeData) {
    this._tripContainer = tripContainer;
    this._changeData = changeData;

    this._pointEditView = null;
    this._destroyCallback = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formRresetHandler = this._formRresetHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(destinations, offers, callback) {
    if (this._pointEditView !== null) {
      return;
    }

    this._renderPointEdit(destinations, offers, callback);
  }

  destroy() {
    if (this._pointEditView === null) {
      return;
    }

    remove(this._pointEditView);
    this._pointEditView = null;
    this._destroyCallback();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _renderPointEdit(destinations, offers, callback) {
    this._destroyCallback = callback;

    this._pointEditView = new PointEditView({destinations, offers, isAddMode: true});
    this._pointEditView.setFormSubmitHandler(this._formSubmitHandler);
    this._pointEditView.setFormResetHandler(this._formRresetHandler);

    if (this._tripContainer instanceof AbstractView) {
      this._tripContainer = this._tripContainer.getElement();
    }

    const sortTripElement = this._tripContainer.querySelector(`.trip-sort`);

    if (sortTripElement) {
      render(sortTripElement, this._pointEditView, AFTER_END);
    } else {
      render(this._tripContainer, this._pointEditView, AFTER_BEGIN);
    }

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _formSubmitHandler(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MAJOR,
        point
    );
    this.destroy();
  }

  _formRresetHandler() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
