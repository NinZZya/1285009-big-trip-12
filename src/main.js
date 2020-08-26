import {
  InfoView,
  ControlsView,
  TabsView,
  FiltersView,
  NewPointButtonView,
  /* eslint-disable-next-line */
  StatisticsView,
} from './view/';

import {
  TripModel,
  FilterModel
} from './model';
import {TripPresenter} from './presenter';
import {RenderPosition, render} from './utils/dom';
import {generatePoints} from './mock/points';
import {DESTINATIONS} from './mock/points';

const {
  BEFORE_BEGIN,
  AFTER_BEGIN,
  BEFORE_END,
} = RenderPosition;

const POINTS_COUNT = 20;
const points = generatePoints(POINTS_COUNT);

const tripModel = new TripModel();
tripModel.setDestinations(DESTINATIONS);
tripModel.setPoints(points);

const filterModel = new FilterModel();

const tripMainElement = document.querySelector(`.trip-main`);
const infoView = new InfoView();
render(tripMainElement, infoView, AFTER_BEGIN);

const controlsView = new ControlsView();
render(tripMainElement, controlsView, BEFORE_END);
const tripFilterEventsHeaderElement = controlsView.getFilterEventsHeaderElement();
const tabsView = new TabsView();
render(tripFilterEventsHeaderElement, tabsView, BEFORE_BEGIN);
const filtersView = new FiltersView();
render(controlsView, filtersView, BEFORE_END);

const newPointButtonView = new NewPointButtonView();
render(tripMainElement, newPointButtonView, BEFORE_END);

const tripEventsElement = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripEventsElement, tripModel);
tripPresenter.init();
