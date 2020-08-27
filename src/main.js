import {
  ControlsView,
  TabsView,
  NewPointButtonView,
  /* eslint-disable-next-line */
  StatisticsView,
} from './view/';

import {TripModel, FilterModel} from './model';
import {TripPresenter, FilterPresenter, InfoPresenter} from './presenter';
import {RenderPosition, render} from './utils/dom';
import {generatePoints} from './mock/points';
import {DESTINATIONS} from './mock/points';

const {
  BEFORE_BEGIN,
  BEFORE_END,
} = RenderPosition;

const POINTS_COUNT = 20;
const points = generatePoints(POINTS_COUNT);

const tripModel = new TripModel();
tripModel.setDestinations(DESTINATIONS);
tripModel.setPoints(points);

const filterModel = new FilterModel();

const tripMainElement = document.querySelector(`.trip-main`);

const controlsView = new ControlsView();
render(tripMainElement, controlsView, BEFORE_END);
const tripFilterEventsHeaderElement = controlsView.getFilterEventsHeaderElement();
const tabsView = new TabsView();
render(tripFilterEventsHeaderElement, tabsView, BEFORE_BEGIN);

const newPointButtonView = new NewPointButtonView();
render(tripMainElement, newPointButtonView, BEFORE_END);

const tripEventsElement = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripEventsElement, tripModel, filterModel);
tripPresenter.init();

const filterPresenter = new FilterPresenter(controlsView, tripModel, filterModel);
filterPresenter.init();

const infoPresenter = new InfoPresenter(tripMainElement, tripModel, filterModel);
infoPresenter.init();

const newPointButtonElement = newPointButtonView.getElement();
newPointButtonElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  newPointButtonElement.disabled = true;
  tripPresenter.createPoint(() => {
    newPointButtonElement.disabled = false;
  });
});
