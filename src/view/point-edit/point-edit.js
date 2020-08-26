import AbstractSmartView from '../abstract-smart';
import {createHeaderTemplate} from './templates/create-header-template';
import {createDetailsTemplate} from './templates/create-details-template';
/* eslint-disable-next-line */
import {createDestinationTemplate} from './templates/create-destination-template';
import flatpickr from 'flatpickr';
import '../../../node_modules/flatpickr/dist/flatpickr.min.css';
import {extend} from '../../utils/utils';
import {diffDate} from '../../utils/date';

const checkDestinationOnError = (destinations, destination) => !destinations.includes(destination);
const destroyPointDatePicker = (picker) => {
  if (picker) {
    picker.destroy();
    picker = null;
  }
};

const createPointEditTemplate = (data, destinations, isAddMode) => {
  return (
    `<form class="event  event--edit" action="#" method="post">
      ${createHeaderTemplate(data, destinations, isAddMode)}
      ${createDetailsTemplate(data)}
    </form>`
  );
};

export default class PointEdit extends AbstractSmartView {
  constructor(point, destinations, isAddMode = false) {
    super();
    this._data = PointEdit.parsePointToData(point, destinations);
    this._destinations = destinations;
    this._isAddMode = isAddMode;
    this._typeListElement = null;
    this._startDatePicker = null;
    this._endDatePicker = null;
    this.isStartDateUpdate = false;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formResetHandler = this._formResetHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._typeListClickHandler = this._typeListClickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

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
    delete data.isDatesError;

    return data;
  }

  getTemplate() {
    return createPointEditTemplate(this._data, this._destinations, this._isAddMode);
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
    const element = this.getElement();
    element.querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteClickHandler);
    element.querySelector(`.event__input--price`).addEventListener(`change`, this._priceChangeHandler);
    element.querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    element.querySelector(`.event__type-list`).addEventListener(`click`, this._typeListClickHandler);
    this._setOffersChangeHandlers();
    this._setStartDateChangeHandler();
    this._setEndDateChangeHandler();
  }

  restoreHandlers() {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormResetHandler(this._callback.formReset);
    this.setRollupButtonClickHandler(this._callback.rollupButtonClick);

    this._setInnerHandlers();
  }

  _destroyPointDatePicker() {
    destroyPointDatePicker(this._startDatePicker);
    destroyPointDatePicker(this._endDatePicker);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._destroyPointDatePicker();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  _formResetHandler(evt) {
    evt.preventDefault();
    this._destroyPointDatePicker();
    this._callback.formReset();
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._destroyPointDatePicker();
    this._callback.rollupButtonClick();
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

  _typeListClickHandler(evt) {
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

  _offersChangeHandler(evt) {
    evt.preventDefault();
    const offerKey = evt.target.value;
    const isActivated = evt.target.checked;
    const offers = this._data.offers.map((offer) => {
      if (offerKey === offer.key) {
        return extend(offer, {isActivated});
      }

      return offer;
    });

    this.updateData({
      offers,
    }, true);
  }

  _setOffersChangeHandlers() {
    const offerElements = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    offerElements.forEach((offerElement) => {
      offerElement.addEventListener(`change`, this._offersChangeHandler);
    });
  }

  _startDateChangeHandler([start]) {
    const end = this._data.end;

    this.isStartDateUpdate = start !== this._data.start;

    this.updateData({
      start,
      duration: diffDate(end, start),
    }, true);

    this._endDatePicker.set(`minDate`, start);
  }

  _setStartDateChangeHandler() {
    this._startDatePicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          'enableTime': true,
          'time_24hr': true,
          'dateFormat': `d/m/y H:i`,
          'defaultDate': this._data.start || new Date(),
          'maxDate': this._data.end,
          'onChange': this._startDateChangeHandler,
        }
    );
  }

  _endDateChangeHandler([end]) {
    const start = this._data.start;

    this.updateData({
      end,
      duration: diffDate(end, start),
    }, true);

    this._startDatePicker.set(`maxDate`, end);
  }

  _setEndDateChangeHandler() {
    this._endDatePicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          'enableTime': true,
          'time_24hr': true,
          'dateFormat': `d/m/y H:i`,
          'defaultDate': this._data.end || new Date(),
          'minDate': this._data.start,
          'onChange': this._endDateChangeHandler,
        }
    );
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
    this._callback.rollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupButtonClickHandler);
  }
}
