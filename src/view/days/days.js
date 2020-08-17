import AbstractView from '../abstract/abstract';

const createDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

class DaysView extends AbstractView {
  getTemplate() {
    return createDaysTemplate();
  }
}

export default DaysView;
