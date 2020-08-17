import AbstractView from '../abstract/abstract';
import {createOfferTemplate} from './templates';
import {
  diffDate,
  formatDateHhMm,
  formatDateYyyyMmDdWithDash,
  convertNumberOfDate,
} from '../../utils/date';

const OFFERS_COUNT = 3;

const convertDayTitle = (day) => day > 0
  ? `${convertNumberOfDate(day)}D`
  : ``;

const createPointTemplate = (point) => {
  const {
    type,
    start,
    end,
    price,
    offers,
  } = point;

  const duration = diffDate(end, start);
  const {day, hour, minute} = duration;
  const durationValue = `${convertDayTitle(day)} ${convertNumberOfDate(hour)}H ${convertNumberOfDate(minute)}M`;
  const dateStart = formatDateYyyyMmDdWithDash(start);
  const dateEnd = formatDateYyyyMmDdWithDash(end);
  const timeStart = formatDateHhMm(start);
  const timeEnd = formatDateHhMm(end);

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">Taxi to Amsterdam</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateStart}T${timeStart}">${timeStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateEnd}T${timeEnd}">${timeEnd}</time>
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

class PointView extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }
  getTemplate() {
    return createPointTemplate(this._point);
  }
}

export default PointView;
