import {
  RenderPosition,
  render,
  createElement,
} from './utils/utils';

import {createTemplateTripInfo} from './components/trip-info';

const tripMain = document.querySelector(`.trip-main`);
const tripInfo = createElement(createTemplateTripInfo());

render(tripMain, tripInfo, RenderPosition.AFTERBEGIN);
