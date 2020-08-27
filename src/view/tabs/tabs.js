import AbstractView from '../abstract';
import {TabItem} from '../../const';

const TABS = Object.values(TabItem);

const createTabsTemplate = (ativeTab) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${TABS
        .map((tab) => (
          `<a
            class="trip-tabs__btn ${tab === ativeTab ? `trip-tabs__btn--active` : ``}"
            href="#"
          >
            ${tab}
          </a>`
        ))
        .join(``)}
    </nav>`
  );
};

export default class Tabs extends AbstractView {
  constructor(ativeTab) {
    super();
    this._ativeTab = ativeTab;
  }

  getTemplate() {
    return createTabsTemplate(this._ativeTab);
  }
}
