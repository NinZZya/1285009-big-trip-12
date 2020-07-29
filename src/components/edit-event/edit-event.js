import {createEditEventHeaderTemplate} from './edit-event-header/edit-event-header';
import {createEditEventDetailsTemplate} from './edit-event-detail/edit-event-details';

const createEditEventTemplate = (currentEvent) => {
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createEditEventHeaderTemplate(currentEvent)}
      ${createEditEventDetailsTemplate()}
  </form>`
  );
};

export {createEditEventTemplate};
