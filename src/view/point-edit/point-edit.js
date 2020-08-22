import AbstractSmartView from '../abstract-smart';
import {createTripEventEditHeaderTemplate} from './header';
import {createDetailsTemplate} from './details';
/* eslint-disable-next-line */
import {createDestinationTemplate} from './destination';
import {
  extend,
} from '../../utils/utils';

const checkDestinationOnError = (destinations, destination) => !destinations.includes(destination);

const createPointEditTemplate = (data, destinations) => {
  return (
    `<form class="event  event--edit" action="#" method="post">
      ${createTripEventEditHeaderTemplate(data, destinations)}
      ${createDetailsTemplate(data)}
    </form>`
  );
};

export default class PointEdit extends AbstractSmartView {
  constructor(point, destinations) {
    super();
    this._data = PointEdit.parsePointToData(point, destinations);
    this._destinations = destinations;
    this._typeListElement = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formResetHandler = this._formResetHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  static parsePointToData(point, destinations) {
    const {destination} = point;

    return extend(
        point,
        {
          isDestinationError: checkDestinationOnError(destinations, destination),
        }
    );
  }

  static parseDataToPoint(data) {
    data = extend(data);

    delete data.isDestinationError;

    return data;
  }

  getTemplate() {
    return createPointEditTemplate(this._data, this._destinations);
  }

  reset(point) {
    this.updateData(
        PointEdit.parsePointToData(point, this._destinations)
    );
  }

  _getTypeList() {
    if (!this._typeListElement) {
      this._typeListElement = this.getElement().querySelector(`.event__type-list`);
    }

    return this._typeListElement;
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteClickHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    this.getElement().querySelector(`.event__type-list`).addEventListener(`click`, this._typeChangeHandler);
  }

  restoreHandlers() {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormResetHandler(this._callback.formReset);
    this.setRollupButtonClickHandler(this._callback._rollupButtonClick);

    this._setInnerHandlers();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  _formResetHandler(evt) {
    evt.preventDefault();
    this._callback.formReset();
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback._rollupButtonClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite,
    });
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    const typeId = evt.target.htmlFor;
    const type = this._getTypeList().querySelector(`#${typeId}`).value.toLowerCase();
    this.updateData({
      type,
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const destination = evt.target.value;
    this.updateData({
      destination,
      isDestinationError: checkDestinationOnError(this._destinations, destination),
    });
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFormResetHandler(callback) {
    this._callback.formReset = callback;
    this.getElement().addEventListener(`reset`, this._formResetHandler);
  }

  setRollupButtonClickHandler(callback) {
    this._callback._rollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupButtonClickHandler);
  }
}
