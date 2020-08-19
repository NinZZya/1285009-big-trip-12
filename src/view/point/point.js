import AbstractView from '../abstract';
import {createOfferTemplate} from './templates';
import {
  diffDate,
  formatDateISODdMmYyyyHhMm,
  convertNumberOfDate,
} from '../../utils/date';

const OFFERS_COUNT = 3;

const convertDurationValue = (duration) => {
  const {day, hour, minute} = duration;
  if (day > 0) {
    return `${convertNumberOfDate(day)}D ${convertNumberOfDate(hour)}H ${convertNumberOfDate(minute)}M`;
  }

  return `${hour > 0 ? `${convertNumberOfDate(hour)}H` : ``} ${convertNumberOfDate(minute)}M`;
};

const createPointTemplate = (point) => {
  const {
    type,
    start,
    end,
    price,
    offers,
  } = point;

  const duration = diffDate(end, start);
  const durationValue = convertDurationValue(duration);
  const formatedStartDate = formatDateISODdMmYyyyHhMm(start);
  const formatedEndDate = formatDateISODdMmYyyyHhMm(end);

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">Taxi to Amsterdam</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formatedStartDate}">${formatedStartDate.split(`T`)[1]}</time>
          &mdash;
          <time class="event__end-time" datetime="${formatedEndDate}">${formatedEndDate.split(`T`)[1]}</time>
        </p>
        <p class="event__duration">${durationValue}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.slice(0, OFFERS_COUNT).map(createOfferTemplate).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};

class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}

export default Point;
