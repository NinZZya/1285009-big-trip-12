import {createEditEventOffersTemplate} from './edit-event-offers';
import {createEditEventDestinationTemplate} from './edit-event-destination';

const createEditEventDetailsTemplate = () => {
  return (
    `<section class="event__details">
      ${createEditEventOffersTemplate()}
      ${createEditEventDestinationTemplate()}
    </section>`
  );
};

export {createEditEventDetailsTemplate};
