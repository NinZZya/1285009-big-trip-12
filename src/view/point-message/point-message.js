import AbstractView from '../abstract';

const createPointMessageTemplate = (message) =>
  `<p class="trip-events__msg">
    ${message}
  </p>`;

export default class PointMessage extends AbstractView {
  constructor(message) {
    super();
    this._message = message;
  }

  getTemplate() {
    return createPointMessageTemplate(this._message);
  }
}
