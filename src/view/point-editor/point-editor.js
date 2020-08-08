import {createTripEventEditorHeaderTemplate} from './header';
import {createDetailsTemplate} from './details';
/* eslint-disable-next-line */
import {createDestinationTemplate} from './destination';

import {DESTINATIONS} from '../../mock/points';

const createPointEditorTemplate = (point) => {

  return (
    `<form class="event  event--edit" action="#" method="post">
      ${createTripEventEditorHeaderTemplate(point, DESTINATIONS)}
      ${createDetailsTemplate(point)}
    </form>`
  );
};

export {createPointEditorTemplate};
