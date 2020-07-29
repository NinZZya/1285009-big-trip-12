import {getByKey} from '../../../utils/utils';
import {
  EventType,
  events,
  destinations,
} from '../../../const';

/**
 *
 * @param {string} value
 * @param {string} type
 */

const filterEventType = (value, type) => value === type;

const createEditEventHeaderTemplate = (currentEvent) => {
  return (
    `<header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img
            class="event__type-icon"
            width="17"
            height="17"
            src="img/icons/flight.png"
            alt="Event type icon"
          >
        </label>
        <input
          class="event__type-toggle
          visually-hidden"
          id="event-type-toggle-1"
          type="checkbox"
        >

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${events
              .filter((event) => filterEventType(event.type, EventType.TRANSFER))
              .map((event) => {
                const {key, value} = event;

                return (
                  `<div class="event__type-item">
                  <input
                    id="event-type-${key}-1"
                    class="event__type-input  visually-hidden"
                    type="radio"
                    name="event-type"
                    value="${key}"
                    ${key === currentEvent ? `checked` : ``}
                  >
                  <label
                    class="event__type-label event__type-label--${key}"
                    for="event-type-${key}-1"
                  >
                    ${value}
                  </label>
                </div>`
                );
              })
              .join(`\n`)}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${events
              .filter((event) => filterEventType(event.type, EventType.ACTIVITY))
              .map((event) => {
                const {key, value} = event;

                return (
                  `<div class="event__type-item">
                  <input
                    id="event-type-${key}-1"
                    class="event__type-input  visually-hidden"
                    type="radio"
                    name="event-type"
                    value="${key}"
                    ${key === currentEvent ? `checked` : ``}
                  >
                  <label
                    class="event__type-label event__type-label--${key}"
                    for="event-type-${key}-1"
                  >
                    ${value}
                  </label>
                </div>`
                );
              })
              .join(`\n`)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${getByKey(events, currentEvent).name} to
        </label>
        <input
          class="event__input  event__input--destination"
          id="event-destination-1" type="text" name="event-destination"
          value="Geneva"
          list="destination-list-1"
        >
        <datalist id="destination-list-1">
          ${destinations
            .map((destination) => `<option value="${destination}"></option>`)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input
          class="event__input  event__input--time"
          id="event-start-time-1"
          type="text"
          name="event-start-time"
          value="18/03/19 00:00"
        >
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input
          class="event__input  event__input--time"
          id="event-end-time-1"
          type="text" name="event-end-time"
          value="18/03/19 00:00"
        >
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input
          class="event__input  event__input--price"
          id="event-price-1"
          type="text"
          name="event-price"
          value=""
        >
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">
        Save
      </button>
      <button class="event__reset-btn" type="reset">
        Cancel
      </button>
    </header>`
  );
};

export {createEditEventHeaderTemplate};
