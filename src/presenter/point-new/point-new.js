import {AbstractView, PointEditView} from '../../view';
import {UserAction, UpdateType} from '../../const';
import {isEscPressed} from '../../utils/utils';
import {
  remove,
  render,
  RenderPosition,
  getElement,
} from '../../utils/dom';

const {
  AFTER_BEGIN,
  AFTER_END,
} = RenderPosition;

export default class PointNew {
  constructor(tripContainer, changeData) {
    this._tripContainerElement = getElement(tripContainer);
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

  setSaving() {
    this._pointEditView.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    this._pointEditView.shakeForm();
  }

  _renderPointEdit(destinations, offers, callback) {
    this._destroyCallback = callback;

    this._pointEditView = new PointEditView({destinations, offers, isAddMode: true});
    this._pointEditView.setFormSubmitHandler(this._formSubmitHandler);
    this._pointEditView.setFormResetHandler(this._formRresetHandler);

    if (this._tripContainerElement instanceof AbstractView) {
      this._tripContainerElement = this._tripContainerElement.getElement();
    }

    const sortTripElement = this._tripContainerElement.querySelector(`.trip-sort`);

    if (sortTripElement) {
      render(sortTripElement, this._pointEditView, AFTER_END);
    } else {
      render(this._tripContainerElement, this._pointEditView, AFTER_BEGIN);
    }

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _formSubmitHandler(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MAJOR,
        point
    );
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
