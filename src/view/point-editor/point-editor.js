import {createTripEventEditorHeaderTemplate} from './header';
import {createDetailsTemplate} from './details';
/* eslint-disable-next-line */
import {createDestinationTemplate} from './destination';

const createPointEditorTemplate = (point, destinations) => {

  return (
    `<form class="event  event--edit" action="#" method="post">
      ${createTripEventEditorHeaderTemplate(point, destinations)}
      ${createDetailsTemplate(point)}
    </form>`
  );
};

export {createPointEditorTemplate};
