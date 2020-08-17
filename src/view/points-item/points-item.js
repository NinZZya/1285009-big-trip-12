import AbstractView from '../abstract/abstract';

const createPointsItemTemplate = () => {
  return (
    `<li class="trip-events__item">
    </li>`
  );
};

class PointItemView extends AbstractView {
  getTemplate() {
    return createPointsItemTemplate();
  }
}

export default PointItemView;
