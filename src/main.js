import {createTemplateTripInfo} from './components/trip-info';
import {createTemplateTripTabs} from './components/trip-tabs';
import {
  RenderPosition,
  render,
  createElement,
} from './utils/utils';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);

const tripInfo = createElement(createTemplateTripInfo());
const tripTabs = createElement(createTemplateTripTabs());
const tripTabsPlace = tripMain.querySelectorAll(`h2`)[1];

render(tripMain, tripInfo, RenderPosition.AFTERBEGIN);
render(tripControls, tripTabs, tripTabsPlace);

