import {getByKey} from '../../../utils/utils';
import {
  events,
  destinations,
} from '../../../const';

const KEY_NAME = `key`;

const createEditEventDestinationTemplate = (currentEvent) => {
  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${getByKey(events, KEY_NAME, currentEvent).name} to
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
    </div>`
  );
};

export {createEditEventDestinationTemplate};
