import AbstractView from '../abstract';

const createPointsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

class PointsListView extends AbstractView {
  getTemplate() {
    return createPointsListTemplate();
  }
}

export default PointsListView;
