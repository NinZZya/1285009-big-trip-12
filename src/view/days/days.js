import AbstractView from '../abstract';

const createDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

class Days extends AbstractView {
  getTemplate() {
    return createDaysTemplate();
  }
}

export default Days;
