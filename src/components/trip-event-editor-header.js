import {
  eventGroupToTypes,
  eventTypePreposition,
} from '../const';

const groupTypes = Object.entries(eventGroupToTypes);
const prepositions = Object.keys(eventTypePreposition);

const getEventTypeWithPreposition = (currentType) => {
  const preposition = prepositions
    .find((key) => eventTypePreposition[key].includes(currentType));

  return preposition ? `${currentType} ${preposition}` : ``;
};

const FAVORITE_ICON = (
  `<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z">
      </path>
  </svg>`
);

const createTypeGroupTemplate = (groupName, types, currentType) => {
  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">${groupName}</legend>
      ${types
        .map((type, i) => {
          const id = type.toLowerCase();

          return (
            `<div class="event__type-item">
            <input
              id="event-type-${id}-${i}"
              class="event__type-input  visually-hidden"
              type="radio"
              name="event-type"
              value="${type}"
              ${id === currentType ? `checked` : ``}
            >
            <label
              class="event__type-label event__type-label--${id}"
              for="event-type-${id}-${i}"
            >
              ${type}
            </label>
          </div>`
          );
        })
        .join(``)}
    </fieldset>`
  );
};

const createTripEventEditorTypeListTemplate = (currentType) => {
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
        ${groupTypes
          .map(([groupName, types]) => createTypeGroupTemplate(groupName, types, currentType))
          .join(``)}
      </div>
    </div>`
  );
};

const createTripEventEditorDestinationTemplate = (currentType, destinations) => {
  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${getEventTypeWithPreposition(currentType)}
      </label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1" type="text" name="event-destination"
        value="Geneva"
        list="destination-list-1"
      >
      <datalist id="destination-list-1">
        ${destinations
          .map((destination) => `<option value="${destination}"></option>`)
          .join(``)}
      </datalist>
    </div>`
  );
};

const createTripEventEditorTimeTemplate = () => {
  return (
    `<div class="event__field-group  event__field-group--time">
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
    </div>`
  );
};

const createTripEventEditorPriceTemplate = () => {
  return (
    `<div class="event__field-group  event__field-group--price">
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
    </div>`
  );
};

const createFavoriteEventTemplate = () => {
  return (
    `<input
      id="event-favorite-1"
      class="event__favorite-checkbox  visually-hidden"
      type="checkbox" name="event-favorite"
    >
      <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      ${FAVORITE_ICON}
    </label>`
  );
};

const createEventRollupBtnTemplate = () => {
  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">
      Open event
      </span>
    </button>`
  );
};

const createTripEventEditorHeaderTemplate = (currentType, destinations) => {
  return (
    `<header class="event__header">
      ${createTripEventEditorTypeListTemplate(currentType)}
      ${createTripEventEditorDestinationTemplate(currentType, destinations)}
      ${createTripEventEditorTimeTemplate()}
      ${createTripEventEditorPriceTemplate()}
      <button class="event__save-btn  btn  btn--blue" type="submit">
        Save
      </button>
      <button class="event__reset-btn" type="reset">
        Cancel
      </button>
      ${createFavoriteEventTemplate()}
      ${createEventRollupBtnTemplate()}
    </header>`
  );
};

export {createTripEventEditorHeaderTemplate};