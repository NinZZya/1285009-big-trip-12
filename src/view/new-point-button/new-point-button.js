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

  disabled(isDisabled) {
    this.getElement().disabled = isDisabled;
  }

  _newPointButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.newPointButtonClick();
  }

  setNewPointButtonClickHandler(callback) {
    this._callback.newPointButtonClick = callback;
    this.getElement().addEventListener(`click`, this._newPointButtonClickHandler);
  }
}
