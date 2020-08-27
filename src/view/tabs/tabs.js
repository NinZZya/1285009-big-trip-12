import AbstractView from '../abstract';
import {TabItem} from '../../const';

const TABS = Object.values(TabItem);
const ACTIVE_TAB_CLASS = `trip-tabs__btn--active`;

const createTabsTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${TABS
        .map((tab) => (
          `<a
            class="trip-tabs__btn ${tab === TabItem.TABLE ? ACTIVE_TAB_CLASS : ``}"
            href="#"
            data-tab="${tab}"
          >
            ${tab}
          </a>`
        ))
        .join(``)}
    </nav>`
  );
};

export default class Tabs extends AbstractView {
  constructor() {
    super();
    this._tabsClickHandler = this._tabsClickHandler.bind(this);
  }

  getTemplate() {
    return createTabsTemplate();
  }

  _tabsClickHandler(evt) {
    evt.preventDefault();
    const prevActiveTabElement = this.getElement().querySelector(`.${ACTIVE_TAB_CLASS}`);
    const prevActiveTab = prevActiveTabElement.dataset.tab;
    prevActiveTabElement.classList.remove(ACTIVE_TAB_CLASS);

    evt.target.classList.add(ACTIVE_TAB_CLASS);
    const activeTab = evt.target.dataset.tab;

    if (activeTab !== prevActiveTab) {
      this._callback.tabsClick(activeTab);
    }
  }

  setTabsClickHandler(callback) {
    this._callback.tabsClick = callback;
    this.getElement().addEventListener(`click`, this._tabsClickHandler);
  }
}
