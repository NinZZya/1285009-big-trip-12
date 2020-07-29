import {createEditEventHeaderTemplate} from './templates/edit-event-header';
import {createEditEventDetails} from './templates/edit-event-details';

const createTemplateEditEvent = (currentEvent) => {
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${createEditEventHeaderTemplate(currentEvent)}
      ${createEditEventDetails()}
  </form>`
  );
};

export {createTemplateEditEvent};
