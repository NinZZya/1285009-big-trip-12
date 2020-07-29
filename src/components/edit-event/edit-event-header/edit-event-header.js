import {createEditEventTypeListTemplate} from './edit-event-type-list';
import {createEditEventDestinationTemplate} from './edit-event-destination';
import {createEditEventTimeTemplate} from './edit-event-time';
import {createEditEventPriceTemplate} from './edit-event-price';

const createEditEventHeaderTemplate = (currentEvent) => {
  return (
    `<header class="event__header">
      ${createEditEventTypeListTemplate(currentEvent)}
      ${createEditEventDestinationTemplate(currentEvent)}
      ${createEditEventTimeTemplate()}
      ${createEditEventPriceTemplate()}
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
