import AbstractSmartView from '../abstract-smart';
import {createHeaderTemplate} from './templates/create-header-template';
import {createDetailsTemplate} from './templates/create-details-template';
import flatpickr from 'flatpickr';
import '../../../node_modules/flatpickr/dist/flatpickr.min.css';
import {ACTVITIES} from '../../const';
import {extend} from '../../utils/utils';
import {addDaysToDate} from '../../utils/date';

const BLANK_DESTINATION = {
  name: ``,
  pictures: [],
  description: ``,
};

const getBlankPoint = () => {
  const start = new Date();
  const end = addDaysToDate(new Date());

  return {
    type: ACTVITIES[0].toLowerCase(),
    destination: BLANK_DESTINATION,
    start,
    end,
    duration: end - start,
    price: 0,
    offers: [],
    isFavorite: false,
  };
};

const isOfferInclude = (offers, currentOffer) => Boolean(offers.find((offer) => (
  offer.title === currentOffer.title && offer.price === currentOffer.price
)));

const convertToRenderedOffers = (offers, activeOffers) => offers.map((offer) => {

  return {
    title: offer.title,
    price: offer.price,
    isActivated: activeOffers.length > 0
      ? isOfferInclude(activeOffers, offer)
      : false,
  };
});

const convertFromRenderedOffers = (renderedOffers) => {
  const offers = [];

  renderedOffers.forEach((offer) => {
    if (offer.isActivated) {
      offers.push({
        title: offer.title,
        price: offer.price,
      });
    }
  });

  return offers;
};

const getDestination = (destinations, destinationName) => destinations.find(
    (destination) => destination.name === destinationName
);

const createPointEditTemplate = (pointData, destinations, isAddMode) => {

  return (
    `<form class="trip-events__item event  event--edit" action="#" method="post">
      ${createHeaderTemplate(pointData, destinations, isAddMode)}
      ${createDetailsTemplate(pointData)}
    </form>`
  );
};

export default class PointEdit extends AbstractSmartView {
  constructor({point = getBlankPoint(), destinations, offers, isAddMode = false}) {
    super();
    this._data = PointEdit.parsePointToData(point, destinations, offers);
    this._destinations = destinations;
    this._offers = offers;
    this._isAddMode = isAddMode;
    this._typeListElement = null;
    this._startDatePicker = null;
    this._endDatePicker = null;
    this.isStartDateUpdate = false;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formResetHandler = this._formResetHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._favoriteCheckboxClickHandler = this._favoriteCheckboxClickHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._typeListClickHandler = this._typeListClickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  static parsePointToData(point, destinations, offers) {
    const {destination, type} = point;
    const typeOffers = offers[type];

    const renderedOffers = typeOffers.length > 0
      ? convertToRenderedOffers(typeOffers, point.offers)
      : [];

    return extend(
        point,
        {
          renderedOffers,
          isDestinationError: !getDestination(destinations, destination.name),
        }
    );
  }

  static parseDataToPoint(pointData) {
    pointData = extend(
        pointData,
        {
          offers: convertFromRenderedOffers(pointData.renderedOffers),
        }
    );

    delete pointData.isDestinationError;
    delete pointData.renderedOffers;

    return pointData;
  }

  getTemplate() {
    return createPointEditTemplate(this._data, this._destinations, this._isAddMode);
  }

  reset(point) {
    this.updateData(
        PointEdit.parsePointToData(point, this._destinations, this._offers)
    );
  }

  removeElement() {
    super.removeElement();
    this._destroyPointDatePickers();
  }

  _getTypeList() {
    if (!this._typeListElement !== null) {
      this._typeListElement = this.getElement().querySelector(`.event__type-list`);
    }

    return this._typeListElement;
  }

  _setInnerHandlers() {
    const element = this.getElement();

    element.querySelector(`.event__input--price`).addEventListener(`change`, this._priceChangeHandler);
    element.querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    element.querySelector(`.event__type-list`).addEventListener(`click`, this._typeListClickHandler);
    this._setOffersChangeHandlers();
    this._setStartDateChangeHandler();
    this._setEndDateChangeHandler();
  }

  restoreHandlers() {
    if (!this._isAddMode) {
      this.setRollupButtonClickHandler(this._callback.rollupButtonClick);
      this.setFavoriteCheckboxClickHandler(this._callback.favoriteCheckboxClick);
    }

    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormResetHandler(this._callback.formReset);

    this._setInnerHandlers();
  }

  _destroyStartDatePicker() {
    if (this._startDatePicker !== null) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }
  }

  _destroyEndDatePicker() {
    if (this._endDatePicker !== null) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }
  }

  _destroyPointDatePickers() {
    this._destroyStartDatePicker();
    this._destroyEndDatePicker();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  _formResetHandler(evt) {
    evt.preventDefault();
    this._callback.formReset(PointEdit.parseDataToPoint(this._data));
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupButtonClick();
  }

  _favoriteCheckboxClickHandler(evt) {
    evt.preventDefault();

    this.updateData({
      isFavorite: !this._data.isFavorite,
    });

    this._callback.favoriteCheckboxClick(PointEdit.parseDataToPoint(this._data));
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: Number(evt.target.value),
    }, true);
  }

  _typeListClickHandler(evt) {
    evt.preventDefault();
    const typeId = evt.target.htmlFor;
    const type = this._getTypeList().querySelector(`#${typeId}`).value.toLowerCase();
    const typeOffers = this._offers[type];

    const renderedOffers = typeOffers.length > 0
      ? convertToRenderedOffers(typeOffers, [])
      : [];

    this.updateData({
      type,
      renderedOffers,
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();

    const destination = getDestination(this._destinations, evt.target.value);
    this.updateData({
      destination: !destination ? BLANK_DESTINATION : destination,
      isDestinationError: !destination,
    });
  }

  _offersChangeHandler(evt) {
    evt.preventDefault();
    const title = evt.target.dataset.title;
    const price = Number(evt.target.dataset.price);
    const renderedOffers = this._data.renderedOffers.map((offer) => {
      if (offer.isActivated) {
        return offer;
      }

      return {
        title: offer.title,
        price: offer.price,
        isActivated: offer.title === title && offer.price === price,
      };
    });

    this.updateData({
      renderedOffers,
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
      duration: end - start,
    }, true);

    this._endDatePicker.set(`minDate`, start);
  }

  _setStartDateChangeHandler() {
    this._destroyStartDatePicker();
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
      duration: end - start,
    }, true);

    this._startDatePicker.set(`maxDate`, end);
  }

  _setEndDateChangeHandler() {
    this._destroyEndDatePicker();
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

  setFavoriteCheckboxClickHandler(callback) {
    this._callback.favoriteCheckboxClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteCheckboxClickHandler);
  }
}
