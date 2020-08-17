import AbstractView from '../abstract/abstract';

const createControlsTemplate = () => {
  return (
    `<div class="trip-main__trip-controls  trip-controls">
      <h2 id="trip-header-swich-view" class="visually-hidden">Switch trip view</h2>
      <h2 id="trip-filter-events" class="visually-hidden">Filter events</h2>
    </div>`
  );
};

class ControlsView extends AbstractView {
  getTemplate() {
    return createControlsTemplate();
  }
}

export default ControlsView;
