import AbstractView from '../abstract';

const createPointsItemTemplate = () => {
  return (
    `<li class="trip-events__item">
    </li>`
  );
};

class PointsItemView extends AbstractView {
  getTemplate() {
    return createPointsItemTemplate();
  }
}

export default PointsItemView;
