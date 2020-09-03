import AbstractView from '../abstract';

const createNewPointButtonTemplate = () => {
  return (
    `<button
      class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button"
    >
      New event
    </button>`
  );
};

export default class NewPointButton extends AbstractView {
  constructor() {
    super();
    this._newPointButtonClickHandler = this._newPointButtonClickHandler.bind(this);
  }
  getTemplate() {
    return createNewPointButtonTemplate();
  }

  disable() {
    this.getElement().disabled = true;
  }

  enable() {
    this.getElement().disabled = false;
  }

  setClickHandler(callback) {
    this._callback.newPointButtonClick = callback;
    this.getElement().addEventListener(`click`, this._newPointButtonClickHandler);
  }

  _newPointButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.newPointButtonClick();
  }
}
