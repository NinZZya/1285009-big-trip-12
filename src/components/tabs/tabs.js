import {TABS} from '../../const';

const DEFAULT_TAB = 0;

const createTabsTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${TABS
        .map((tab, index) => (
          `<a
            class="trip-tabs__btn ${index === DEFAULT_TAB ? `trip-tabs__btn--active` : ``}"
            href="#"
          >
            ${tab}
          </a>`
        ))
        .join(``)}
    </nav>`
  );
};

export {createTabsTemplate};
