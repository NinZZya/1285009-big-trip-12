import {createOfferTemplate} from './templates';
import {convertToHhMm, diffDate, getPrintValue} from '../../utils/date';

const printDateValue = (value, postfix) => {
  return `${value > 0 ? `${getPrintValue(value)}${postfix}` : ``}`;
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
  const {day, hour, minute} = duration;
  const printDuration = `${printDateValue(day, `D`)} ${printDateValue(hour, `H`)} ${getPrintValue(minute)}M`;

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">Taxi to Amsterdam</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${convertToHhMm(start)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${convertToHhMm(end)}</time>
        </p>
        <p class="event__duration">${printDuration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.slice(0, 3).map(createOfferTemplate).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};

export {createPointTemplate};
