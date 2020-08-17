import AbstractView from '../abstract/abstract';
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

class PointEditorView extends AbstractView {
  constructor(point, destinations) {
    super();
    this._point = point;
    this._destinations = destinations;
  }

  getTemplate() {
    return createPointEditorTemplate(this._point, this._destinations);
  }
}

export default PointEditorView;
