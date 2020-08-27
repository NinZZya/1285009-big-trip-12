import {nanoid} from 'nanoid';
import {AbstractView, PointEditView} from '../../view';
import {remove, render, RenderPosition} from '../../utils/dom';
import {UserAction, UpdateType} from '../../const';
import {extend, isEscPressed} from '../../utils/utils';

const {
  AFTER_BEGIN,
  AFTER_END,
} = RenderPosition;

export default class PointNew {
  constructor(tripContainer, changeData) {
    this._tripContainer = tripContainer;
    this._changeData = changeData;

    this._pointEditView = null;
    this._destinations = null;
    this._destroyCallback = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formRresetHandler = this._formRresetHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(destinations, callback) {
    if (this._pointEditView !== null) {
      return;
    }

    this._renderPointEdit(destinations, callback);
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

  _renderPointEdit(destinations, callback) {
    this._destroyCallback = callback;
    this._destinations = destinations;

    this._pointEditView = new PointEditView({destinations: this._destinations, isAddMode: true});
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
        extend({id: nanoid()}, point)
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
