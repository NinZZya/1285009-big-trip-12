import AbstractView from '../abstract';

const createPointsItemTemplate = () => {
  return (
    `<li class="trip-events__item">
    </li>`
  );
};

class PointsItem extends AbstractView {
  getTemplate() {
    return createPointsItemTemplate();
  }
}

export default PointsItem;
