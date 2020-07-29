import {createTripInfoTemplate} from './components/trip-info';
import {createTripTabsTemplate} from './components/trip-tabs';
import {createTripFiltersTemplate} from './components/trip-filters';
import {createTripSortTemplate} from './components/trip-sort';
import {createEditEventTemplate} from './components/edit-event/edit-event';
import {
  RenderPosition,
  render,
  createElement,
} from './utils/utils';

const DEFAULT_EVENT = `flight`;

// Рендер информации о путешествии
const tripMain = document.querySelector(`.trip-main`);
const tripInfo = createElement(createTripInfoTemplate());
render(tripMain, tripInfo, RenderPosition.AFTERBEGIN);

// Рендер контролов (табов и фильтров)
const tripControlsElement = tripMain.querySelector(`.trip-controls`);
const tripTabsElement = createElement(createTripTabsTemplate());
const tripTabsPlaceElement = tripMain.querySelectorAll(`h2`)[1];
render(tripControlsElement, tripTabsElement, tripTabsPlaceElement);
const tripFiltersElement = createElement(createTripFiltersTemplate());
render(tripControlsElement, tripFiltersElement, RenderPosition.BEFOREEND);

// Рендер событий (сортировка, изменеие события и контент)
const tripEventsElement = document.querySelector(`.trip-events`);
const tripSortElement = createElement(createTripSortTemplate());
render(tripEventsElement, tripSortElement, RenderPosition.BEFOREEND);
const tripEditEventElement = createElement(createEditEventTemplate(DEFAULT_EVENT));
render(tripEventsElement, tripEditEventElement, RenderPosition.BEFOREEND);
