import {createTemplateTripInfo} from './components/trip-info';
import {createTemplateTripTabs} from './components/trip-tabs';
import {createTemplateTripFilters} from './components/trip-filters';
import {
  RenderPosition,
  render,
  createElement,
} from './utils/utils';

const tripMain = document.querySelector(`.trip-main`);
const tripInfo = createElement(createTemplateTripInfo());
render(tripMain, tripInfo, RenderPosition.AFTERBEGIN);

const tripControls = tripMain.querySelector(`.trip-controls`);
const tripTabs = createElement(createTemplateTripTabs());
const tripTabsPlace = tripMain.querySelectorAll(`h2`)[1];
render(tripControls, tripTabs, tripTabsPlace);
const tripFilters = createElement(createTemplateTripFilters());
render(tripControls, tripFilters, RenderPosition.BEFOREEND);
