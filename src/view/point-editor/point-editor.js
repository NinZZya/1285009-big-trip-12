import {createTripEventEditorHeaderTemplate} from './header';
import {createDetailsTemplate} from './details';
/* eslint-disable-next-line */
import {createDestinationTemplate} from './destination';

import {
  DEFAULT_TYPE,
  DESTINATIONS,
  OFFERS,
} from '../../data';

const createPointEditorTemplate = () => {
  return (
    `<form class="event  event--edit" action="#" method="post">
      ${createTripEventEditorHeaderTemplate(DEFAULT_TYPE, DESTINATIONS)}
      ${createDetailsTemplate(OFFERS)}
    </form>`
  );
};

export {createPointEditorTemplate};
