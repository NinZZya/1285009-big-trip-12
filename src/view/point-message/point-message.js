import AbstractView from '../abstract';

const createPointMessageTemplate = (message) =>
  `<p class="trip-events__msg">
    ${message}
  </p>`;

class PointMessageView extends AbstractView {
  constructor(message) {
    super();
    this._message = message;
  }

  getTemplate() {
    return createPointMessageTemplate(this._message);
  }
}

export default PointMessageView;
