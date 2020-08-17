import AbstractView from '../abstract/abstract';

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

class NewPointButtonView extends AbstractView {
  getTemplate() {
    return createNewPointButtonTemplate();
  }
}

export default NewPointButtonView;
