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
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formResetHandler = this._formResetHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createPointEditorTemplate(this._point, this._destinations);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  _formResetHandler(evt) {
    evt.preventDefault();
    this._callback.formReset();
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback._rollupButtonClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFormResetHandler(callback) {
    this._callback.formReset = callback;
    this.getElement().addEventListener(`reset`, this._formResetHandler);
  }

  setRollupButtonClickHandler(callback) {
    this._callback._rollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupButtonClickHandler);
  }
}

export default PointEditorView;
