import {
  EventType,
  events,
} from '../../../const';

/**
 * @param {string} value значение
 * @param {string} type тип
 * @return {boolean}
 */

const filterEventType = (value, type) => value === type;

/**
 * @param {string} groupKey ключ переменной EventType
 * @param {*} currentEvent текущее значение
 */

const createTypeGroupTemplate = (groupKey, currentEvent) => {
  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>
      ${events
        .filter((event) => filterEventType(event.type, EventType[groupKey]))
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
    </fieldset>`
  );
};

const createEditEventTypeListTemplate = (currentEvent) => {
  return (
    `<div class="event__type-wrapper">
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
        ${Object.keys(EventType).map((key) => createTypeGroupTemplate(key, currentEvent))}
      </div>
    </div>`
  );
};

export {createEditEventTypeListTemplate};
