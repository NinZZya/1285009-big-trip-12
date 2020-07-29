import {createTemplateTripInfo} from './components/trip-info';
import {createTemplateTripTabs} from './components/trip-tabs';
import {createTemplateTripFilters} from './components/trip-filters';
import {createTemplateTripSort} from './components/trip-sort';
import {createTemplateEditEvent} from './components/edit-event/edit-event';
import {
  RenderPosition,
  render,
  createElement,
} from './utils/utils';

const DEFAULT_EVENT = `flight`;

// Рендер информации о путешествии
const tripMain = document.querySelector(`.trip-main`);
const tripInfo = createElement(createTemplateTripInfo());
render(tripMain, tripInfo, RenderPosition.AFTERBEGIN);

// Рендер контролов (табов и фильтров)
const tripControlsElement = tripMain.querySelector(`.trip-controls`);
const tripTabsElement = createElement(createTemplateTripTabs());
const tripTabsPlaceElement = tripMain.querySelectorAll(`h2`)[1];
render(tripControlsElement, tripTabsElement, tripTabsPlaceElement);
const tripFiltersElement = createElement(createTemplateTripFilters());
render(tripControlsElement, tripFiltersElement, RenderPosition.BEFOREEND);

// Рендер событий (сортировка, изменеие события и контент)
const tripEventsElement = document.querySelector(`.trip-events`);
const tripSortElement = createElement(createTemplateTripSort());
render(tripEventsElement, tripSortElement, RenderPosition.BEFOREEND);
const tripEditEventElement = createElement(createTemplateEditEvent(DEFAULT_EVENT));
render(tripEventsElement, tripEditEventElement, RenderPosition.BEFOREEND);
